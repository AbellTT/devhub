import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, LogOut, Settings, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../store/authSlice";

export default function AppNavbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const menuRef = useRef(null);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    import("../../services/api").then(({ default: api }) => {
      api.post("/accounts/logout/", { refresh: user?.refreshToken }).catch(() => {});
    });
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-surface-nav/90 backdrop-blur-xl border-b border-divider">
      <div className="flex items-center h-full px-5 gap-4 max-w-screen-xl mx-auto justify-between">

        {/* Logo */}
        <Link to="/feed" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-lg flex items-center justify-center shadow-primary/30 group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-black text-sm italic">D</span>
          </div>
          <span className="text-base font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
            DevHub
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl mx-4">
          <div className={`relative transition-all duration-200 ${searchFocused ? 'scale-[1.01]' : ''}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search DevHub..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-faint border border-divider rounded-md py-1.5 pl-8 pr-4 text-sm text-text placeholder:text-muted focus:outline-none focus:border-focus-ring focus:bg-subtle transition-all"
            />
          </div>
        </div>

        

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button className="relative p-2 text-dim hover:text-text hover:bg-subtle rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-surface-nav" />
          </button>

          {/* Avatar / Dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-bold ring-2 ring-outline hover:ring-primary/50 transition-all hover:scale-105"
            >
              {initials}
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-surface-overlay border border-divider rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-divider">
                  <p className="text-sm font-semibold text-text truncate">@{user?.username}</p>
                  <p className="text-xs text-dim truncate">{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-1.5">
                  <DropdownItem icon={<User className="w-4 h-4" />} label="Your Profile" />
                  <DropdownItem icon={<Settings className="w-4 h-4" />} label="Settings" />
                </div>

                <div className="border-t border-divider p-1.5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-danger hover:bg-danger-surface text-sm font-medium transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}

function DropdownItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-subdued hover:text-text hover:bg-subtle text-sm font-medium transition-colors text-left">
      {icon}
      {label}
    </button>
  );
}
