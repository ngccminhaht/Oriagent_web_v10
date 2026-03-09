"use client";

import { useEffect, useState, useRef } from "react";

const integrationsRow1 = [
  { name: "Tableau", icon: "https://aihive.global/wp-content/uploads/2026/02/Frame-1782-2.png" },
  { name: "Databricks", icon: "https://aihive.global/wp-content/uploads/2026/02/Slack-2.png" },
  { name: "MySQL", icon: "https://aihive.global/wp-content/uploads/2026/02/PDF-2.png" },
  { name: "PostgreSQL", icon: "https://aihive.global/wp-content/uploads/2026/02/google-cloud-3.png" },
  { name: "Snowflake", icon: "https://aihive.global/wp-content/uploads/2026/02/Data-Studio-1.png" },
  { name: "Google Analytics", icon: "https://aihive.global/wp-content/uploads/2026/02/Office-4.png" },
  { name: "MongoDB", icon: "https://aihive.global/wp-content/uploads/2026/02/Office-5.png" },
  { name: "dotdigital", icon: "https://aihive.global/wp-content/uploads/2026/02/Frame-1782.png" },
  { name: "Slack", icon: "https://aihive.global/wp-content/uploads/2026/02/Slack.png" },
  { name: "PDF", icon: "https://aihive.global/wp-content/uploads/2026/02/PDF.png" },
  { name: "Google Cloud", icon: "https://aihive.global/wp-content/uploads/2026/02/google-cloud.png" },
  { name: "Data Studio", icon: "https://aihive.global/wp-content/uploads/2026/02/Data-Studio.png" },
  { name: "Microsoft Office", icon: "https://aihive.global/wp-content/uploads/2026/02/Office.png" },
  { name: "Excel", icon: "https://aihive.global/wp-content/uploads/2026/02/Office-1.png" },
];

const integrationsRow2 = [
  { name: "Shopify", icon: "https://aihive.global/wp-content/uploads/2026/02/Frame-1782-3.png" },
  { name: "BigCommerce", icon: "https://aihive.global/wp-content/uploads/2026/02/Slack-3.png" },
  { name: "WooCommerce", icon: "https://aihive.global/wp-content/uploads/2026/02/PDF-3.png" },
  { name: "Commerce Cloud", icon: "https://aihive.global/wp-content/uploads/2026/02/google-cloud-2.png" },
  { name: "Commercetools", icon: "https://aihive.global/wp-content/uploads/2026/02/Data-Studio-2.png" },
  { name: "Shopify Plus", icon: "https://aihive.global/wp-content/uploads/2026/02/Office-6.png" },
  { name: "Magento", icon: "https://aihive.global/wp-content/uploads/2026/02/Office-7.png" },
  { name: "Oracle", icon: "https://aihive.global/wp-content/uploads/2026/02/Office-3.png" },
  { name: "Odoo", icon: "https://aihive.global/wp-content/uploads/2026/02/Frame-1782-1.png" },
  { name: "Liferay", icon: "https://aihive.global/wp-content/uploads/2026/02/Slack-1.png" },
  { name: "Lark", icon: "https://aihive.global/wp-content/uploads/2026/02/PDF-1.png" },
  { name: "Zoho", icon: "https://aihive.global/wp-content/uploads/2026/02/google-cloud-1.png" },
];

export function IntegrationsSection() {
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

  return (
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Integrations
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Built for Enterprises That
            <br />
            Take AI Seriously
          </h2>
          <p className="text-xl text-muted-foreground">
            Oriagent integrates securely with enterprise data sources to power scalable, production-ready AI agents.
          </p>
        </div>

      </div>
      
      {/* Full-width marquees outside container */}
      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrationsRow1.map((integration) => (
                <div
                  key={`${integration.name}-${setIndex}`}
                  className="shrink-0 px-6 py-4 bg-white border border-foreground/10 hover:border-foreground/30 transition-all duration-300 group flex items-center justify-center"
                >
                  <img 
                    src={integration.icon} 
                    alt={integration.name}
                    className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrationsRow2.map((integration) => (
                <div
                  key={`${integration.name}-reverse-${setIndex}`}
                  className="shrink-0 px-6 py-4 bg-white border border-foreground/10 hover:border-foreground/30 transition-all duration-300 group flex items-center justify-center"
                >
                  <img 
                    src={integration.icon} 
                    alt={integration.name}
                    className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
