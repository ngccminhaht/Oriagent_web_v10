import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BlogCard } from "@/components/blog/blog-card";
import { getBlogPosts } from "@/lib/contentful";
import { getTranslations } from "next-intl/server";

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("BlogPage");
  
  // Fetch posts from Contentful
  const posts = await getBlogPosts(locale);

  return (
    <main className="relative min-h-screen pb-20 overflow-x-hidden noise-overlay">
      <Navigation />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-32 lg:pt-40" />
      
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-20 lg:mb-32">
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            {t("eyebrow")}
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-foreground/20 rounded-2xl">
            <h3 className="text-2xl font-display mb-2">{t("emptyTitle")}</h3>
            <p className="text-muted-foreground">{t("emptyDescription")}</p>
          </div>
        ) : (
          <div>
            {/* Featured Hero Post */}
            <BlogCard post={posts[0]} variant="hero" />

            {/* Grid for remaining posts */}
            {posts.length > 1 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <BlogCard key={post.slug} post={post} variant="default" />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <FooterSection />
    </main>
  );
}
