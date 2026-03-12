import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'ru'];

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !locales.includes(locale as any)) {
      locale = 'en';
    }

    return {
        locale,
        messages: locale === 'en'
            ? (await import('../messages/en.json')).default
            : (await import('../messages/ru.json')).default
    };
});
