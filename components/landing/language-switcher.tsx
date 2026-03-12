"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent } from "react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;

        // Check if we are on a blog detail page
        const isBlogDetailRegex = /^\/[a-zA-Z]{2}\/blog\/([^/]+)$/;
        const match = pathname.match(isBlogDetailRegex);

        let newPath = "";

        if (match) {
            // We are on a single blog post page: /en/blog/slug or /ru/blog/slug
            const currentSlug = match[1];
            try {
                // Fetch the translated slug from our API
                const response = await fetch(`/api/blog/slug?slug=${currentSlug}&targetLocale=${nextLocale}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.slug) {
                        newPath = `/${nextLocale}/blog/${data.slug}`;
                    }
                }
            } catch (error) {
                console.error("Failed to map blog post slug", error);
            }
        }

        // Fallback or ordinary pages just replace the locale prefix
        if (!newPath) {
            const currentPathWithoutLocale = pathname.replace(`/${locale}`, '');
            newPath = `/${nextLocale}${currentPathWithoutLocale}`;
        }

        router.replace(newPath);
    };

    return (
        <select
            value={locale}
            onChange={handleLanguageChange}
            className="bg-transparent text-sm text-foreground/70 hover:text-foreground outline-none cursor-pointer border-none px-2"
        >
            <option value="en">English</option>
            <option value="ru">Русский</option>
        </select>
    );
}
