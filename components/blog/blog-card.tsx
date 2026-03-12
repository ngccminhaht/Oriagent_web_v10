import Link from "next/link";
import { BlogPost } from "@/lib/contentful";
import { useLocale } from "next-intl";

interface BlogCardProps {
  post: BlogPost;
  variant?: "hero" | "default";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const locale = useLocale();
  const date = new Date(post.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const imageUrl = post.thumbnail?.fields?.file?.url 
    ? `https:${post.thumbnail.fields.file.url}` 
    : "/placeholder.svg";

  if (variant === "hero") {
    return (
      <Link href={`/${locale}/blog/${post.slug}`} className="group block mb-12 lg:mb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-background border border-foreground/10 p-6 rounded-[20px] transition-all duration-300 hover:border-foreground/30 hover:shadow-lg">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-[12px]">
            <img 
              src={imageUrl} 
              alt={post.title} 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center lg:px-8 lg:py-12">
            <span className="text-sm text-muted-foreground mb-4 block font-mono">
              {date}
            </span>
            <h2 className="text-3xl lg:text-5xl font-display text-foreground leading-tight mb-6 group-hover:text-foreground/80 transition-colors">
              {post.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
              {post.excerpt}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-medium px-3 py-1 bg-foreground/5 text-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default variant (Grid)
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <div className="flex flex-col h-full bg-background border border-foreground/10 rounded-[16px] overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:shadow-md">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <span className="text-xs text-muted-foreground mb-3 block font-mono">
            {date}
          </span>
          <h3 className="text-xl font-display text-foreground leading-tight mb-3 group-hover:text-foreground/80 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          {post.tags && post.tags.length > 0 && (
             <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-foreground/10">
               {post.tags.slice(0, 2).map((tag, idx) => (
                 <span 
                   key={idx} 
                   className="text-xs font-medium text-foreground/70"
                 >
                   #{tag}
                 </span>
               ))}
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
