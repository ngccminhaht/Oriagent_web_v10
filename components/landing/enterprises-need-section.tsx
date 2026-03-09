"use client";

import { useEffect, useRef, useState } from "react";


const hexagonItems = [
  {
    title: "Shift from Shopping Applications to Personal Assistants",
    position: "left-top",
  },
  {
    title: "Adaptive Network Architecture (AI Agent System)",
    position: "center-top",
  },
  {
    title: "Operational Organization Model",
    position: "right-top",
  },
  {
    title: "AI Control & Governance",
    position: "left-bottom",
  },
  {
    title: "Learning Capability & User Understanding",
    position: "center-bottom",
  },
  {
    title: "Data – Knowledge",
    position: "right-bottom",
  },
];

const descriptions = [
  {
    text: "Each customer, when using a service, does not simply interact with an application, but is supported by a personal AI assistant that understands context, behavior, and individual needs throughout the entire customer lifecycle.",
    position: "left-1",
  },
  {
    text: "Establish a tightly connected network between Users – Products/Services – AI Agents, enabling maximum leverage of network effects and helping the system become increasingly intelligent, efficient, and value-generating.",
    position: "right-1",
  },
  {
    text: "Organize around a new development and operating model, featuring close and flexible collaboration between humans and machines, applying the Human-in-the-loop principle to ensure accuracy, safety, and controllability.",
    position: "right-2",
  },
  {
    text: "Upgrade data awareness and transform how data is organized and exploited, turning data from a 'static resource' into a 'living source' that is continuously updated, learned from, and converted into knowledge to serve AI Agents.",
    position: "right-3",
  },
  {
    text: "Each personal AI assistant must be equipped with the ability to continuously learn from real user interactions and new data, enabling deeper understanding of user behavior, goals, and latent needs.",
    position: "left-2",
  },
  {
    text: "As AI Agents become deeply embedded in operations, organizations must establish a robust AI governance framework to control behavior, manage automation permissions, enable monitoring and timely intervention, and ensure compliance with legal, ethical, and business objectives.",
    position: "left-3",
  },
];

export function EnterprisesNeedSection() {
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
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f5f5f5] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Enterprises Need
            <span className="w-8 h-px bg-foreground/30" />
          </span>
        </div>

        {/* Main content - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Left descriptions */}
          <div className="flex flex-col gap-16">
            {descriptions.filter(d => d.position.startsWith('left')).map((desc, index) => (
              <div
                key={index}
                className={`text-right transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {desc.text}
                </p>
              </div>
            ))}
          </div>

          {/* Center hexagons */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <svg 
              width="400" 
              height="500" 
              viewBox="0 0 400 500" 
              className="w-[320px] lg:w-[400px]"
            >
              {/* Hexagon definitions */}
              <defs>
                <clipPath id="hexClip">
                  <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                </clipPath>
              </defs>

              {/* Row 1 - 2 hexagons */}
              <g transform="translate(100, 30)">
                <polygon 
                  points="50,0 100,28 100,84 50,112 0,84 0,28" 
                  fill="#e8e8e8" 
                  stroke="#d0d0d0" 
                  strokeWidth="1"
                />
                <text x="50" y="45" textAnchor="middle" className="fill-foreground text-xs font-medium">
                  <tspan x="50" dy="0">Adaptive</tspan>
                  <tspan x="50" dy="14">Network</tspan>
                  <tspan x="50" dy="14">Architecture</tspan>
                  <tspan x="50" dy="14">(AI Agent System)</tspan>
                </text>
              </g>

              {/* Row 2 - 3 hexagons */}
              <g transform="translate(45, 125)">
                <polygon 
                  points="50,0 100,28 100,84 50,112 0,84 0,28" 
                  fill="#e8e8e8" 
                  stroke="#d0d0d0" 
                  strokeWidth="1"
                />
                <text x="50" y="40" textAnchor="middle" className="fill-foreground text-xs font-medium">
                  <tspan x="50" dy="0">Shift from</tspan>
                  <tspan x="50" dy="14">Shopping</tspan>
                  <tspan x="50" dy="14">Applications to</tspan>
                  <tspan x="50" dy="14">Personal</tspan>
                  <tspan x="50" dy="14">Assistants</tspan>
                </text>
              </g>

              <g transform="translate(155, 125)">
                <polygon 
                  points="50,0 100,28 100,84 50,112 0,84 0,28" 
                  fill="#e8e8e8" 
                  stroke="#d0d0d0" 
                  strokeWidth="1"
                />
                <text x="50" y="48" textAnchor="middle" className="fill-foreground text-xs font-medium">
                  <tspan x="50" dy="0">Operational</tspan>
                  <tspan x="50" dy="14">Organization</tspan>
                  <tspan x="50" dy="14">Model</tspan>
                </text>
              </g>

              {/* Row 3 - 2 hexagons */}
              <g transform="translate(100, 220)">
                <polygon 
                  points="50,0 100,28 100,84 50,112 0,84 0,28" 
                  fill="#e8e8e8" 
                  stroke="#d0d0d0" 
                  strokeWidth="1"
                />
                <text x="50" y="48" textAnchor="middle" className="fill-foreground text-xs font-medium">
                  <tspan x="50" dy="0">Data –</tspan>
                  <tspan x="50" dy="14">Knowledge</tspan>
                </text>
              </g>

              {/* Row 4 - 3 hexagons */}
              <g transform="translate(45, 315)">
                <polygon 
                  points="50,0 100,28 100,84 50,112 0,84 0,28" 
                  fill="#e8e8e8" 
                  stroke="#d0d0d0" 
                  strokeWidth="1"
                />
                <text x="50" y="40" textAnchor="middle" className="fill-foreground text-xs font-medium">
                  <tspan x="50" dy="0">AI Control &</tspan>
                  <tspan x="50" dy="14">Governance</tspan>
                </text>
              </g>

              <g transform="translate(155, 315)">
                <polygon 
                  points="50,0 100,28 100,84 50,112 0,84 0,28" 
                  fill="#e8e8e8" 
                  stroke="#d0d0d0" 
                  strokeWidth="1"
                />
                <text x="50" y="40" textAnchor="middle" className="fill-foreground text-xs font-medium">
                  <tspan x="50" dy="0">Learning</tspan>
                  <tspan x="50" dy="14">Capability &</tspan>
                  <tspan x="50" dy="14">User</tspan>
                  <tspan x="50" dy="14">Understanding</tspan>
                </text>
              </g>
            </svg>
          </div>

          {/* Right descriptions */}
          <div className="flex flex-col gap-16">
            {descriptions.filter(d => d.position.startsWith('right')).map((desc, index) => (
              <div
                key={index}
                className={`text-left transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {desc.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-8">
          {hexagonItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-[#e8e8e8] border border-[#d0d0d0] p-6 mb-4">
                <h3 className="text-lg font-semibold text-foreground text-center">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {descriptions[index]?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
