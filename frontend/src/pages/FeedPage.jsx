import { useSelector } from 'react-redux';
import AppNavbar from '../components/layout/AppNavbar';
import LeftSidebar from '../components/feed/LeftSidebar';
import RightSidebar from '../components/feed/RightSidebar';
import PostCard from '../components/feed/PostCard';
import CreatePost from '../components/feed/CreatePost';
import { useState } from 'react';

// Placeholder posts so the page doesn't look empty
const DEMO_POSTS = [
  {
    id: 1,
    author: "abel85",
    content: "Just shipped a full JWT authentication system with token blacklisting on logout. Clean logout, protected routes, localStorage persistence - the whole thing. Feels good. 🚀",
    tags: ["django", "react", "jwt"],
    likes: 24,
    comments_count: 7,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    badge: "Builder",
  },
  {
    id: 2,
    author: "devhub",
    content: "Welcome to DevHub! A place for developers to share what they're building, learning, and breaking. No noise — just code and ideas. Drop your first post below 👇",
    tags: ["announcement"],
    likes: 142,
    comments_count: 32,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    badge: "Staff",
  },
  {
    id: 3,
    author: "react_enjoyer",
    content: "Hot take: Zustand is better than Redux for 90% of React apps. The boilerplate reduction alone is worth it. Change my mind in the comments.",
    tags: ["react", "state-management", "opinion"],
    likes: 88,
    comments_count: 51,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

const FeedPage = () => {
    const authState = useSelector((state) => state.auth);
    const [posts, setPosts] = useState(DEMO_POSTS);

    const handleNewPost = (content) => {
        const newPost = {
            id: Date.now(),
            author: authState.user?.username ?? "anonymous",
            content,
            tags: [],
            likes: 0,
            comments_count: 0,
            created_at: new Date().toISOString(),
            badge: "Member",
        };
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="min-h-screen bg-surface">
            <AppNavbar />

            {/* 3-Column Layout */}
            <div className="max-w-screen-xl mx-auto pt-14 grid grid-cols-[260px_1fr_280px] gap-0 h-screen">

                {/* Left Sidebar */}
                <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-divider scrollbar-thin">
                    <LeftSidebar />
                </div>

                {/* Main Feed */}
                <main className="min-h-full overflow-y-auto px-6 py-5 space-y-4">
                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-base font-bold text-text">Your Feed</h1>
                        <div className="flex gap-1">
                            <FilterTab label="For You" active />
                            <FilterTab label="Following" />
                            <FilterTab label="Trending" />
                        </div>
                    </div>

                    {/* Create Post Box */}
                    <CreatePost onPost={handleNewPost} />

                    {/* Post Cards */}
                    <div className="space-y-3">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-divider scrollbar-thin">
                    <RightSidebar />
                </div>

            </div>
        </div>
    );
};

export default FeedPage;

function FilterTab({ label, active }) {
    return (
        <button
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                active
                    ? "bg-primary/15 text-primary border border-primary/25"
                    : "text-dim hover:text-subdued hover:bg-subtle"
            }`}
        >
            {label}
        </button>
    );
}