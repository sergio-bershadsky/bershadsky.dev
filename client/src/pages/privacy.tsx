import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { CyberpunkBackground } from '@/components/CyberpunkBackground';
import { NeonCard } from '@/components/CyberpunkUI';

const EFFECTIVE_DATE = '2026-05-21';
const CONTACT_LINKEDIN = 'https://linkedin.com/in/bershadsky';

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl md:text-2xl font-display uppercase tracking-wider text-secondary mt-10 mb-4">
    {children}
  </h2>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">{children}</p>
);

const LI: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="text-sm md:text-base text-gray-300 leading-relaxed mb-2">{children}</li>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <CyberpunkBackground />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold">RETURN_TO_BASE</span>
          </Link>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            PRIVACY_POLICY // {EFFECTIVE_DATE}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <NeonCard variant="secondary" className="p-6 md:p-10">
          <header className="border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center gap-3 text-secondary font-mono text-xs mb-3">
              <Shield className="w-4 h-4" />
              <span>LEGAL // POLICY_DOC</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wider text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mt-3 font-mono">
              Effective {EFFECTIVE_DATE} · bershadsky.dev
            </p>
          </header>

          <H2>1. Who we are</H2>
          <P>
            <strong className="text-white">bershadsky.dev</strong> (the "Site") is the personal
            technical blog and portfolio of Sergey Bershadsky, an individual based in Lisbon,
            Portugal. The Site is a static publication. There is no company, no team, and no
            commercial product behind it. References below to "we" mean the operator of the Site.
          </P>
          <P>
            For any question about this policy or about the data the Site processes, contact us
            via{' '}
            <a
              className="text-primary hover:text-accent transition-colors"
              href={CONTACT_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            . This is the canonical contact channel for the Site.
          </P>

          <H2>2. The short version</H2>
          <P>
            The Site does not require an account, does not run third-party advertising, does not
            sell personal information, does not use cross-site tracking pixels, and does not
            collect data from children under 13. The data the Site does process — described in
            detail below — is essentially the standard request log every web server records, plus
            CDN-edge metadata produced by Cloudflare, our hosting provider.
          </P>

          <H2>3. What we collect</H2>
          <P>
            When you visit a page on the Site, our hosting infrastructure (Cloudflare) records the
            following technical information:
          </P>
          <ul className="list-none ml-4 mb-4">
            <LI>Your IP address.</LI>
            <LI>The URL you requested and the HTTP method.</LI>
            <LI>Your browser's User-Agent string and the Referer header (if your browser sends one).</LI>
            <LI>Approximate geographic region derived from the IP address.</LI>
            <LI>The timestamp of the request and a status code.</LI>
          </ul>
          <P>
            The Site itself does not set tracking cookies, does not embed third-party analytics
            scripts, and does not load fingerprinting libraries. The only browser storage the Site
            uses is in-memory state for the SPA renderer (the article you are reading, the diagram
            you are viewing); this is cleared the moment you close the tab.
          </P>

          <H2>4. Why we collect it</H2>
          <ul className="list-none ml-4 mb-4">
            <LI>
              <strong className="text-white">Operating the Site.</strong> The hosting provider needs
              the request details to route your browser to the page you asked for.
            </LI>
            <LI>
              <strong className="text-white">Security.</strong> Aggregated logs are used to detect
              and mitigate abuse — denial of service, scraping, automated probing.
            </LI>
            <LI>
              <strong className="text-white">Traffic understanding.</strong> Aggregated, anonymised
              counts (page views, country totals) are reviewed periodically to understand which
              articles are read.
            </LI>
          </ul>
          <P>
            We do not use this data to profile you, build a behavioural advertising audience, sell
            it to a third party, or merge it with data from other sources.
          </P>

          <H2>5. Lawful basis (for visitors in the EEA / UK)</H2>
          <P>
            Where the GDPR applies, our lawful basis for processing the limited data described
            above is <em>legitimate interest</em> under Art. 6(1)(f) — specifically the legitimate
            interest in operating a personal website securely, identifying abuse, and producing
            aggregate readership statistics. We have weighed this against your rights and consider
            the processing necessary and proportionate.
          </P>

          <H2>6. How long we keep it</H2>
          <ul className="list-none ml-4 mb-4">
            <LI>
              Raw request logs at the edge: typically <strong className="text-white">30 days</strong>{' '}
              or less, per Cloudflare's retention policy for the plan we use.
            </LI>
            <LI>
              Aggregated counts (no IPs, no personal identifiers): retained indefinitely as small
              statistical summaries.
            </LI>
          </ul>

          <H2>7. Who we share it with</H2>
          <P>
            We do not sell your personal data. We do not share it with advertisers or data brokers.
            The Site relies on a small number of infrastructure providers who process the data
            described above strictly to deliver the service:
          </P>
          <ul className="list-none ml-4 mb-4">
            <LI>
              <strong className="text-white">Cloudflare, Inc.</strong> — hosting, CDN, DDoS
              protection. Cloudflare processes the technical logs described in §3. See{' '}
              <a
                className="text-primary hover:text-accent transition-colors"
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                cloudflare.com/privacypolicy
              </a>
              .
            </LI>
            <LI>
              <strong className="text-white">GitHub, Inc.</strong> — source-code hosting for the
              Site itself. No visitor data passes through GitHub; we name it for transparency. See{' '}
              <a
                className="text-primary hover:text-accent transition-colors"
                href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Privacy Statement
              </a>
              .
            </LI>
          </ul>
          <P>
            Some Site infrastructure is operated from the United States (Cloudflare's network). If
            you are visiting from the EEA or UK, your request data may transit through these
            jurisdictions. Both providers maintain Standard Contractual Clauses and the relevant
            equivalent frameworks for EU/EEA → US data transfers.
          </P>

          <H2>8. Social-media platforms</H2>
          <P>
            The Site links to public profiles and channels on LinkedIn, Facebook, Instagram, GitHub,
            and Telegram, and may publish announcement posts to a Telegram channel and to social
            profiles operated by Sergey Bershadsky. Following one of these external links takes you
            to a third-party platform whose privacy policy then governs your interaction:
          </P>
          <ul className="list-none ml-4 mb-4">
            <LI>
              LinkedIn —{' '}
              <a
                className="text-primary hover:text-accent transition-colors"
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/legal/privacy-policy
              </a>
            </LI>
            <LI>
              Facebook / Instagram (Meta Platforms) —{' '}
              <a
                className="text-primary hover:text-accent transition-colors"
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                facebook.com/privacy/policy
              </a>
            </LI>
            <LI>
              Telegram —{' '}
              <a
                className="text-primary hover:text-accent transition-colors"
                href="https://telegram.org/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                telegram.org/privacy
              </a>
            </LI>
          </ul>
          <P>
            When social posts are published from the Site's automation to one of these channels,
            only the post content (text, links, image attachments) is sent to the platform — no
            visitor data and no third-party data are passed along.
          </P>

          <H2>9. Cookies and similar technologies</H2>
          <P>
            The Site does not set advertising cookies, tracking cookies, or analytics cookies.
            Cloudflare may set a single strictly-necessary cookie (
            <code className="font-mono text-xs text-secondary">__cf_bm</code> or equivalent) to
            distinguish humans from bots for security purposes; this cookie has no profiling use
            and expires within 30 minutes of inactivity.
          </P>

          <H2>10. Your rights</H2>
          <P>
            Depending on where you live, you have some or all of the following rights with respect
            to the limited data described above:
          </P>
          <ul className="list-none ml-4 mb-4">
            <LI>
              <strong className="text-white">Access</strong> — request a copy of the data we
              process about you.
            </LI>
            <LI>
              <strong className="text-white">Rectification</strong> — correct inaccurate data.
            </LI>
            <LI>
              <strong className="text-white">Erasure</strong> — request deletion of your data, to
              the extent we still hold it (raw edge logs typically self-expire within 30 days).
            </LI>
            <LI>
              <strong className="text-white">Restriction</strong> and <strong className="text-white">objection</strong>{' '}
              — limit or object to processing based on legitimate interest.
            </LI>
            <LI>
              <strong className="text-white">Portability</strong> — receive your data in a
              structured machine-readable format.
            </LI>
            <LI>
              <strong className="text-white">Lodge a complaint</strong> — with your local
              data-protection authority. For EEA residents that is typically the national DPA; for
              UK residents, the ICO.
            </LI>
            <LI>
              <strong className="text-white">California residents</strong> — under the CCPA / CPRA
              you additionally have the right to know what we collect, the right to delete, the
              right to correct, and the right to opt out of sale or sharing. We do not sell or
              share personal data for cross-context behavioural advertising, so the "Do Not Sell or
              Share" right is satisfied by default.
            </LI>
          </ul>
          <P>
            To exercise any of these rights, send a message via{' '}
            <a
              className="text-primary hover:text-accent transition-colors"
              href={CONTACT_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            . We will respond within the time required by the applicable law (no later than 30 days
            in most jurisdictions).
          </P>

          <H2>11. Children</H2>
          <P>
            The Site is not directed to children under 13 (or under 16 in jurisdictions that apply
            that threshold). We do not knowingly collect personal information from children. If
            you believe a child has provided personal information to us, write to the address above
            and we will delete it.
          </P>

          <H2>12. Security</H2>
          <P>
            Traffic to the Site is served over HTTPS with TLS 1.2+. The Site is fully static; there
            is no application server, no database, and no user account system to compromise. The
            infrastructure providers named above carry their own security certifications (SOC 2,
            ISO 27001, etc.) for the layers they control.
          </P>

          <H2>13. Changes to this policy</H2>
          <P>
            If this policy changes materially, the effective date at the top of this page will be
            updated and the prior version will be archived in the public git history of the Site
            (
            <a
              className="text-primary hover:text-accent transition-colors"
              href="https://github.com/sergio-bershadsky/bershadsky.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/sergio-bershadsky/bershadsky.dev
            </a>
            ). Non-material changes — typos, link corrections, clarifications that do not change
            the processing — may be made without notice.
          </P>

          <H2>14. Contact</H2>
          <P>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" />
              <a
                className="text-primary hover:text-accent transition-colors"
                href={CONTACT_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/bershadsky
              </a>
            </span>
            <br />
            Sergey Bershadsky · Lisbon, Portugal
          </P>

          <div className="border-t border-white/10 mt-10 pt-4 font-mono text-xs text-muted-foreground">
            END_OF_DOCUMENT // {EFFECTIVE_DATE}
          </div>
        </NeonCard>
      </main>
    </div>
  );
}
