"use client";

import { useEffect, useState, useRef } from "react";

import { useTranslations } from "next-intl";

// Typewriter component for AI-like text generation effect
function TypewriterText({ text, delay = 0, isVisible }: { text: string; delay?: number; isVisible: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setStartTyping(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  useEffect(() => {
    if (!startTyping) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Speed of typing effect

    return () => clearInterval(interval);
  }, [startTyping, text]);

  return (
    <span className="text-sm lg:text-base text-muted-foreground leading-relaxed">
      {displayedText}
      {startTyping && displayedText.length < text.length && (
        <span className="inline-block w-0.5 h-4 bg-muted-foreground/50 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

export function InfrastructureSection() {
  const t = useTranslations("InfrastructureSection");

  const enterpriseNeeds = [
    {
      title: t("items.personalAIAssistants.title"),
      description: t("items.personalAIAssistants.description"),
      side: "left",
    },
    {
      title: t("items.learningUnderstanding.title"),
      description: t("items.learningUnderstanding.description"),
      side: "left",
    },
    {
      title: t("items.controlGovernance.title"),
      description: t("items.controlGovernance.description"),
      side: "left",
    },
    {
      title: t("items.adaptiveArchitecture.title"),
      description: t("items.adaptiveArchitecture.description"),
      side: "right",
    },
    {
      title: t("items.operationalOrg.title"),
      description: t("items.operationalOrg.description"),
      side: "right",
    },
    {
      title: t("items.dataToKnowledge.title"),
      description: t("items.dataToKnowledge.description"),
      side: "right",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const leftItems = enterpriseNeeds.filter((item) => item.side === "left");
  const rightItems = enterpriseNeeds.filter((item) => item.side === "right");

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {t("eyebrow")}
            <span className="w-8 h-px bg-foreground/30" />
          </span>
        </div>

        {/* 6 Boxes Grid - 3 left, 3 right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {leftItems.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-500 rounded-[10px] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg lg:text-xl font-display mb-3 text-foreground">
                  {item.title}
                </h3>
                <TypewriterText 
                  text={item.description} 
                  delay={index * 300 + 500} 
                  isVisible={isVisible} 
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {rightItems.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-500 rounded-[10px] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <h3 className="text-lg lg:text-xl font-display mb-3 text-foreground">
                  {item.title}
                </h3>
                <TypewriterText 
                  text={item.description} 
                  delay={(index + 3) * 300 + 500} 
                  isVisible={isVisible} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
