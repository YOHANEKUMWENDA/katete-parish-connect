import { useQuery } from "@tanstack/react-query";
import { Loader, AlertCircle } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  image?: {
    asset: {
      url: string;
    };
  };
  author?: string;
}

const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "";
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
const SANITY_API_VERSION = "2024-01-01";

const SANITY_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...10] {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  "image": image{asset->{url}},
  author
}`;

async function fetchPosts(): Promise<BlogPost[]> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(SANITY_QUERY)}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch posts");

  const data = await response.json();
  return data.result || [];
}

export function BlogPostsFeed() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-[var(--gold)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-900">Unable to load posts</h3>
          <p className="text-sm text-red-700">Please check your Sanity CMS configuration.</p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted-foreground)]">No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <article
          key={post._id}
          className="rounded-xl bg-[var(--cream)] p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
        >
          {post.image && (
            <img
              src={post.image.asset.url}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex items-center gap-3 text-xs mb-3">
            <span className="rounded-full bg-[var(--navy)] text-[var(--gold)] px-3 py-1 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-[var(--muted-foreground)]">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-serif text-2xl text-[var(--navy-deep)]">{post.title}</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{post.excerpt}</p>
          {post.author && (
            <p className="mt-4 text-xs text-[var(--muted-foreground)]">By {post.author}</p>
          )}
          <a
            href={`/blog/${post.slug}`}
            className="mt-4 inline-block text-sm font-semibold text-[var(--navy)] hover:text-[var(--gold)] transition-colors"
          >
            Read More →
          </a>
        </article>
      ))}
    </div>
  );
}
