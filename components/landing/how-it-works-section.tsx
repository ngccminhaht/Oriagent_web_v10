"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Fragmented AI Ecosystem",
    description: "AI tools operate separately without proper integration.",
  },
  {
    number: "II",
    title: "Lack of AI Governance",
    description: "AI agents run without clear control, monitoring, or management.",
  },
  {
    number: "III",
    title: "Production Deployment Barriers",
    description: "Security, compliance, and scaling issues slow real-world deployment.",
  },
];

export function HowItWorksSection() {
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
            Problem
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
              AI Adoption Is High.
              <br />
              <span className="text-background/50">Enterprise AI Success Is Not.</span>
            </h2>
            <p className="text-background/60 text-lg leading-relaxed mb-8">
              93% of enterprises have experimented with AI, yet fewer than 12% have managed to scale it beyond isolated proof-of-concepts. The gap between a promising pilot and real enterprise value remains stubbornly wide.
            </p>
            <img 
              src="https://aihive.global/wp-content/uploads/2026/02/Group-1784.png" 
              alt="Enterprise AI statistics" 
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
