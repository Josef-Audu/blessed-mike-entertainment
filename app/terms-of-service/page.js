import Link from "next/link";
import { Reveal } from "@/components/PageAnimate";

export const metadata = {
  title: "Terms of Service | Blessed Mike's Entertainment",
  description: "Terms governing use of Blessed Mike's Entertainment and its community features.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-zinc-950 text-white">
      <header className="border-b border-zinc-900 px-5 py-20 sm:px-8 md:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-500">Legal / Version 1.0</p>
          <h1 className="mt-5 font-sports text-5xl font-bold uppercase sm:text-7xl">Terms of Service</h1>
          <p className="mt-6 max-w-2xl leading-8 text-zinc-400">Effective 17 July 2026. These Terms govern access to our editorial website and participation in its comment community.</p>
        </Reveal>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:py-24">
        <aside className="h-fit rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5 text-sm leading-6 text-amber-100 lg:sticky lg:top-28">
          <strong className="block text-xs uppercase tracking-widest text-amber-400">Publication review</strong>
          <p className="mt-3">The legal entity, address, governing law, dispute venue, liability provisions, and age threshold require business-owner and Nigeria-qualified legal approval before launch.</p>
        </aside>

        <article className="legal-copy space-y-12 text-zinc-300">
          <section><h2>1. Acceptance</h2><p>By accessing Blessed Mike&apos;s Entertainment or submitting a comment, you agree to these Terms and our <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree, do not use the service. The provider&apos;s full legal entity and registered address remain to be inserted before publication.</p></section>
          <section><h2>2. Editorial service</h2><p>We publish sports, music, film, entertainment, and pop-culture reporting and commentary. Content is provided for general information and entertainment and is not professional, financial, legal, medical, betting, or investment advice. We may correct, update, reorganise, or remove content without notice.</p></section>
          <section><h2>3. Eligibility</h2><p>You must have the legal capacity to accept these Terms. A guardian should supervise use by anyone who cannot independently consent under applicable law. The final minimum age and any parental-consent process require legal review.</p></section>
          <section><h2>4. Community comments</h2><p>You retain ownership of a comment you submit. You grant us a non-exclusive, worldwide, royalty-free licence to host, reproduce, display, format, moderate, and distribute that comment as needed to operate and promote the relevant discussion. You represent that you have the rights needed to submit it.</p><p>We may remove comments or restrict participation, but we are not obliged to pre-screen every submission.</p></section>
          <section><h2>5. Acceptable use</h2><p>You must not submit unlawful, threatening, hateful, defamatory, sexually exploitative, deceptive, privacy-invasive, or rights-infringing material; impersonate others; distribute malware or spam; scrape the service beyond lawful and reasonable use; probe security; evade rate limits; manipulate engagement; or interfere with the website or another visitor.</p></section>
          <section><h2>6. Intellectual property</h2><p>Except for community content and identified third-party material, the website&apos;s branding, design, code, original articles, graphics, and editorial presentation belong to Blessed Mike&apos;s Entertainment or its licensors. You may link to public pages and share brief excerpts with attribution where lawful. Republishing full articles, removing attribution, or commercial reuse requires written permission.</p></section>
          <section><h2>7. Third-party material</h2><p>Stories may reference or link to third-party websites, media, artists, teams, studios, or platforms. Those services control their own content and terms. A link, embed, review, or report does not necessarily mean endorsement, partnership, or responsibility for the third party.</p></section>
          <section><h2>8. Availability and security</h2><p>We aim to keep the service available and secure but do not promise uninterrupted or error-free operation. Access may be suspended for maintenance, security, legal compliance, provider outages, or misuse. You must not attempt to access the administrator console or non-public systems without authorisation.</p></section>
          <section><h2>9. Disclaimers and liability</h2><p>The service is provided on an as-available basis to the extent permitted by law. Editorial content can contain errors or become outdated, and visitors should independently verify decisions that matter to them. Any exclusions, liability cap, consumer-law carve-outs, and treatment of indirect loss require lawyer review and must not exclude rights that applicable law does not allow us to exclude.</p></section>
          <section><h2>10. Reports, suspension, and termination</h2><p>You may report rights concerns, errors, or misuse through the <Link href="/contact-press">Contact Press page</Link>. We may investigate, preserve relevant records, remove content, block abusive traffic, or suspend access where reasonably necessary. Provisions concerning ownership, licences, disclaimers, liability, and disputes survive termination where appropriate.</p></section>
          <section><h2>11. Governing law and disputes</h2><p>The intended governing law is the law applicable in Nigeria, subject to mandatory consumer protections. The precise governing-law clause, negotiation process, court or arbitration mechanism, and venue are marked for lawyer review before these Terms are relied upon.</p></section>
          <section><h2>12. Changes and contact</h2><p>We may revise these Terms as the service evolves. The version and effective date will be updated, and material changes should receive reasonable notice. Questions, correction requests, and legal notices may be initiated through the <Link href="/contact-press">Contact Press page</Link> until formal notice details are confirmed.</p></section>
        </article>
      </div>
    </div>
  );
}
