import { TrendingUp, Hash, Users, ArrowRight } from "lucide-react";

const TRENDING_TOPICS = [
  { tag: "react", posts: "2.3k posts" },
  { tag: "python", posts: "1.8k posts" },
  { tag: "typescript", posts: "1.5k posts" },
  { tag: "devops", posts: "987 posts" },
  { tag: "ai-ml", posts: "3.1k posts" },
];

const SUGGESTED_USERS = [
  { username: "torvalds", role: "Linux Kernel Dev" },
  { username: "gvanrossum", role: "Python Creator" },
  { username: "yehudakatz", role: "Ember.js Author" },
];

export default function RightSidebar() {
  return (
    <aside className="flex flex-col gap-4 p-4">

      {/* Trending Topics */}
      <div className="bg-faint border border-divider rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-divider">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-text">Trending</h3>
        </div>
        <div className="divide-y divide-divider">
          {TRENDING_TOPICS.map((item, i) => (
            <button
              key={item.tag}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-subtle transition-colors text-left group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-muted font-mono w-4">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium text-text group-hover:text-text transition-colors font-mono">
                    #{item.tag}
                  </p>
                  <p className="text-[11px] text-muted">{item.posts}</p>
                </div>
              </div>
              <Hash className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="bg-faint border border-divider rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-divider">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-text">Who to follow</h3>
        </div>
        <div className="divide-y divide-divider">
          {SUGGESTED_USERS.map((u) => (
            <div key={u.username} className="flex items-center justify-between px-4 py-3 hover:bg-subtle transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent/60 to-primary/60 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {u.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-text">@{u.username}</p>
                  <p className="text-[10px] text-dim">{u.role}</p>
                </div>
              </div>
              <button className="text-[11px] font-semibold text-primary/80 hover:text-primary border border-primary/25 hover:border-primary/50 px-2.5 py-1 rounded-full transition-all hover:bg-primary/10">
                Follow
              </button>
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-divider">
          <button className="flex items-center gap-1.5 text-[11px] text-primary hover:text-primary transition-colors font-medium">
            Show more <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-muted px-2 leading-relaxed">
        DevHub · Built for developers, by developers.
      </p>
    </aside>
  );
}
