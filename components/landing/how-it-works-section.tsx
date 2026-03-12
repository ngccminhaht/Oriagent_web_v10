"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("HowItWorksSection");

  const steps = [
    {
      number: "I",
      title: t("steps.fragmentedEcosystem.title"),
      description: t("steps.fragmentedEcosystem.description"),
    },
    {
      number: "II",
      title: t("steps.lackOfGovernance.title"),
      description: t("steps.lackOfGovernance.description"),
    },
    {
      number: "III",
      title: t("steps.deploymentBarriers.title"),
      description: t("steps.deploymentBarriers.description"),
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            {t("eyebrow")}
          </span>
        </div>

        {/* Main content - 2 columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left column - AI Adoption content */}
          <div>
            <h2
              className={`text-4xl lg:text-5xl font-display tracking-tight transition-all duration-700 mb-6 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t("titleLine1")}
              <br />
              <span className="text-background/50">{t("titleLine2")}</span>
            </h2>
            <p className="text-background/60 text-lg leading-relaxed mb-8">
              {t("description")}
            </p>
            <img 
              src="https://aihive.global/wp-content/uploads/2026/02/Group-1784.png" 
              alt={t("imageAlt")} 
              className="hidden lg:block max-w-[352px]"
            />
          </div>

          {/* Right column - Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`py-6 border-b border-background/10 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-2xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-display mb-2">
                      {step.title}
                    </h3>
                    <p className="text-background/60 leading-relaxed text-sm lg:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </section>
  );
}
