"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function PricingSection() {
  const t = useTranslations("PricingSection");
  
  const plans = [
    {
      name: t("plans.starter.name"),
      description: t("plans.starter.description"),
      price: { monthly: 0, annual: 0 },
      features: [
        t("plans.starter.features.0"),
        t("plans.starter.features.1"),
        t("plans.starter.features.2"),
        t("plans.starter.features.3"),
        t("plans.starter.features.4"),
      ],
      cta: t("plans.starter.cta"),
      popular: false,
    },
    {
      name: t("plans.pro.name"),
      description: t("plans.pro.description"),
      price: { monthly: 29, annual: 24 },
      features: [
        t("plans.pro.features.0"),
        t("plans.pro.features.1"),
        t("plans.pro.features.2"),
        t("plans.pro.features.3"),
        t("plans.pro.features.4"),
        t("plans.pro.features.5"),
        t("plans.pro.features.6"),
      ],
      cta: t("plans.pro.cta"),
      popular: true,
    },
    {
      name: t("plans.enterprise.name"),
      description: t("plans.enterprise.description"),
      price: { monthly: null, annual: null },
      features: [
        t("plans.enterprise.features.0"),
        t("plans.enterprise.features.1"),
        t("plans.enterprise.features.2"),
        t("plans.enterprise.features.3"),
        t("plans.enterprise.features.4"),
        t("plans.enterprise.features.5"),
        t("plans.enterprise.features.6"),
        t("plans.enterprise.features.7"),
      ],
      cta: t("plans.enterprise.cta"),
      popular: false,
    },
  ];

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
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 rounded-[10px] overflow-hidden">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background rounded-[10px] ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
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
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl lg:text-6xl text-foreground">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">{t("perMonth")}</span>
                  </div>
                ) : (
                  <span className="font-display text-4xl text-foreground">{t("custom")}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group rounded-[10px] ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
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
