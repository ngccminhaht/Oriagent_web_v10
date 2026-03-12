import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getBlogPostBySlug, client } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function AsyncEmbeddedAsset({ target }: { target: any }) {
  if (!target) return null;
  
  let file = target.fields?.file;
  let title = target.fields?.title || target.fields?.description || "Embedded image";
  
  if (!file || !file.url) {
    try {
      // Fetch fallback asset
      const asset = await client.getAsset(target.sys.id, { locale: "en-US" } as any);
      file = asset.fields?.file;
      title = asset.fields?.title || asset.fields?.description || "Embedded image";
    } catch (e) {
      console.error("Failed to fetch fallback asset", e);
    }
  }

  if (!file || !file.url) {
    return (
      <div className="my-10 p-6 rounded-xl border border-dashed border-foreground/20 text-center text-muted-foreground text-sm flex items-center justify-center bg-foreground/5 h-40">
        [Image unavailable]
      </div>
    );
  }

  return (
    <div className="my-10 rounded-xl overflow-hidden shadow-lg border border-foreground/10">
      <img src={`https:${file.url}`} alt={title as string} className="w-full h-auto object-cover" />
    </div>
  );
}

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-bold text-foreground">{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-6 leading-relaxed flex-1 text-muted-foreground">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-3xl font-display text-foreground mt-12 mb-6">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-2xl font-display text-foreground mt-10 mb-4">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-foreground/20 pl-6 italic mb-6 text-foreground/80">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const target = node.data?.target;
      return <AsyncEmbeddedAsset target={target} />;
    },
  },
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("BlogPage");
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const date = new Date(post.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const coverUrl = post.coverImage?.fields?.file?.url 
    ? `https:${post.coverImage.fields.file.url}` 
    : post.thumbnail?.fields?.file?.url 
      ? `https:${post.thumbnail.fields.file.url}`
      : "/placeholder.svg";

  return (
    <main className="relative min-h-screen pb-20 overflow-x-hidden noise-overlay bg-background">
      <Navigation />
      <div className="pt-32 lg:pt-40" />
      
      <article className="max-w-[800px] mx-auto px-6 lg:px-8">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t("backToBlog")}
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm tracking-widest text-muted-foreground">
              {date}
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
            {post.title}
          </h1>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-medium px-4 py-1.5 bg-foreground/5 border border-foreground/10 text-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {coverUrl && (
            <div className="w-full aspect-[16/9] overflow-hidden rounded-[20px] mb-16 border border-foreground/10 shadow-lg">
              <img 
                src={coverUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-foreground hover:prose-a:text-muted-foreground prose-a:transition-colors">
          {documentToReactComponents(post.content, richTextOptions)}
        </div>
      </article>

      <div className="mt-32">
        <FooterSection />
      </div>
    </main>
  );
}
