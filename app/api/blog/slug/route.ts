import { NextResponse } from 'next/server';
import { client } from '@/lib/contentful';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentSlug = searchParams.get('slug');
  const targetLocale = searchParams.get('targetLocale');

  if (!currentSlug || !targetLocale) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    // Determine the Contentful locale mappings.
    // Contentful often uses 'en-US' for English and 'ru' for Russian.
    const contentfulTargetLocale = targetLocale === 'en' ? 'en-US' : 'ru';
    // The current locale isn't strictly necessary if we search all locales,
    // but we can query all entries and find the one that matches the slug.
    
    // First, find the entry where ANY locale matches the given slug.
    // It's tricky to query across all locales in one go with the JS SDK easily.
    // Alternatively, fetch the entry in English, find the Sys ID, then fetch in Russian.
    // Or vice versa. Let's try to query by slug in both locales.

    // Let's assume the slug might be in en-US or ru.
    let entryId = null;
    
    const enEntries = await client.getEntries({
      content_type: 'post',
      'fields.slug': currentSlug,
      locale: 'en-US',
      limit: 1,
    });
    
    if (enEntries.items.length > 0) {
      entryId = enEntries.items[0].sys.id;
    } else {
      const ruEntries = await client.getEntries({
        content_type: 'post',
        'fields.slug': currentSlug,
        locale: 'ru',
        limit: 1,
      });
      if (ruEntries.items.length > 0) {
        entryId = ruEntries.items[0].sys.id;
      }
    }

    if (!entryId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Now fetch the entry ID in the target locale
    const targetEntry = await client.getEntry(entryId, {
      locale: contentfulTargetLocale,
    });

    const targetSlug = (targetEntry.fields as any).slug;
    
    if (!targetSlug) {
        // Fallback to the original slug if it doesn't have a translated slug
        return NextResponse.json({ slug: currentSlug });
    }
    return NextResponse.json({ slug: targetSlug });
  } catch (error) {
    console.error('Slug mapping error:', error);
    return NextResponse.json({ error: 'Error mapping slug' }, { status: 500 });
  }
}
