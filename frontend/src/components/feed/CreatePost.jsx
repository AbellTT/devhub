import { ImagePlus, Code2, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function CreatePost({ onPost }) {
  const user = useSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "?";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost?.(content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-faint border rounded-xl p-4 transition-all duration-200 ${
        focused ? "border-outline bg-subtle" : "border-divider"
      }`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
          {initials}
        </div>

        {/* Input area */}
        <div className="flex-1 min-w-0">
          <textarea
            rows={focused ? 3 : 1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => { if (!content) setFocused(false); }}
            placeholder="What's on your dev mind?"
            className="w-full bg-transparent text-sm text-text placeholder:text-muted resize-none focus:outline-none leading-relaxed transition-all"
          />

          {/* Actions (reveal on focus) */}
          {focused && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-divider">
              <div className="flex gap-1">
                <ToolButton icon={<ImagePlus className="w-4 h-4" />} title="Add image" />
                <ToolButton icon={<Code2 className="w-4 h-4" />} title="Add code snippet" />
              </div>
              <button
                type="submit"
                disabled={!content.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <Send className="w-3.5 h-3.5" />
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function ToolButton({ icon, title }) {
  return (
    <button
      type="button"
      title={title}
      className="p-2 text-dim hover:text-subdued hover:bg-subtle rounded-lg transition-all"
    >
      {icon}
    </button>
  );
}
