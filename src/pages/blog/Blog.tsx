import { useState, useRef } from 'react';
import postsData from '../../data/posts.json';

function Blog() {
  const containerStyle: React.CSSProperties = { maxWidth: "1200px", margin: "0 auto", padding: "0 16px" };

  const blogPosts = postsData;

  const iconWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const iconButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "#6B7280",
  };

  const Icon = ({ children }: { children: React.ReactNode }) => (
    <button style={iconButtonStyle}>
      {children}
    </button>
  );

  const BlogIcons = () => (
    <div style={iconWrapperStyle}>
      <Icon>
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Icon>
      <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={22} height={22}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      </Icon>
      <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={22} height={22}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.543L7.5 20.25M12 12v9.75m-4.5-9.75L3.75 20.25M20.25 7.5L16.5 3.75M12 12V3.75m4.5 8.25L20.25 3.75" />
        </svg>
      </Icon>
    </div>
  );

  const [selectedTag, setSelectedTag] = useState<string>("HOME");

  const allTags = ["HOME", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filteredPosts = selectedTag === "HOME"
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedTag);

  const TabBar = ({ tags, selectedTag, onSelectTag }: { tags: string[], selectedTag: string, onSelectTag: (tag: string) => void }) => {
    const tabContainerRef = useRef<HTMLDivElement>(null);

    const tabContainerStyle: React.CSSProperties = {
      position: "sticky",
      top: 0,
      background: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(8px)",
      zIndex: 10,
      borderBottom: "1px solid #e5e7eb",
    };

    const tabListStyle: React.CSSProperties = {
      display: "flex",
      gap: "8px",
      padding: "12px 24px",
      overflowX: "auto",
      // Hide scrollbar
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none",  // IE and Edge
    };

    const tabButtonStyle: React.CSSProperties = {
      padding: "8px 16px",
      borderRadius: "8px",
      background: "transparent",
      border: "none",
      color: "#6B7280",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap",
    };

    const selectedTabButtonStyle: React.CSSProperties = {
      ...tabButtonStyle,
      background: "#111827",
      color: "#ffffff",
    };

    return (
      <div style={tabContainerStyle} ref={tabContainerRef}>
        <div style={{...containerStyle, padding: 0}}>
          <div style={tabListStyle}>
            {tags.map((tag) => (
              <button
                key={tag}
                style={selectedTag === tag ? selectedTabButtonStyle : tabButtonStyle}
                onClick={() => onSelectTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const floatingButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "32px",
    right: "32px",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 1000,
  };

  const handleWriteClick = () => {
    window.location.href = '/blog/write';
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#111827", minHeight: "100vh", background: "#fff", scrollbarGutter: "stable" }}>
      {/* Top Bar */}
      <div style={{ borderBottom: "1px solid #E5E7EB", background: "#fff" }}>
        <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/VOIDDOT.svg" alt="VOID." width={36} height={36} style={{ borderRadius: 6 }} />
            <span style={{ color: "#111827", fontWeight: 800, fontSize: 22 }}>VOID.</span>
          </a>
          <BlogIcons />
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", padding: "60px 24px" }}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", margin: "0 0 16px", fontWeight: 800 }}>VOID. 블로그</h1>
          <p style={{ fontSize: 18, margin: 0, opacity: 0.9 }}>패션, 라이프스타일, 트렌드에 대한 이야기</p>
        </div>
      </section>

      <TabBar tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />

      {/* Blog Posts */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ ...containerStyle }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Write Button */}
      <button
        style={floatingButtonStyle}
        onClick={handleWriteClick}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1) rotate(90deg)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) rotate(0deg)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
        }}
        aria-label="글쓰기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          width={28}
          height={28}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </div>
  );
}

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
};

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #E5E7EB",
      transition: "all 0.2s ease",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
    }}
    >
      <div style={{ height: 200, background: post.image }} />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ background: "#EEF2FF", color: "#4338CA", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{post.category}</span>
          <span style={{ color: "#6B7280", fontSize: 12 }}>{post.readTime}</span>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#111827", fontWeight: 700 }}>{post.title}</h3>
        <p style={{ margin: "0 0 16px", color: "#6B7280", fontSize: 14, lineHeight: 1.5 }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#6B7280", fontSize: 12 }}>{post.author}</span>
          <span style={{ color: "#6B7280", fontSize: 12 }}>{post.date}</span>
        </div>
      </div>
    </div>
  );
}

export default Blog;