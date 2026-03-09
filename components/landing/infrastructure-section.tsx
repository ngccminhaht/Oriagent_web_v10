"use client";

import { useEffect, useState, useRef } from "react";

const enterpriseNeeds = [
  {
    title: "Personal AI Assistants",
    description: "Transform customer interactions with AI that understands context and individual needs.",
    side: "left",
  },
  {
    title: "Learning & Understanding",
    description: "AI that continuously learns from interactions to understand user behavior and goals.",
    side: "left",
  },
  {
    title: "AI Control & Governance",
    description: "Robust framework to control AI behavior, manage permissions, and ensure compliance.",
    side: "left",
  },
  {
    title: "Adaptive Network Architecture",
    description: "Connected network between Users, Products, and AI Agents for maximum efficiency.",
    side: "right",
  },
  {
    title: "Operational Organization",
    description: "Human-in-the-loop collaboration between humans and machines for safety and accuracy.",
    side: "right",
  },
  {
    title: "Data to Knowledge",
    description: "Transform static data into living knowledge that continuously serves AI Agents.",
    side: "right",
  },
];

export function InfrastructureSection() {
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
            Enterprises Need
            <span className="w-8 h-px bg-foreground/30" />
          </span>
        </div>

        {/* 6 Boxes Grid - 3 left, 3 right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="grid grid-rows-3 gap-6">
            {leftItems.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-500 flex flex-col justify-center aspect-[3/2] lg:aspect-[2/1] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg lg:text-xl font-display mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="grid grid-rows-3 gap-6">
            {rightItems.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-500 flex flex-col justify-center aspect-[3/2] lg:aspect-[2/1] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <h3 className="text-lg lg:text-xl font-display mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
