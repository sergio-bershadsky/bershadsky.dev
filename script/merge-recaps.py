#!/usr/bin/env python3
"""Merge generated recaps from .draft/recaps/<id>.txt into blog-posts/data.yaml.

Inserts a `recap: |` block after each post's `excerpt:` line, preserving the
rest of the file byte-for-byte (a YAML round-trip would reflow every entry).
Idempotent: an existing recap block for a post is replaced.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "client/public/data/blog-posts/data.yaml"
RECAPS = ROOT / ".draft/recaps"

MIN_CHARS, MAX_CHARS = 700, 1200
BANNED = ["this article", "this post", "in this piece", "the author",
          "we explore", "learn how", "discover how"]


def wrap(text, width=100):
    """Greedy wrap so the YAML block scalar stays readable in diffs."""
    words, lines, cur = text.split(), [], ""
    for w in words:
        if cur and len(cur) + 1 + len(w) > width:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return lines


def main():
    src = DATA.read_text()
    lines = src.split("\n")
    out, problems, merged = [], [], 0

    current_id = None
    skipping_recap = False

    for line in lines:
        m_id = re.match(r"^- id: (\d+)\s*$", line)
        if m_id:
            current_id = int(m_id.group(1))

        # drop any pre-existing recap block (idempotency)
        if skipping_recap:
            if re.match(r"^  \w[\w_]*:", line) or re.match(r"^- id:", line):
                skipping_recap = False
            else:
                continue

        if re.match(r"^  recap: \|", line):
            skipping_recap = True
            continue

        out.append(line)

        if current_id is not None and re.match(r"^  excerpt:", line):
            path = RECAPS / f"{current_id}.txt"
            if not path.exists():
                continue
            text = " ".join(path.read_text().split()).strip()
            n = len(text)
            if not (MIN_CHARS <= n <= MAX_CHARS):
                problems.append(f"post {current_id}: {n} chars (want {MIN_CHARS}-{MAX_CHARS})")
            low = text.lower()
            for phrase in BANNED:
                if phrase in low:
                    problems.append(f"post {current_id}: banned phrase '{phrase}'")
            # Markdown *syntax*, not bare characters: "#general", "schemas/*.yaml"
            # and "sbdb://x#/properties/id" are legitimate technical strings.
            markdown = [
                (r"\*\*", "bold"),
                (r"(?:^|\s)\*\s", "bullet"),
                (r"^#{1,6}\s", "heading"),
                (r"`", "code span"),
                (r"\[[^\]]+\]\([^)]+\)", "link"),
            ]
            for pattern, name in markdown:
                if re.search(pattern, text, flags=re.M):
                    problems.append(f"post {current_id}: markdown {name} in recap")
            if re.search(r"[\U0001F300-\U0001FAFF☀-➿]", text):
                problems.append(f"post {current_id}: emoji in recap")
            out.append("  recap: |")
            out.extend(f"    {l}" for l in wrap(text))
            merged += 1

    if problems:
        print("PROBLEMS:")
        for p in problems:
            print("  -", p)
        if "--force" not in sys.argv:
            print("\nNothing written. Fix the .txt files or pass --force.")
            return 1

    DATA.write_text("\n".join(out))
    print(f"merged {merged} recaps into {DATA.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
