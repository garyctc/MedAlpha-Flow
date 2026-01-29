import { useParams, useLocation, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationsContext";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { promos } = useNotifications();

  // Find the article by ID from promo notifications
  const article = promos.find((p) => p.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Article not found</p>
          <Link href="/home" className="text-primary font-medium">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image with Back Arrow */}
      <div className="relative h-[40vh] min-h-[280px]">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        {/* Gradient overlay for back button visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        {/* Back button */}
        <button
          onClick={() => setLocation("/home")}
          className="absolute top-12 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
      </div>

      {/* Content */}
      <main className="p-5 space-y-4 pb-20">
        <h1 className="text-2xl font-bold text-foreground">{article.title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {article.body}
        </p>
      </main>
    </div>
  );
}
