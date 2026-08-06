import CTASection from "@/components/CTASection";
import ContactPressContent from "@/components/ContactPressContent";

export const metadata = {
  title: "Contact Press | Blessed Mike's Entertainment",
  description: "Media inquiries, interview requests, partnerships, and brand resources.",
};

export default function ContactPressPage() {
  return (
    <div className="bg-zinc-950 text-white">
      <CTASection />
      <ContactPressContent />
    </div>
  );
}
