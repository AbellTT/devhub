import { Home, Compass, Bookmark, Users, Star, TrendingUp, Settings } from "lucide-react";
import { useSelector } from "react-redux";

export default function LeftSidebar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <aside className="flex flex-col h-full p-4 gap-6">

      {/* User Profile Card */}
      <div className="bg-faint border border-divider rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.username?.slice(0, 2).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-text truncate">
              @{user?.username ?? "anonymous"}
            </p>
            <p className="text-xs text-dim truncate">{user?.email ?? ""}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat value="0" label="Posts" />
          <Stat value="0" label="Following" />
          <Stat value="0" label="Followers" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5">
        <p className="text-[10px] text-muted font-semibold uppercase tracking-widest px-3 mb-1">Menu</p>
        <NavItem icon={<Home className="w-4 h-4" />} label="Feed" active />
        <NavItem icon={<Compass className="w-4 h-4" />} label="Explore" />
        <NavItem icon={<Users className="w-4 h-4" />} label="Community" />
        <NavItem icon={<Bookmark className="w-4 h-4" />} label="Saved" />
        <NavItem icon={<Star className="w-4 h-4" />} label="Showcase" />
        <NavItem icon={<TrendingUp className="w-4 h-4" />} label="Trending" />
      </nav>

      <div className="mt-auto">
        <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
      </div>

    </aside>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-bold text-text">{value}</span>
      <span className="text-[10px] text-dim">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group
        ${active
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-dim hover:text-text hover:bg-subtle"
        }`}
    >
      <span className={`flex-shrink-0 transition-colors ${active ? "text-primary" : "group-hover:text-text"}`}>
        {icon}
      </span>
      {label}
    </a>
  );
}
