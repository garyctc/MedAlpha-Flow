import * as React from "react";

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}

const fallbackGradients = [
  "from-sky-100 to-cyan-50",
  "from-indigo-100 to-sky-50",
  "from-teal-100 to-emerald-50",
];

export type PromoCardProps = {
  id: string;
  title: string;
  body: string;
  url?: string;
  imageUrl?: string;
};

export function PromoCard({ id, title, body, url, imageUrl }: PromoCardProps) {
  const fallbackGradient = fallbackGradients[stableHash(id) % fallbackGradients.length];

  const content = (
    <div className="overflow-hidden rounded-2xl bg-white border border-border h-[240px] flex flex-col">
      {/* Image area */}
      <div className="h-[160px] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient}`} />
        )}
      </div>
      {/* Text area */}
      <div className="p-4 flex-1 flex flex-col justify-center">
        <h2 className="text-base font-semibold text-gray-900 leading-tight line-clamp-1">{title}</h2>
        <p className="text-sm text-gray-600 leading-snug line-clamp-2 mt-1">{body}</p>
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {content}
      </a>
    );
  }

  return <div className="rounded-2xl">{content}</div>;
}
