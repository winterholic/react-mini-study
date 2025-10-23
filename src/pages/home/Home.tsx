import React from 'react';
import { logout, getCurrentUser } from '../../utils/auth';

function Home() {
  const containerStyle: React.CSSProperties = { maxWidth: "1200px", margin: "0 auto", padding: "0 16px" };
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#111827", minHeight: "100vh", background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)" }}>
      {/* Top Bar */}
      <div style={{ borderBottom: "1px solid #E5E7EB", background: "#fff" }}>
        <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/VOIDDOT.svg" alt="VOID." width={36} height={36} style={{ borderRadius: 6 }} />
            <span style={{ color: "#111827", fontWeight: 800, fontSize: 22 }}>VOID.</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#6B7280", fontSize: 14 }}>
              {currentUser?.name || currentUser?.username}님
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 600,
                color: "#374151",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#F3F4F6";
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 9999, background: "#EEF2FF", color: "#4338CA", fontWeight: 600, marginBottom: 16 }}>
            <span>🚀</span>
            <span>VOID. 플랫폼</span>
          </div>
          <h1 style={{ fontSize: "3rem", lineHeight: 1.1, margin: "0 0 16px", fontWeight: 800 }}>
            다양한 서비스를 한 곳에서
          </h1>
          <p style={{ fontSize: 18, color: "#6B7280", margin: "0 0 40px", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            쇼핑, 블로그, 컴포넌트까지. 모든 것을 VOID.에서 경험해보세요.
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ ...containerStyle }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <NavigationCard
              title="쇼핑몰"
              description="트렌디한 패션 아이템을 만나보세요"
              icon="🛍️"
              href="/shopping"
              color="#F3F4F6"
              hoverColor="#E5E7EB"
            />
            <NavigationCard
              title="블로그"
              description="다양한 주제의 글을 읽어보세요"
              icon="📝"
              href="/blog"
              color="#F5F3FF"
              hoverColor="#E0E7FF"
            />
            <NavigationCard
              title="컴포넌트"
              description="UI 컴포넌트 라이브러리를 확인하세요"
              icon="🎨"
              href="/component"
              color="#EFF6FF"
              hoverColor="#DBEAFE"
            />
            <NavigationCard
              title="러브헬퍼"
              description="AI 연애 상담 챗봇"
              icon="💕"
              href="/lovehelper"
              color="#FCE7F3"
              hoverColor="#FBCFE8"
            />
            <NavigationCard
              title="밈밈밈"
              description="최신 이슈와 밈을 한눈에"
              icon="😂"
              href="/meme"
              color="#E0E7FF"
              hoverColor="#C7D2FE"
            />
            <NavigationCard
              title="FM네덜란드"
              description="자유로운 커뮤니티"
              icon="🌷"
              href="/netherlands"
              color="#FEF3C7"
              hoverColor="#FDE68A"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

type NavigationCardProps = { title: string; description: string; icon: string; href: string; color: string; hoverColor: string };
function NavigationCard({ title, description, icon, href, color, hoverColor }: NavigationCardProps) {
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: color,
          borderRadius: 16,
          padding: 32,
          textAlign: "center",
          transition: "all 0.2s ease",
          cursor: "pointer",
          border: "1px solid transparent"
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = hoverColor;
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = color;
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
        <h3 style={{ margin: "0 0 8px", fontSize: 24, color: "#111827" }}>{title}</h3>
        <p style={{ margin: 0, color: "#6B7280", fontSize: 16 }}>{description}</p>
      </div>
    </a>
  );
}

export default Home;
