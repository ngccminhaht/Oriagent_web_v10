"use client";

import { useEffect, useRef, useState } from "react";

const solutionItems = [
  {
    title: "Data Connectors",
    description: "SharePoint, OneDrive\nGoogle Drive\nAmazon S3\nSnowflake and other data warehouses",
    side: "left",
  },
  {
    title: "AI Models",
    description: "OpenAI, Anthropic, Meta, Mistral\nGroq, Gemini, Local MML, Deepseek, Kimi\nDeepgram, ElevenLabs",
    side: "left",
  },
  {
    title: "Pre-built Interfaces",
    description: "Chat interface\nBatch processing\nSmart forms\nVoice assistants\nWebsite chatbots",
    side: "left",
  },
  {
    title: "Governance",
    description: "AI guardrails, PII masking\nRole-Based Access Control (RBAC)\nGroup management\nSingle Sign-On (SSO)",
    side: "right",
  },
  {
    title: "Analytics",
    description: "Performance analytics\nConversation tracking\nAutomated report generation",
    side: "right",
  },
  {
    title: "Skills & Integrations",
    description: "Native CRM/ERP integrations, enterprise\ntool support, API-first architecture, and AI\nAgents that execute real actions across\nbusiness systems.",
    side: "right",
  },
];

export function DevelopersSection() {
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

  const leftItems = solutionItems.filter((item) => item.side === "left");
  const rightItems = solutionItems.filter((item) => item.side === "right");

  return (
    <section
      id="developers"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#f5f5f5]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Solution
            <span className="w-8 h-px bg-foreground/30" />
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="relative">
          {/* Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className={`w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <img
                src="/icon_logo.svg"
                alt="Oriagent"
                className="h-12 lg:h-16 w-auto"
              />
            </div>
          </div>

          {/* Connecting Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* Vertical center line */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#d1d5db"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Horizontal center line */}
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#d1d5db"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 relative">
            {/* Left Column */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {leftItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-start transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex-1 text-right">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Column - Spacer for logo */}
            <div className="hidden lg:flex items-center justify-center min-h-[400px]" />

            {/* Right Column */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {rightItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-start transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
