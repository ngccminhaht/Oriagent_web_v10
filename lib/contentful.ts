import * as contentful from "contentful";
import { Document } from "@contentful/rich-text-types";

// Type definitions for our Contentful 'post' content type
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  thumbnail: contentful.Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | null;
  coverImage: contentful.Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | null;
  tags: string[];
  createdAt: string;
}

// Map app locales to Contentful locales
// Contentful's default locale is often 'en-US' instead of 'en'
const localeMap: Record<string, string> = {
  en: "en-US", // Adjust this if your Contentful default locale is just 'en'
  ru: "ru",
};

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export async function getBlogPosts(locale: string = "en"): Promise<BlogPost[]> {
  const contentfulLocale = localeMap[locale] || localeMap["en"];

  try {
    const entries = await client.getEntries({
      content_type: "post",
      locale: contentfulLocale,
      order: ["-sys.createdAt"],
    });

    // If we're fetching a non-default locale, fetch default locale for fallbacks
    let fallbackEntries: any = null;
    if (contentfulLocale !== localeMap["en"]) {
        fallbackEntries = await client.getEntries({
            content_type: "post",
            locale: localeMap["en"],
            order: ["-sys.createdAt"],
        });
    }

    return entries.items.map((item) => {
      // Add safe checks as types might be loosely mapped
      const fields = item.fields as any; 
      
      let thumbnail = fields.thumbnail;
      let coverImage = fields.coverImage;

      if (fallbackEntries) {
         const fallbackItem = fallbackEntries.items.find((fi: any) => fi.sys.id === item.sys.id);
         if (fallbackItem) {
             const fallbackFields = fallbackItem.fields as any;
             if (!thumbnail || !thumbnail.fields || !thumbnail.fields.file) {
                 thumbnail = fallbackFields.thumbnail;
             }
             if (!coverImage || !coverImage.fields || !coverImage.fields.file) {
                 coverImage = fallbackFields.coverImage;
             }
         }
      }

      return {
        title: fields.title || "Untitled",
        slug: fields.slug || "",
        excerpt: fields.excerpt || "",
        content: fields.content as Document,
        thumbnail: thumbnail ? thumbnail : null,
        coverImage: coverImage ? coverImage : null,
        tags: fields.tags || [],
        createdAt: item.sys.createdAt,
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string,
  locale: string = "en"
): Promise<BlogPost | null> {
  const contentfulLocale = localeMap[locale] || localeMap["en"];

  try {
    const entries = await client.getEntries({
      content_type: "post",
      locale: contentfulLocale,
      "fields.slug": slug,
      limit: 1,
    });

    if (entries.items.length === 0) {
      return null;
    }

    const item = entries.items[0];
    const fields = item.fields as any;
    
    let thumbnail = fields.thumbnail;
    let coverImage = fields.coverImage;

    // Fallback logic
    if (contentfulLocale !== localeMap["en"] && (!thumbnail?.fields?.file || !coverImage?.fields?.file)) {
        try {
            const fallbackEntry = await client.getEntry(item.sys.id, {
                locale: localeMap["en"]
            });
            if (fallbackEntry) {
                const fallbackFields = fallbackEntry.fields as any;
                if (!thumbnail?.fields?.file) thumbnail = fallbackFields.thumbnail;
                if (!coverImage?.fields?.file) coverImage = fallbackFields.coverImage;
            }
        } catch (error) {
            console.error("Error fetching fallback entry:", error);
        }
    }

    return {
      title: fields.title || "Untitled",
      slug: fields.slug || "",
      excerpt: fields.excerpt || "",
      content: fields.content as Document,
      thumbnail: thumbnail ? thumbnail : null,
      coverImage: coverImage ? coverImage : null,
      tags: fields.tags || [],
      createdAt: item.sys.createdAt,
    };
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}
