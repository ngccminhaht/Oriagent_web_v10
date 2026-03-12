"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { useTranslations, useLocale } from "next-intl";

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  const t = useTranslations("FooterSection");
  const locale = useLocale();

  const footerLinks = {
    [t("columns.product")]: [
      { name: t("links.features"), href: `/${locale}#features` },
      { name: t("links.problem"), href: `/${locale}#how-it-works` },
      { name: t("links.pricing"), href: `/${locale}/pricing` },
      { name: t("links.integrations"), href: `/${locale}#integrations` },
    ],
    [t("columns.solution")]: [
      { name: t("links.documentation"), href: `/${locale}#developers` },
      { name: t("links.apiReference"), href: "#" },
      { name: t("links.sdk"), href: `/${locale}#developers` },
      { name: t("links.status"), href: "#" },
    ],
    [t("columns.company")]: [
      { name: t("links.about"), href: "#" },
      { name: t("links.blog"), href: `/${locale}/blog` },
      { name: t("links.careers"), href: "#", badge: t("badges.hiring") },
      { name: t("links.contact"), href: "#" },
    ],
    [t("columns.legal")]: [
      { name: t("links.privacy"), href: "#" },
      { name: t("links.terms"), href: "#" },
      { name: t("links.security"), href: "#security" },
    ],
  };

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <img 
                  src="/logo_oriagent.svg" 
                  alt="Oriagent" 
                  className="h-8"
                />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                {t("description")}
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t("bottomBar.copyright")}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {t("bottomBar.systemStatus")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
