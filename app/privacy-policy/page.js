import Link from "next/link";
import { Reveal } from "@/components/PageAnimate";

export const metadata = {
  title: "Privacy Policy | Blessed Mike's Entertainment",
  description: "How Blessed Mike's Entertainment handles visitor and community data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-zinc-950 text-white">
      <header className="border-b border-zinc-900 px-5 py-20 sm:px-8 md:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-500">Legal / Version 1.0</p>
          <h1 className="mt-5 font-sports text-5xl font-bold uppercase sm:text-7xl">Privacy Policy</h1>
          <p className="mt-6 max-w-2xl leading-8 text-zinc-400">Effective 17 July 2026. This policy explains the information involved when you read, comment on, or contact Blessed Mike&apos;s Entertainment.</p>
        </Reveal>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:py-24">
        <aside className="h-fit rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5 text-sm leading-6 text-amber-100 lg:sticky lg:top-28">
          <strong className="block text-xs uppercase tracking-widest text-amber-400">Publication review</strong>
          <p className="mt-3">The owner and Nigeria-qualified counsel should confirm the legal entity, privacy contact, retention periods, hosting regions, and cross-border safeguards before relying on this policy.</p>
        </aside>

        <article className="legal-copy space-y-12 text-zinc-300">
          <section><h2>1. Who is responsible</h2><p>Blessed Mike&apos;s Entertainment operates this media website and determines how information submitted through it is used. The business&apos;s full legal entity name, registered address, and formal privacy contact remain to be confirmed before publication. Privacy requests may currently be initiated through the <Link href="/contact-press">Contact Press page</Link>.</p></section>
          <section><h2>2. Information involved</h2><p>We may process the name or display name and comment you submit, the post associated with that comment, press-inquiry details you choose to send through your email application, and administrator account identifiers used to secure the publishing console. Our hosting and database providers may also process technical information such as IP address, browser type, device details, request timestamps, security logs, and cookie data.</p><p>The current newsletter field is a visual interface only and does not subscribe or store an address. We do not currently process payments or payment-card information through this website.</p></section>
          <section><h2>3. Why we use information</h2><p>Information is used to publish and moderate community comments, respond to media inquiries, deliver and secure the website, prevent abuse, investigate errors, maintain administrator sessions, and comply with legal obligations. Where applicable, the lawful basis may include your consent, steps taken at your request, legitimate interests in operating and securing an editorial service, or a legal obligation. The appropriate basis must be confirmed for each production data flow.</p></section>
          <section><h2>4. Cookies and local storage</h2><p>The administrator area uses secure, HTTP-only authentication cookies. Ordinary visitors are not currently issued advertising or analytics cookies by the application. Supabase, Vercel, browsers, or embedded services may use technically necessary storage to deliver their services. If analytics, advertising, or new embeds are introduced, this section and any consent controls must be updated first.</p></section>
          <section><h2>5. Service providers and transfers</h2><p>Supabase provides authentication, database, and media storage services. Vercel provides application hosting and delivery. These providers may process data in countries outside Nigeria. The actual processing regions, contracts, and legally appropriate cross-border transfer safeguards require owner and legal review. We may also disclose information where lawfully required or in connection with a legitimate business transfer.</p></section>
          <section><h2>6. Public comments</h2><p>Comments and display names are intended for public viewing. Do not post private, confidential, or sensitive personal information. We may moderate or remove content that violates our Terms, creates safety risks, infringes rights, or is unlawful.</p></section>
          <section><h2>7. Retention and security</h2><p>We retain information only while it is reasonably needed for the purposes above, security, dispute resolution, or legal compliance. Concrete retention periods for comments, press correspondence, authentication logs, and backups must be approved and documented. We use access controls, row-level database security, restricted server credentials, secure cookies, and transport encryption, but no online system can guarantee absolute security.</p></section>
          <section><h2>8. Your choices and rights</h2><p>Depending on applicable law, you may request access, correction, deletion, restriction, objection, portability, or withdrawal of consent. We may need to verify your identity and may retain information where the law permits or requires it. You may also complain to the Nigeria Data Protection Commission or another competent authority. The applicability and response process should be confirmed by counsel.</p></section>
          <section><h2>9. Children</h2><p>This general-audience service is not designed to knowingly collect personal information from children who cannot lawfully consent. If you believe a child has submitted personal information, contact us so the situation can be reviewed and appropriate action taken.</p></section>
          <section><h2>10. Changes</h2><p>We may update this policy as the website, vendors, or legal obligations change. The effective date and version will be updated, and material changes should be communicated through an appropriate site notice. Prior versions should be retained.</p></section>
        </article>
      </div>
    </div>
  );
}
