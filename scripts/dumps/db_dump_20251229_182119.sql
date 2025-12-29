--
-- PostgreSQL database dump
--

\restrict gznIEtJzSvhwGpEWl5ZdPncHmDk34GFkg6fgbN2IplG0eL0BLZtUTH18iGLuuyy

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.series DROP CONSTRAINT IF EXISTS series_slug_unique;
ALTER TABLE IF EXISTS ONLY public.series_posts DROP CONSTRAINT IF EXISTS series_posts_pkey;
ALTER TABLE IF EXISTS ONLY public.series DROP CONSTRAINT IF EXISTS series_pkey;
ALTER TABLE IF EXISTS ONLY public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_unique;
ALTER TABLE IF EXISTS ONLY public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_pkey;
ALTER TABLE IF EXISTS public.series_posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.series ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.blog_posts ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.series_posts_id_seq;
DROP TABLE IF EXISTS public.series_posts;
DROP SEQUENCE IF EXISTS public.series_id_seq;
DROP TABLE IF EXISTS public.series;
DROP SEQUENCE IF EXISTS public.blog_posts_id_seq;
DROP TABLE IF EXISTS public.blog_posts;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    date character varying(10) NOT NULL,
    tags text[] NOT NULL,
    video_url text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    image_url text,
    status character varying(20) DEFAULT 'draft'::character varying NOT NULL,
    published_at timestamp without time zone,
    slug character varying(255) NOT NULL
);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blog_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blog_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: series; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.series (
    id integer NOT NULL,
    slug character varying(100) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    cover_image_url text,
    accent_color character varying(7),
    is_visible integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: series_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.series_id_seq OWNED BY public.series.id;


--
-- Name: series_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.series_posts (
    id integer NOT NULL,
    series_id integer NOT NULL,
    post_id integer NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: series_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.series_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: series_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.series_posts_id_seq OWNED BY public.series_posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: series id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.series ALTER COLUMN id SET DEFAULT nextval('public.series_id_seq'::regclass);


--
-- Name: series_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.series_posts ALTER COLUMN id SET DEFAULT nextval('public.series_posts_id_seq'::regclass);


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_posts (id, title, excerpt, content, date, tags, video_url, created_at, updated_at, image_url, status, published_at, slug) FROM stdin;
13	Second Brain: Concept	Learn what a "second brain" really means and why your AI assistant deserves a memory upgrade.	# The Second Brain Concept PART: 1\n\n> Learn what a "second brain" really means and why your AI assistant deserves a memory upgrade.\n\n**Reading time:** 5-7 minutes | **Audience:** Non-Technical\n\n---\n\n## The Hook\n\nYou've had this conversation before. With yourself. Last month. And you have no idea what you decided.\n\nThe meeting notes are somewhere — maybe in that Google Doc, or was it Notion? The rationale behind that architecture choice is buried in a Slack thread from October. That elegant solution you came up with three weeks ago for handling edge cases? Gone. Evaporated into the void of your overstuffed brain.\n\nAnd here's the cruel irony: you have an AI assistant that can write code, explain quantum physics, and compose poetry in iambic pentameter. But ask it what you talked about yesterday? Blank stare. Every conversation starts fresh, like meeting a brilliant colleague who has complete amnesia.\n\nIt's exhausting. And it doesn't have to be this way.\n\n---\n\n## The Problem We're Solving\n\nYour knowledge lives in a dozen different places. Notes in one app. Decisions in another. Important conversations scattered across email, chat, and that one time you wrote something crucial on a sticky note that's now stuck to your keyboard upside down.\n\nEvery time you switch tools, you lose context. Every time you start a new chat with your AI, you start from scratch. Every time a teammate asks "why did we decide to do it this way?" you experience that special kind of dread reserved for pop quizzes and surprise family visits.\n\nThis fragmentation has a cost. I call it the "where did I put that" tax — the mental energy you spend every day reconstructing context instead of doing actual work. Some studies suggest knowledge workers spend 20% of their time just looking for information they already have.\n\nAnd your AI assistant, as smart as it is, makes this worse. It's like having a brilliant consultant who shows up every day with no memory of previous meetings. "Nice to meet you!" it says, for the hundredth time. "Tell me about your project from the beginning!"\n\nThere has to be a better way.\n\n---\n\n## What Is a Second Brain?\n\nA second brain isn't just a database. It's not another app to dump notes into. It's a thinking partner with memory.\n\nHere's the difference:\n\n```\nTRADITIONAL AI ASSISTANT              SECOND BRAIN AI\n─────────────────────────              ────────────────\nSession 1: "What's our API design?"   Session 1: "What's our API design?"\nSession 2: "What's our API design?"   Session 2: "Remember the API design?\nSession 3: "What's our API design?"            Here's what changed since\n         (still explaining from zero)          our last discussion..."\n```\n\nA regular AI assistant helps enthusiastically but forgets every conversation by Monday. A second brain is the colleague who remembers that obscure decision from six months ago and can tell you exactly why you made it — including the alternatives you rejected and why.\n\nThink of it as evolving your AI from a helpful stranger into a trusted team member who's been on the project since day one. One who never takes vacation, never leaves for another company, and never responds to "why did we do it this way?" with "I don't know, I wasn't here."\n\nThe concept isn't new. People have been building "personal knowledge management" systems for years — from paper notebooks to wikis to apps with names like Roam and Obsidian. What's new is combining this with AI that can actually reason about your knowledge, not just store it.\n\nYour second brain knows:\n- What your project is about and how it evolved\n- Which decisions you made and why\n- What your team discussed last week\n- Where to find that thing you're vaguely remembering\n\nAnd it can connect dots you didn't even know existed.\n\n---\n\n## Two Paths Forward\n\nThere are two main approaches to building a second brain, and I'll be honest about both.\n\n**Path 1: VitePress + Git** — For those who want speed, version control, and complete ownership. Your knowledge lives in plain text files, tracked by Git, rendered as a fast static site. You own everything. You can hack everything.\n\n**Path 2: Notion + Integrations** — For those who already live in Notion. It's familiar, it's collaborative, and there are plenty of integrations to connect it with AI.\n\nHere's the honest comparison:\n\n| Aspect | VitePress + Git | Notion |\n|:-------|:---------------:|:------:|\n| **Speed** | ⚡ Blazing fast | 🐢 Medium |\n| **Version Control** | ✅ Built-in (Git) | ⚠️ Limited |\n| **Customization** | 🔧 Unlimited | 📋 Template-based |\n| **Learning Curve** | 📈 Steeper | 📉 Gentler |\n| **Best For** | 👩‍💻 Developers | 👥 Everyone |\n| **Data Ownership** | 🏠 You own it all | ☁️ Cloud-hosted |\n| **Offline Access** | ✅ Full | ⚠️ Partial |\n\nIf Notion is your home, stay there. You can absolutely build a functioning second brain without touching a terminal.\n\nBut if you're comfortable with a command line — or want to get comfortable — the technical path offers superpowers. More control, more speed, more integration possibilities. And frankly, more fun.\n\nThis series takes the technical path. Not because it's the only way, but because it unlocks capabilities that are hard to match otherwise.\n\n---\n\n## What You'll Build\n\nBy the end of this series, you'll have a second brain that actually works:\n\n```\n╔══════════════════════════════════════════════════════════════════╗\n║                      🧠 YOUR SECOND BRAIN                        ║\n╠══════════════════════════════════════════════════════════════════╣\n║                                                                  ║\n║   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ ║\n║   │  📚 KNOWLEDGE   │    │  💬 DISCUSSIONS │    │ ⚡ DECISIONS │ ║\n║   │     BASE        │    │    CAPTURED     │    │   TRACKED   │ ║\n║   │                 │    │                 │    │             │ ║\n║   │  Guides, docs,  │    │  Meetings auto- │    │ Full context│ ║\n║   │  project lore   │    │  summarized     │    │ & rationale │ ║\n║   └────────┬────────┘    └────────┬────────┘    └──────┬──────┘ ║\n║            │                      │                     │        ║\n║            └──────────────────────┼─────────────────────┘        ║\n║                                   ▼                              ║\n║                    ┌──────────────────────────┐                  ║\n║                    │    🤖 CLAUDE WITH        │                  ║\n║                    │       MEMORY             │                  ║\n║                    │                          │                  ║\n║                    │  "What did we decide     │                  ║\n║                    │   about the API?"        │                  ║\n║                    │                          │                  ║\n║                    │  → Returns actual answer │                  ║\n║                    │    with full context     │                  ║\n║                    └──────────────────────────┘                  ║\n║                                   │                              ║\n║                                   ▼                              ║\n║                    ┌──────────────────────────┐                  ║\n║                    │  🔄 AUTOMATED WORKFLOWS  │                  ║\n║                    │                          │                  ║\n║                    │  Morning briefings       │                  ║\n║                    │  Standup generation      │                  ║\n║                    │  Decision tracking       │                  ║\n║                    └──────────────────────────┘                  ║\n║                                                                  ║\n╚══════════════════════════════════════════════════════════════════╝\n```\n\nWhen you ask "What did we decide about the API redesign?" you'll get the actual decision, the alternatives you considered, and the discussion that led there. Not a blank stare. Not "I don't have access to that." The real answer, with context.\n\nYour morning routine might look like: open Claude, get a briefing of overnight team messages, have your standup update already written, and jump straight into work that matters — not into catching up on what you missed.\n\nThis isn't science fiction. It's just organized text files with superpowers.\n\n---\n\n## What You'll Need\n\nBefore we start building, here's what you'll need:\n\n- **Claude Pro or Team subscription** — You'll need Claude Code for the full experience\n- **Basic command line comfort** — "Basic" means you've typed `cd` and `ls` without panicking. If you can navigate to a folder, you're qualified.\n- **30 minutes for initial setup** — That's it. The foundation goes up fast.\n- **Willingness to experiment** — We're teaching an AI new tricks. Some patience required.\n\nDon't worry if the technical bits feel intimidating at first. Every concept will be explained as we go, and you can always ask your (soon-to-be-smarter) AI for help.\n\n---\n\n## Key Takeaway\n\n> Your second brain isn't about storing everything — it's about never losing the important stuff.\n\n---\n\n## What's Next\n\nIn Part 2, we'll explore the three pillars that make a second brain actually work: current knowledge, historical record, and decision archive. Sounds fancy. It's actually just organized text files with superpowers.\n\nBy the end of this series, your Claude will know your project better than that colleague who "was definitely on that call" but remembers nothing.\n\nLet's build something worth remembering.	2024-12-29	{AI,Claude,Productivity,Knowledge-Management,Second-Brain}	\N	2025-12-29 11:16:08.015642	2025-12-29 11:16:08.015642	/attached_assets/generated_images/cyberpunk_second_brain_neural_network.png	published	2025-12-08 00:00:00	second-brain-concept
14	Second Brain: Core Building Blocks	The three pillars that make a second brain actually work: current knowledge, historical record, and decision archive.	# Core Building Blocks PART: 2\n\n> The three pillars that make a second brain actually work: current knowledge, historical record, and decision archive.\n\n**Reading time:** 7-10 minutes | **Audience:** Non-Technical\n\n---\n\n## The Hook\n\nEvery good system has three things: what you know now, what you've discussed, and what you've decided. Let's build all three.\n\nMost knowledge systems fail because they're just dumping grounds. Everything goes in, nothing comes out useful. You create a folder called "Notes" and six months later it's a graveyard of half-finished thoughts and documents named "final_v3_ACTUALLY_FINAL.docx".\n\nA second brain is different. It's organized by purpose, not just by date. It knows the difference between "how we do things" and "why we do things that way." And crucially, it can answer both questions without you digging through seventeen folders.\n\nToday we're going to meet the three pillars that make this work.\n\n---\n\n## The Three Pillars\n\nYour second brain rests on three distinct foundations. Each one answers a different type of question, and together they give you something no single note-taking app ever could: actual understanding.\n\n```\n┌─────────────────────────────────────────────────┐\n│              YOUR SECOND BRAIN                   │\n├─────────────────┬─────────────────┬─────────────┤\n│  CURRENT        │  HISTORICAL     │  DECISIONS  │\n│  KNOWLEDGE      │  RECORD         │  ARCHIVE    │\n│                 │                 │             │\n│  "How we do     │  "What we       │  "Why we    │\n│   things now"   │   discussed"    │   chose"    │\n│                 │                 │             │\n│  • Guides       │  • Discussions  │  • Choices  │\n│  • How-tos      │  • Meetings     │  • Rejected │\n│  • References   │  • Context      │    options  │\n└─────────────────┴─────────────────┴─────────────┘\n```\n\nHere's the key insight: these three pillars answer fundamentally different questions.\n\n**"How?"** lives in current knowledge. It's your instruction manual.\n\n**"What happened?"** lives in history. It's your memory.\n\n**"Why?"** lives in decisions. It's your wisdom.\n\nWhen someone asks "why do we use Redis for caching?" you need all three. Knowledge tells them how to set it up. History tells them about the performance problems that led to the discussion. Decisions tell them why Redis beat the alternatives.\n\nMiss any pillar and you're missing context. And missing context is how you end up having the same conversation every three months.\n\n---\n\n## Pillar One: Current Knowledge (The Living Docs)\n\nCurrent knowledge is the "how we do things now" layer. It's your living documentation — guides, best practices, reference materials, and procedures that evolve as you learn.\n\nThe key word here is *living*. Unlike a wiki page someone wrote in 2019 and never touched again, current knowledge reflects reality. When you discover a better way, you update it. When something becomes obsolete, you remove it.\n\n```\nCURRENT KNOWLEDGE\n─────────────────\n• Changes frequently\n• Reflects latest understanding\n• Answers "how do I...?"\n• Written for reuse\n\nExamples:\n- Setup guides\n- Best practices\n- Reference materials\n- Standard procedures\n```\n\nThink of current knowledge as the instruction manual you wish your project came with. The one that actually matches reality, not the optimistic version written before anyone used the thing.\n\n**Why version control matters:** Every change is saved. You can see what something looked like last month, last year, or before that "helpful" update that broke everything. Git does this automatically — we'll set that up shortly.\n\nThe beauty of living docs is that they compound. Write a setup guide once, update it occasionally, and save yourself from explaining the same thing fifty times. Your future self (and your teammates) will thank you.\n\n---\n\n## Pillar Two: Historical Record (The Memory)\n\nIf current knowledge is your instruction manual, historical record is your memory. It's the archive of discussions, meetings, and conversations that shaped where you are now.\n\nHistorical records are different from current knowledge in one crucial way: they rarely change after creation. A meeting summary from last Tuesday is what it is. You're not going to "update" it when circumstances change — you'll create a new discussion instead.\n\n```\nHISTORICAL RECORD\n─────────────────\n• Rarely changes after creation\n• Captures moment in time\n• Answers "what did we discuss?"\n• Written for context\n\nExamples:\n- Team discussions\n- Meeting notes\n- Planning sessions\n- Troubleshooting sessions\n```\n\nHere's why this matters: history isn't just what happened — it's why you understand where you are now. Skip tracking history and you'll constantly be asking "wait, why did we do it this way?"\n\n**The new team member test:** Someone joins your project. Without a historical record, they need weeks of painful interviews and context-building conversations. "Oh, you had to be there for that decision." "Ask Sarah, she remembers."\n\nWith a historical record, they read the discussions. "Oh, that's why the architecture looks like that. Makes sense now." Two hours instead of two weeks.\n\nYour AI assistant especially benefits from this. Give Claude access to your discussion history and suddenly it can answer "what did we talk about regarding the API redesign?" with actual context, not a confused stare.\n\n---\n\n## Pillar Three: Decision Archive (The Wisdom)\n\nThe third pillar is where the real magic happens. Decisions are the "why we chose" layer — they document what you decided, why you decided it, and crucially, what you rejected.\n\nYou might have heard these called "Architectural Decision Records" or ADRs. Sounds fancy. Don't worry — it's just organized choices. "Dear Diary, we picked X because..." with better formatting.\n\nHere's what a good decision looks like:\n\n```\n┌───────────────────────────────────────┐\n│  DECISION: Which Database to Use      │\n├───────────────────────────────────────┤\n│  STATUS: Implemented                  │\n│                                       │\n│  CONTEXT:                             │\n│  We needed a database that handles    │\n│  high read volume with low latency    │\n│                                       │\n│  OPTIONS CONSIDERED:                  │\n│  1. PostgreSQL (chosen) — fits our    │\n│     scale and team expertise          │\n│  2. MongoDB (rejected) — schema       │\n│     flexibility not needed            │\n│  3. Build custom (rejected) — would   │\n│     take 6 months we don't have       │\n│                                       │\n│  CONSEQUENCES:                        │\n│  Need to learn advanced indexing,     │\n│  can't easily do document-style data  │\n└───────────────────────────────────────┘\n```\n\n**Why rejected options matter:** Six months from now, someone will suggest MongoDB. Instead of having the whole discussion again, you point to the decision record: "We considered that. Here's why we didn't go that way." Conversation over.\n\nDecisions also have a lifecycle:\n\n```\nProposed → Accepted → Implemented\n              ↓\n           Rejected (with reason)\n```\n\nSome decisions are still being discussed (proposed). Some were accepted but not yet implemented. Some were rejected — and that's valuable too, because it prevents relitigating the same options.\n\nThe decision archive is honestly the highest-leverage part of your second brain. It prevents circular conversations, onboards new people faster, and gives your AI the "why" behind everything.\n\n---\n\n## How The Pillars Connect\n\nThese three pillars don't exist in isolation. They flow into each other naturally:\n\n```\nDISCUSSION ──────▶ DECISION ──────▶ KNOWLEDGE\n    │                  │                │\n"We should use        "We decided      "Here's how\n a caching layer"      to use Redis"    to set it up"\n```\n\nHere's a real example of how this works:\n\n1. **Historical Record:** Team discusses performance problems. "The API is slow. Users are complaining. We need to do something about caching."\n\n2. **Decision Archive:** You evaluate options — Redis, Memcached, building something custom. You choose Redis because it fits your scale and has better persistence. You document why you rejected the others.\n\n3. **Current Knowledge:** Someone writes a guide on setting up Redis in your environment. How to configure it, common gotchas, debugging tips.\n\nNow everything links together:\n- Decisions reference the discussions that led to them\n- Knowledge links to decisions that justify the approach\n- Everything is searchable, everything connects\n\n**The payoff:** When someone asks "why Redis?" you have three layers of answer:\n- Knowledge: "Here's how we use it"\n- Decision: "Here's why we chose it"\n- History: "Here's the discussion that led there"\n\nThat's not just documentation. That's institutional memory. And it's the difference between a project that can scale with new people and one that falls apart when the original team moves on.\n\n---\n\n## Setting Up Your Portal\n\nEnough theory. Let's get practical. Here's how to set up the foundation for your second brain in about five minutes.\n\n```bash\n# One-time setup\nnpm create vitepress@latest my-second-brain\ncd my-second-brain\nnpm install\nnpm run dev\n```\n\nThat gives you a fast, searchable documentation site running locally. But the magic is in how you organize it.\n\nHere's the folder structure that implements our three pillars:\n\n```\nmy-second-brain/\n├── docs/\n│   ├── guides/           # Current knowledge\n│   │   └── getting-started.md\n│   ├── discussions/      # Historical record\n│   │   └── TEMPLATE.md\n│   └── decisions/        # Decision archive\n│       └── TEMPLATE.md\n└── package.json\n```\n\nThree folders. Three purposes. That's it.\n\nDon't worry about filling all these folders yet. An empty structure is still a structure. In the next article, we'll create your first real knowledge entry and watch your second brain actually remember something.\n\n---\n\n## Key Takeaway\n\n> Structure isn't bureaucracy — it's kindness to your future self.\n\nWhen you organize knowledge by purpose — what you know, what you discussed, why you decided — you're not creating overhead. You're creating leverage. Every entry makes the next question easier to answer.\n\nYour AI assistant can't help you remember if there's nothing to remember. These three pillars give it (and you) something to work with.\n\n---\n\n## What's Next\n\nTheory is nice. Practice is better.\n\nIn Part 3, you'll create your first knowledge entry in 10 minutes. You'll write something simple, save it to your second brain, and then watch the magic moment when your AI actually remembers it.\n\nNo more explaining your project from scratch. No more "as I mentioned before" when Claude definitely doesn't remember what you mentioned before.\n\nLet's make something worth remembering.	2024-12-29	{AI,Claude,Productivity,Knowledge-Management,Second-Brain}	\N	2025-12-29 11:55:54.131047	2025-12-29 11:55:54.131047	/attached_assets/generated_images/three_pillars_knowledge_architecture.png	published	2025-12-15 00:00:00	second-brain-core-building-blocks
15	Second Brain: Your First Entry	Stop reading about second brains. Let's build something in the next 10 minutes and experience the magic moment when your AI actually remembers.	# Your First Knowledge Entry\n\n> Stop reading about second brains. Let's build something in the next 10 minutes.\n\nYou've read about pillars and structures. Now let's get your hands dirty with a real knowledge entry — and experience the moment when your AI actually remembers something between sessions.\n\n## The Goal\n\nHere's what we're doing today:\n- Create one piece of lasting knowledge\n- Watch Claude remember it in future sessions\n- Feel the satisfaction of a system that works\n\n**Time commitment:** 10 minutes of setup, a lifetime of payoff. Or at least until the next framework rewrite.\n\n**What you'll need:**\n- The setup from Part 2 (or just a markdown file if you're impatient)\n- Something you've explained more than twice\n- Coffee optional, patience recommended\n\n## Choosing Your First Entry\n\nNot all knowledge is created equal. For your first entry, we want something that hits the sweet spot.\n\n```\nGOOD FIRST ENTRIES                 SKIP FOR NOW\n─────────────────                  ─────────────\nThings you explain repeatedly      Complex architecture docs\nProject setup steps                Comprehensive API reference\nTeam conventions                   Everything you know\nCommon commands                    Your life story\n```\n\n**Examples that work well:**\n- "How to set up the development environment"\n- "Our naming conventions"\n- "Why we use [specific tool]"\n- "Common commands I always forget"\n\nThe rule is simple: **if you've explained something more than twice, it deserves a document.** Your future self (and future teammates) will thank you.\n\n> Pick something boring. Seriously. Your first knowledge entry shouldn't be a masterpiece — it should be useful. Save the creative writing for your novel.\n\n## Writing It Down\n\nHere's the process:\n\n```\nStep 1: Tell Claude what you know\n        ↓\nStep 2: Let Claude organize it\n        ↓\nStep 3: Review and refine\n        ↓\nStep 4: Save to your knowledge base\n```\n\n**Sample conversation:**\n\n```\nYou:    "I need to document how to set up our dev environment.\n         Here's what I usually tell people: [your explanation]"\n\nClaude: "Let me organize that into a structured guide..."\n        [Returns formatted markdown]\n\nYou:    "Add the part about the environment variables"\n\nClaude: [Updates the document]\n\nYou:    "Perfect. Save this to docs/guides/dev-setup.md"\n```\n\n**Key insight:** You don't have to write perfectly. You just have to capture the knowledge. Claude helps with structure; you provide the substance.\n\n**What your knowledge entry might look like:**\n\nA simple setup guide with prerequisites, step-by-step instructions, and common troubleshooting tips. Nothing fancy — just the stuff you'd tell someone in person, organized in a way that's easy to follow.\n\n## The Magic Moment\n\nNow for the payoff. Start a **new** Claude session (this is important — we want to prove it remembers):\n\n```\nYou:    "How do I set up the dev environment?"\n\nClaude: "Based on your documentation, here are the steps..."\n        [Returns the content you saved]\n```\n\n**What just happened:**\n- You documented knowledge once\n- Claude found it automatically\n- You never have to explain it again\n\n```\nSESSION 1                    SESSION 2\n─────────                    ─────────\nCreate doc ───────────────▶  Ask question\n    │                            │\n    ▼                            ▼\nSave to                      Claude reads\nknowledge base               knowledge base\n    │                            │\n    ▼                            ▼\nDone                         Answers with\n                             YOUR context\n```\n\nIt's a small thing, but the first time your AI remembers something you taught it... there's a little spark of "oh, this is going to change things."\n\n## Building the Habit\n\nWhen should you document? Here's a quick decision matrix:\n\n```\nDOCUMENT                     JUST DO IT\n────────                     ──────────\nExplained twice              One-off tasks\nCore to the project          Trivial fixes\nOthers will need this        Personal preferences\nComplex/easy to forget       Obvious stuff\n```\n\n**The "explain once, remember forever" mindset:** Every time you find yourself explaining something, ask: "Will I explain this again?" If yes, take 5 minutes to document it. You're not creating bureaucracy — you're buying back future time.\n\n**Signs you need a knowledge entry:**\n- You've Googled the same thing three times\n- You've said "let me walk you through this" more than once\n- You've forgotten your own clever solution\n- Someone asked and you couldn't remember the details\n\n> Documentation is like flossing. Nobody enjoys it in the moment, but future you will have much better teeth. Or... fewer production incidents. The metaphor kind of falls apart, but you get the idea.\n\n## Key Takeaway\n\n> One documented decision saves a hundred Slack messages.\n\n## Your Exercise\n\nBefore moving to Part 4, create one of these:\n\n1. **Project Setup Guide** — How to get your project running\n2. **Common Commands Cheatsheet** — Things you always forget\n3. **Team Conventions** — Naming, formatting, or process rules\n\nPick one. Document it. Watch your second brain remember it.\n\n## What's Next\n\nYour second brain now has memory. But it's still isolated — it can't see your team chat, task tracker, or calendar. In Part 4, we'll teach it to make phone calls.\n\nPreview: **Connecting Your Tools (MCP)** — where your AI finally learns to talk to the outside world.	2024-12-29	{ai,productivity,knowledge-management,claude}	\N	2025-12-29 12:20:26.37991	2025-12-29 12:20:26.37991	/attached_assets/generated_images/first_knowledge_entry_cyberpunk_brain.png	published	2025-12-22 00:00:00	second-brain-your-first-entry
16	Second Brain: Connecting Your Tools	Your second brain is smart, but it's been living in isolation. Time to introduce it to your other tools and unlock true contextual awareness.	# Connecting Your Tools (MCP)\n\n> Your second brain is smart, but it's been living in isolation. Time to introduce it to your other tools.\n\nYour AI knows what you've documented. But it has no idea what your team discussed yesterday, what's blocking the sprint, or that meeting you missed. Let's fix that.\n\nA second brain with only local knowledge is like a brilliant consultant who refuses to check email. Smart, but missing critical context.\n\n## What Is MCP?\n\n**The simple explanation:** MCP (Model Context Protocol) is how Claude talks to other services. Think of it as giving Claude a phone to call your other apps.\n\n**The slightly more technical explanation:** MCP servers are small programs that translate between Claude and external services. They handle authentication, data formatting, and all the boring stuff so you don't have to.\n\n```\n┌──────────────┐     ┌──────────────┐     ┌──────────────┐\n│   Claude     │────▶│  MCP Server  │────▶│   Service    │\n│   (Brain)    │     │  (Translator)│     │  (Slack/etc) │\n└──────────────┘     └──────────────┘     └──────────────┘\n```\n\n**What this means for you:**\n- Claude can read your team messages\n- Claude can check your task tracker\n- Claude can pull meeting transcripts\n- All without you copy-pasting things around\n\n> MCP sounds like a government acronym for something classified. It's actually just "let Claude read your Slack" but make it enterprise.\n\n## The Connection Types\n\nCommon MCP connections give Claude different superpowers:\n\n```\nCONNECTION TYPE          WHAT CLAUDE CAN DO\n───────────────          ──────────────────\nTeam Chat                Read channel history\n                         Summarize discussions\n                         Find specific messages\n\nTask Tracker             See sprint status\n                         Check who's blocked\n                         Review issue details\n\nMeeting Transcription    Import transcripts\n                         Extract action items\n                         Find past discussions\n\nCalendar                 Check availability\n                         See upcoming meetings\n                         Context about your day\n```\n\n**How connections work in practice:**\n\n```\nYou:    "What did the team discuss about the API redesign?"\n\nClaude: [via MCP] → Searches team chat\n        [via MCP] → Finds relevant threads\n        [via local docs] → Checks for related decisions\n\nResult: "Based on last week's discussion in #engineering,\n         the team decided to prioritize the v2 endpoints.\n         Here's the summary..."\n```\n\n> Each connection alone is useful. Combined, they're transformative. Claude can now answer: "What's blocking the sprint, who discussed it, and what did we decide last time this happened?"\n\n## Setting Up Your First Connection\n\n**Recommended first connection: Team Chat**\n\nWhy team chat first:\n- Highest context value\n- Immediate usefulness\n- Easy to verify it's working\n\n**Generic setup process:**\n\n```\nStep 1: Find or create the MCP server\n        ↓\nStep 2: Configure authentication\n        ↓\nStep 3: Tell Claude about the connection\n        ↓\nStep 4: Test with a simple query\n```\n\n**Testing the connection:**\n\n```\nYou:    "Can you check what the team discussed in #general today?"\n\nClaude: [If working] "Here's a summary of today's discussion..."\n        [If not working] "I don't have access to that channel..."\n```\n\n**Troubleshooting checklist:**\n- Server is running\n- Authentication token is valid\n- Permissions are granted\n- Channel/resource exists\n- Claude can see the server in available tools\n\n## What Claude Can Do Now\n\n**Immediate capabilities:**\n\n```\nQUESTION                              SOURCE\n────────                              ──────\n"What happened overnight?"            Team chat\n"What's blocking the sprint?"        Task tracker\n"Summarize yesterday's standup"      Team chat + tasks\n"What did we decide about X?"         Chat + decisions\n```\n\n**Real-world workflow transformation:**\n\nMorning routine (before MCP):\n1. Open team chat → scroll through messages\n2. Open task tracker → check sprint board\n3. Check calendar → see meetings\n4. Try to synthesize all of this manually\n\nMorning routine (after MCP):\n1. Ask Claude: "Brief me on overnight activity"\n2. Get synthesized summary\n3. Start working\n\n## Security & Privacy Notes\n\n**What data flows where:**\n\n```\nYOUR TOOLS ──────▶ MCP SERVER ──────▶ CLAUDE\n                        │\n                   Data stays local\n                   (usually)\n```\n\n**Key principles:**\n\n1. **Minimal permissions:** Only grant access to what Claude needs\n2. **Review scopes:** Understand what each permission allows\n3. **Sensitive data:** Some things shouldn't flow to any AI\n4. **Team awareness:** Make sure colleagues know Claude can read channels\n\n**What NOT to connect (probably):**\n- HR or legal channels\n- Salary discussions\n- Personal DMs (unless you really want to)\n- Channels with sensitive customer data\n\n> "With great power comes great responsibility." — Someone, probably about API permissions.\n\n## Key Takeaway\n\n> A second brain that can't see your tools is like an assistant locked in a closet. Helpful intentions, limited impact.\n\n## Your Exercise\n\nSet up one MCP connection:\n1. Choose your most-used team tool\n2. Follow the setup for that service\n3. Test with: "What happened in [channel] today?"\n4. Experience the time savings\n\n## What's Next\n\nClaude can now see your tools. But it still waits for you to ask questions. In Part 5, we'll teach it procedures — reusable skills you can trigger with a single command.\n\nPreview: **Teaching Your Brain: Skills** — where Claude learns to follow your playbooks.	2024-12-29	{ai,productivity,mcp,integrations,claude}	\N	2025-12-29 12:41:04.145595	2025-12-29 12:41:04.145595	/attached_assets/generated_images/mcp_connections_cyberpunk_brain_network.png	published	2025-12-29 00:00:00	second-brain-connecting-tools-mcp
17	Second Brain: Teaching Skills	Your second brain knows facts. Now let's teach it how you actually work — turning repetitive tasks into one-command magic.	# Part 5: Teaching Your Brain: Skills\n\n> Your second brain understands concepts. Now let's teach it procedures — repeatable workflows it can execute.\n\n**Reading time:** 7-10 minutes | **Audience:** Semi-Technical | **Words:** ~1,600\n\n---\n\n## The Hook\n\n> "Claude answers questions well. But what about tasks? The things you do every week, the same way, wishing you could just... automate them?"\n\nSkills are the bridge from assistant to automation. One command, many actions, zero thinking required.\n\n---\n\n## What Are Skills?\n\n**The simple explanation:**\n> Skills are reusable procedures that Claude follows when you trigger them. Think of them as "macros for knowledge work."\n\n**Examples:**\n```\n/weekly-recap     → Generates your weekly summary\n/document-meeting → Processes transcript into notes\n/standup          → Prepares your daily update\n/catchup          → Summarizes what you missed\n```\n\n**What makes skills different from just asking:**\n```\nWITHOUT SKILLS                    WITH SKILLS\n──────────────                    ───────────\n"Can you summarize               /recap\n the week's activity\n including team chat,\n issues closed, and\n decisions made? Format\n it like last time..."\n```\n\n**Skills are:**\n- Written in plain language (not code)\n- Stored in your second brain\n- Triggered with a command\n- Consistent every time\n\n> Skills are like teaching Claude your secret recipes. Once taught, it can make the dish exactly the same way every time — no more "I think it was two tablespoons?" moments.\n\n---\n\n## Anatomy of a Skill\n\n**Core structure:**\n\n```\nSKILL: /daily-recap\n\nWHEN: User asks for daily summary\n\nDO:\n1. Check team chat (last 24 hrs)\n2. Review task tracker updates\n3. Summarize decisions made\n4. List action items\n\nOUTPUT: Formatted summary\n```\n\n**Skill file structure:**\n\n```markdown\n# Daily Recap Skill\n\nGenerate a summary of the last 24 hours of activity.\n\n## When to Use\n\n- Morning catchup\n- Before team meetings\n- When returning from time off\n\n## Procedure\n\n### Step 1: Gather Team Activity\nCheck the team chat for messages in the last 24 hours.\nFocus on: decisions, blockers, questions asked.\n\n### Step 2: Review Task Progress\nCheck the task tracker for:\n- Issues closed\n- Issues moved to review\n- New blockers identified\n\n### Step 3: Check for Decisions\nSearch discussions for any decisions made.\nLink to formal decision records if they exist.\n\n### Step 4: Generate Summary\nFormat the output as:\n- **Team Highlights** (2-3 bullets)\n- **Sprint Progress** (what moved)\n- **Decisions Made** (if any)\n- **Action Items** (for you)\n```\n\n**The key insight:**\n> Skills are instructions, not code. You're writing what Claude should do in plain language. Claude figures out the how.\n\n---\n\n## Building Your First Skill\n\n**Choose your first skill:**\n\nGood candidates:\n```\nREPETITIVE + STRUCTURED = GOOD SKILL\n─────────────────────────────────────\nWeekly reporting           ✓\nMeeting preparation        ✓\nCode review checklist      ✓\nStatus update generation   ✓\nOne-off investigations     ✗\nCreative writing           ✗\n```\n\n**Step-by-step creation:**\n\n```\n1. Identify a task you do repeatedly\n   ↓\n2. Write out the steps (as if teaching someone)\n   ↓\n3. Define the expected output format\n   ↓\n4. Create the skill file\n   ↓\n5. Test and refine\n```\n\n**Example: Creating a /standup skill:**\n\n```markdown\n# Standup Skill\n\nGenerate a standup update for team meetings.\n\n## Procedure\n\n### Step 1: Review Yesterday's Work\nCheck my commits and merged PRs from yesterday.\nCheck task tracker for issues I moved.\n\n### Step 2: Identify Today's Focus\nLook at issues assigned to me in "In Progress."\nNote any meetings on the calendar.\n\n### Step 3: Flag Blockers\nCheck for issues I'm waiting on.\nNote any dependencies.\n\n### Step 4: Format Update\nStructure as:\n- **Yesterday:** What I completed\n- **Today:** What I'm working on\n- **Blockers:** What's in my way\n\nKeep each section to 2-3 bullets maximum.\n```\n\n**Placement:**\n```\nyour-second-brain/\n├── skills/\n│   ├── standup/\n│   │   └── SKILL.md\n│   ├── recap/\n│   │   └── SKILL.md\n│   └── README.md\n```\n\n---\n\n## Skill Design Patterns\n\n**Pattern: Information Gathering**\n```\nPurpose: Collect and synthesize data from multiple sources\nExample: /catchup, /sprint-status\nFlow:   Query → Aggregate → Summarize\n```\n\n**Pattern: Content Generation**\n```\nPurpose: Create structured output from context\nExample: /standup, /weekly-report\nFlow:   Gather → Format → Present\n```\n\n**Pattern: Analysis**\n```\nPurpose: Evaluate and assess something\nExample: /review-pr, /audit-dependencies\nFlow:   Read → Analyze → Report\n```\n\n**Pattern: Workflow Automation**\n```\nPurpose: Execute a multi-step process\nExample: /release-notes, /document-meeting\nFlow:   Trigger → Steps → Complete\n```\n\n**Diagram:**\n```\nSKILL PATTERNS\n────────────┬────────────┬────────────┬──────────\n  GATHER    │  GENERATE  │  ANALYZE   │ AUTOMATE\n            │            │            │\n  /catchup  │  /standup  │  /review   │ /release\n  /status   │  /report   │  /audit    │ /deploy\n```\n\n---\n\n## When Skills Shine\n\n**Perfect for skills:**\n- Consistent structure every time\n- Multi-step processes\n- Synthesizing from multiple sources\n- Things you'd write a script for (but don't want to)\n\n**Not ideal for skills:**\n- One-off creative tasks\n- Highly variable situations\n- Things requiring human judgment throughout\n\n**The skill test:**\n> Ask yourself: "If I write out these steps, could someone follow them mechanically?" If yes, it's a skill. If no, it's a conversation.\n\n---\n\n## Key Takeaway\n\n> "Skills turn 'do the thing' into one command."\n\n---\n\n## Hands-On Exercise\n\nCreate your first skill:\n1. Pick: `/standup` or `/weekly-recap`\n2. Write the steps you normally follow\n3. Create the skill file\n4. Test it tomorrow morning\n\n---\n\n## What's Next\n\nPreview of Part 6:\n> Skills wait for you to call them. Hooks don't wait — they activate automatically when things happen. Time to build some guardrails.	2024-12-29	{"Second Brain",Claude,AI,Skills}	/attached_assets/generated_videos/cyberpunk_digital_interface_with_code_scrolling_and_data_visualization.mp4	2025-12-29 15:26:00.671191	2025-12-29 15:26:00.671191	/attached_assets/generated_images/cyberpunk_skills_brain_automation.png	published	2025-12-29 15:26:00.671191	second-brain-teaching-skills
18	Second Brain: Automatic Behaviors	Skills wait for you to call them. Hooks don't wait — they just happen. Learn to create automatic triggers that catch your blind spots before they become problems.	## The Hook\n\n> "You forgot to update the documentation again. The tests ran but you didn't check the results. The file you created isn't in the navigation. Again."\n\nWe all have blind spots. Hooks are the friendly nudge that catches them before they become problems.\n\n---\n\n## What Are Hooks?\n\n**The simple explanation:**\n\n> Hooks are automatic triggers that fire when certain events happen. They watch for situations and respond without you asking.\n\n**The key difference:**\n\n```\nSKILLS                        HOOKS\n──────                        ─────\nYou trigger them              They trigger themselves\n"Do this now"                 "When X happens, do Y"\nOn-demand                     Automatic\nPull                          Push\n```\n\n**Real-world analogy:**\n\n> A skill is like ordering coffee. A hook is like the coffee maker that starts automatically when your alarm goes off.\n\n**What hooks can do:**\n\n- Remind you about things you forget\n- Block dangerous operations\n- Add context at the right moment\n- Enforce consistency\n\n> Hooks are like having a responsible adult looking over your shoulder. Except this adult never gets tired, never judges you, and can be turned off when you're feeling rebellious.\n\n---\n\n## Hook Events\n\n**When hooks can fire:**\n\n```\nEVENT                    WHEN IT HAPPENS\n─────                    ───────────────\nSession Start            You begin a new conversation\nBefore Tool Use          Before Claude uses a tool\nAfter Tool Use           After a tool completes\nSession End              You're about to close\nFile Created             A new file is written\nFile Modified            An existing file changes\n```\n\n**Visual timeline:**\n\n```\nSESSION START ──────▶ "Good morning! You have 3 pending reviews."\n\n   │\n   ▼\nWORKING... ─────────▶ [Normal conversation]\n   │\n   ▼\nBEFORE TOOL USE ────▶ "Wait, that command looks destructive..."\n   │\n   ▼\nTOOL EXECUTES ──────▶ [Action happens]\n   │\n   ▼\nAFTER TOOL USE ─────▶ "That file isn't in the sidebar yet."\n   │\n   ▼\nSESSION END ────────▶ "You have uncommitted changes."\n```\n\n**The most useful hooks:**\n\n1. **Session Start:** Morning briefing, context loading\n2. **After File Write:** Navigation checks, format validation\n3. **Session End:** Uncommitted work reminders\n4. **Before Tool Use:** Safety checks (careful with this one)\n\n---\n\n## Practical Hook Examples\n\n**Example 1: Freshness Check (Session Start)**\n\n```\nTRIGGER: Session starts\nCHECK:   Is documentation older than 30 days?\nACTION:  Warn about stale sections\n\nOutput:\n"Heads up: The API guide hasn't been reviewed in 45 days.\n Consider updating it soon."\n```\n\n**Example 2: Sidebar Check (After File Write)**\n\n```\nTRIGGER: New .md file created\nCHECK:   Is file in navigation config?\nACTION:  Warn if missing\n\nOutput:\n"New file detected: docs/guides/new-feature.md\n This file isn't in the sidebar yet. Add it?"\n```\n\n**Example 3: Uncommitted Work (Session End)**\n\n```\nTRIGGER: Session ending\nCHECK:   Any uncommitted changes?\nACTION:  Remind before closing\n\nOutput:\n"You have 3 modified files that aren't committed:\n - docs/guides/setup.md\n - CLAUDE.md\n - skills/recap/SKILL.md\n\n Commit before closing?"\n```\n\n**Example 4: Safety Net (Before Tool Use)**\n\n```\nTRIGGER: Destructive command attempted\nCHECK:   Does command match dangerous pattern?\nACTION:  Block or warn\n\nOutput:\n"That command would delete the entire directory.\n Are you sure? [Confirm / Cancel]"\n```\n\n**How hooks work:**\n\n```\n                    ┌─────────────────┐\nEVENT HAPPENS ─────▶│  HOOK CHECKS    │\n                    │  condition      │\n                    └────────┬────────┘\n                             │\n              ┌──────────────┴──────────────┐\n              ▼                              ▼\n        CONDITION MET               CONDITION NOT MET\n              │                              │\n              ▼                              ▼\n      TAKE ACTION                     DO NOTHING\n   (warn, block, add)             (silent continue)\n```\n\n---\n\n## Building Your First Hook\n\n**Choose a good first hook:**\n\n```\nGOOD FIRST HOOKS              NOT YET\n────────────────              ───────\nSession start reminder        Complex multi-step checks\nSimple file checks            Blocking dangerous commands\nStale content warnings        Authentication validation\n```\n\n**Creating a session start hook:**\n\n```python\n# hooks/session-start.py\n\ndef on_session_start():\n    """Check for things worth mentioning at session start."""\n\n    reminders = []\n\n    # Check for stale documentation\n    stale_docs = find_stale_docs(days=30)\n    if stale_docs:\n        reminders.append(f"Stale docs: {len(stale_docs)} files")\n\n    # Check for pending reviews\n    pending = get_pending_reviews()\n    if pending:\n        reminders.append(f"Pending reviews: {len(pending)}")\n\n    # Return reminders to show\n    return reminders\n```\n\n**Alternatively, prompt-based hooks (no code):**\n\n```markdown\n# Session Start Hook\n\nWhen the session starts, check:\n\n1. Are any documentation sections older than 30 days?\n2. Are there pending decision records?\n3. Are there undocumented meetings?\n\nIf any issues found, mention them briefly.\nKeep it to one line per issue.\nDon't block — just inform.\n```\n\n**Placement:**\n\n```\nyour-second-brain/\n├── hooks/\n│   ├── session-start.md     # or .py\n│   ├── sidebar-check.md\n│   └── README.md\n```\n\n---\n\n## Hook Philosophy\n\n**The golden rules:**\n\n1. **Helpful, not annoying**\n   - Inform, don't lecture\n   - One-liners, not paragraphs\n   - Easy to dismiss\n\n2. **Warnings over blocks**\n   - Blocking should be rare\n   - Trust the user's judgment\n   - Make overriding easy\n\n3. **Silence is golden**\n   - Only speak when something's wrong\n   - No "all checks passed!" noise\n   - Invisible when not needed\n\n**The hook spectrum:**\n\n```\nSILENT ──────────────────────────────────▶ BLOCKING\n   │                                           │\n   │  Inform    Warn    Suggest    Require     │\n   │                                           │\n   ▼                                           ▼\n"FYI: stale doc"         "Cannot delete main branch"\n```\n\n**Anti-patterns:**\n\n- Hooks that fire constantly\n- Blocking without clear reason\n- Long explanations\n- No way to override\n\n> A well-designed hook is like a good friend who reminds you about your ex's birthday before you accidentally like their Instagram post. Subtle. Preventative. Life-saving.\n\n---\n\n## Key Takeaway\n\n> "Hooks are guardrails that keep you on the road without grabbing the wheel."\n\n---\n\n## Hands-On Exercise\n\nCreate one hook:\n\n1. Pick: Session start or file creation\n2. Decide what to check\n3. Write the check (code or prompt)\n4. Test by triggering the event\n\n---\n\n## What's Next\n\n> You've built skills and hooks that work perfectly for you. But what if your team could use them too? Time to package them up.	2024-12-29	{"Second Brain",Claude,AI,Hooks,Automation}	\N	2025-12-29 16:53:17.620778	2025-12-29 16:53:17.620778	/attached_assets/generated_images/cyberpunk_automation_hooks_concept.png	published	2025-12-29 16:00:00	second-brain-hooks
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.series (id, slug, title, description, cover_image_url, accent_color, is_visible, created_at, updated_at) FROM stdin;
5	second-brain-claude	Building Your Second Brain with Claude	A 12-part series on transforming Claude from a coding assistant into a persistent knowledge companion that remembers your projects, decisions, and team context.	\N	#06b6d4	1	2025-12-29 11:14:52.556946	2025-12-29 11:14:52.556946
\.


--
-- Data for Name: series_posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.series_posts (id, series_id, post_id, "position", created_at) FROM stdin;
7	5	13	1	2025-12-29 11:16:17.899501
8	5	14	2	2025-12-29 11:56:04.227613
9	5	15	3	2025-12-29 12:20:51.937911
10	5	16	4	2025-12-29 12:41:24.303487
11	5	17	5	2025-12-29 15:26:11.582709
12	5	18	6	2025-12-29 16:53:27.266422
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 18, true);


--
-- Name: series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.series_id_seq', 5, true);


--
-- Name: series_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.series_posts_id_seq', 12, true);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- Name: series_posts series_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.series_posts
    ADD CONSTRAINT series_posts_pkey PRIMARY KEY (id);


--
-- Name: series series_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_slug_unique UNIQUE (slug);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- PostgreSQL database dump complete
--

\unrestrict gznIEtJzSvhwGpEWl5ZdPncHmDk34GFkg6fgbN2IplG0eL0BLZtUTH18iGLuuyy

