import { useParams, useLocation, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useTranslation } from "react-i18next";

function RichContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
      if (boldMatch) {
        parts.push(<strong key={key++} className="font-semibold text-foreground">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Italic: *text*
      const italicMatch = remaining.match(/^\*(.+?)\*/);
      if (italicMatch) {
        parts.push(<em key={key++} className="italic">{italicMatch[1]}</em>);
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Regular character
      const nextSpecial = remaining.slice(1).search(/\*/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else {
        parts.push(remaining.slice(0, nextSpecial + 1));
        remaining = remaining.slice(nextSpecial + 1);
      }
    }

    return parts;
  };

  while (i < lines.length) {
    const line = lines[i];

    // H2: ## heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3: ### heading
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-foreground mt-5 mb-2">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Divider: ---
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="my-6 border-border" />);
      i++;
      continue;
    }

    // Image: ![alt](url)
    const imageMatch = line.match(/^!\[(.*)?\]\((.+)\)$/);
    if (imageMatch) {
      elements.push(
        <figure key={i} className="my-4">
          <img
            src={imageMatch[2]}
            alt={imageMatch[1] || ""}
            className="w-full rounded-lg"
          />
          {imageMatch[1] && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {imageMatch[1]}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Bullet list: - item or • item
    if (line.match(/^[-•]\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[-•]\s/)) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="my-3 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-muted-foreground">
              <span className="text-primary mt-1.5 text-xs">●</span>
              <span className="flex-1">{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-muted-foreground leading-relaxed">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-3">{elements}</div>;
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { promos } = useNotifications();
  const { t } = useTranslation();

  const article = promos.find((p) => p.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{t("article.notFound")}</p>
          <Link href="/home" className="text-primary font-medium">
            {t("article.goBackHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image with Back Arrow */}
      <div className="relative aspect-[16/10] bg-muted">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground">{t("article.noImage")}</span>
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
      <main className="p-5 pb-20">
        <h1 className="text-2xl font-bold text-foreground mb-4">{article.title}</h1>
        <RichContent content={article.body} />
      </main>
    </div>
  );
}
