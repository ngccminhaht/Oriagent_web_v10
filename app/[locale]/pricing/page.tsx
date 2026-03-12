import { Navigation } from "@/components/landing/navigation";
import { PricingSection } from "@/components/landing/pricing-section";
import { FooterSection } from "@/components/landing/footer-section";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      {/* Spacer to account for fixed navbar height */}
      <div className="pt-20" />
      <PricingSection />
      <FooterSection />
    </main>
  );
}
