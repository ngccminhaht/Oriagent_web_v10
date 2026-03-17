"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

const planKeys = ["free", "starter", "growth", "enterprise"] as const;

export function PricingSection() {
  const t = useTranslations("PricingSection");

  const plans = planKeys.map((key) => ({
    key,
    name: t(`plans.${key}.name`),
    description: t(`plans.${key}.description`),
    cta: t(`plans.${key}.cta`),
    supportSla: t(`plans.${key}.supportSla`),
  }));

  const prices: Record<string, { monthly: number | null; annual: number | null }> = {
    free: { monthly: 0, annual: 0 },
    starter: { monthly: 29, annual: 25 },
    growth: { monthly: 149, annual: 127 },
    enterprise: { monthly: null, annual: null },
  };

  const popularPlan = "starter";

  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            {t("titleLine1")}
            <br />
            <span className="text-stroke">{t("titleLine2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            {t("description")}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t("monthly")}
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-foreground/10 rounded-full p-1 transition-colors hover:bg-foreground/20"
          >
            <div
              className={`w-5 h-5 bg-foreground rounded-full transition-transform duration-300 ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm transition-colors ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t("annual")}
          </span>
          {isAnnual && (
            <span className="ml-2 px-2 py-1 bg-foreground text-primary-foreground text-xs font-mono rounded-[10px]">
              {t("saveLabel")}
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 rounded-[10px] overflow-hidden">
          {plans.map((plan, idx) => {
            const isPopular = plan.key === popularPlan;
            const price = prices[plan.key];
            const monthlyLimits = t.raw(`plans.${plan.key}.monthlyLimits`) as string[];
            const coreFeatures = t.raw(`plans.${plan.key}.coreFeatures`) as string[];

            return (
              <div
                key={plan.name}
                className={`relative p-8 lg:p-12 bg-background rounded-[10px] ${
                  isPopular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest rounded-[10px]">
                    {t("mostPopular")}
                  </span>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-foreground/10">
                  {price.monthly !== null ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl lg:text-6xl text-foreground">
                        ${isAnnual ? price.annual : price.monthly}
                      </span>
                      <span className="text-muted-foreground">{t("perMonth")}</span>
                    </div>
                  ) : (
                    <span className="font-display text-4xl text-foreground">{t("custom")}</span>
                  )}
                </div>

                {/* Monthly Limits Section */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4 pb-2 border-b border-foreground/10">
                    {t("monthlyLimitsLabel")}
                  </h4>
                  <ul className="space-y-3">
                    {monthlyLimits.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support / SLA Section */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3 pb-2 border-b border-foreground/10">
                    {t("supportSlaLabel")}
                  </h4>
                  <p className="text-sm text-muted-foreground">{plan.supportSla}</p>
                </div>

                {/* Core Features Section */}
                <div className="mb-10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4 pb-2 border-b border-foreground/10">
                    {t("coreFeaturesLabel")}
                  </h4>
                  <ul className="space-y-3">
                    {coreFeatures.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="https://app.oriagent.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group rounded-[10px] ${
                    isPopular
                      ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                      : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          {t("bottomNotePrefix")}{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            {t("compareFeatures")}
          </a>
        </p>
      </div>
    </section>
  );
}
