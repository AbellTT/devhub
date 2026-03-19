import { Heart, MessageCircle, Share2, MoreHorizontal, Code2 } from "lucide-react";
import { useState } from "react";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes ?? 0);

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "just now";
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <article className="bg-faint border border-divider rounded-xl p-5 hover:border-outline hover:bg-subtle transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary/80 to-accent/80 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(post?.author ?? "U").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text">@{post?.author ?? "anonymous"}</span>
              {post?.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-primary/15 text-primary border border-primary/25 rounded-full">
                  {post.badge}
                </span>
              )}
            </div>
            <span className="text-xs text-dim">{timeAgo(post?.created_at)}</span>
          </div>
        </div>

        {/* More Options */}
        <button className="p-1.5 text-muted hover:text-subdued rounded-lg hover:bg-subtle transition-all opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post?.title && (
          <h3 className="text-base font-semibold text-text mb-1.5">{post.title}</h3>
        )}
        <p className="text-sm text-subdued leading-relaxed">{post?.content ?? "No content."}</p>
      </div>

      {/* Tags */}
      {post?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary/80 rounded-full border border-primary/15 font-mono">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-divider pt-3 mt-3 flex items-center gap-1">
        {/* Like */}
        <ActionButton
          icon={<Heart className={`w-4 h-4 transition-all ${liked ? "fill-rose-500 text-rose-500 scale-110" : ""}`} />}
          label={likeCount}
          onClick={handleLike}
          active={liked}
          activeColor="text-rose-400 bg-rose-500/10"
        />

        {/* Comment */}
        <ActionButton
          icon={<MessageCircle className="w-4 h-4" />}
          label={post?.comments_count ?? 0}
        />

        {/* Share */}
        <ActionButton
          icon={<Share2 className="w-4 h-4" />}
          label="Share"
        />

        {/* Code tag */}
        {post?.has_code && (
          <div className="ml-auto flex items-center gap-1.5 text-[11px] text-muted font-mono">
            <Code2 className="w-3.5 h-3.5" />
            code
          </div>
        )}
      </div>
    </article>
  );
}

function ActionButton({ icon, label, onClick, active, activeColor }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
        ${active ? activeColor : "text-dim hover:text-subdued hover:bg-subtle"}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
