"use client";

import { useEffect, useState, useRef } from "react";

const enterpriseNeeds = [
  {
    title: "Shift from Shopping Applications to Personal Assistants",
    description: "Each customer, when using a service, does not simply interact with an application, but is supported by a personal AI assistant that understands context, behavior, and individual needs throughout the entire customer lifecycle.",
    side: "left",
  },
  {
    title: "Learning Capability & User Understanding",
    description: "Each personal AI assistant must be equipped with the ability to continuously learn from real user interactions and new data, enabling deeper understanding of user behavior, goals, and latent needs.",
    side: "left",
  },
  {
    title: "AI Control & Governance",
    description: "As AI Agents become deeply embedded in operations, organizations must establish a robust AI governance framework to control behavior, manage automation permissions, enable monitoring and timely intervention, and ensure compliance with legal, ethical, and business objectives.",
    side: "left",
  },
  {
    title: "Adaptive Network Architecture (AI Agent System)",
    description: "Establish a tightly connected network between Users – Products/Services – AI Agents, enabling maximum leverage of network effects and helping the system become increasingly intelligent, efficient, and value-generating.",
    side: "right",
  },
  {
    title: "Operational Organization Model",
    description: "Organize around a new development and operating model, featuring close and flexible collaboration between humans and machines, applying the Human-in-the-loop principle to ensure accuracy, safety, and controllability.",
    side: "right",
  },
  {
    title: "Data – Knowledge",
    description: "Upgrade data awareness and transform how data is organized and exploited, turning data from a 'static resource' into a 'living source' that is continuously updated, learned from, and converted into knowledge to serve AI Agents.",
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
          <div className="flex flex-col gap-6">
            {leftItems.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-500 ${
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
          <div className="flex flex-col gap-6">
            {rightItems.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 lg:p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-500 ${
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
