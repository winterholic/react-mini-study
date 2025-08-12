import React from "react";

interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
  style?: React.CSSProperties;
}

const typeConfig = {
  info: {
    background: "#eff6ff",
    color: "#1e40af",
    border: "#bfdbfe",
    icon: "ℹ️",
  },
  success: {
    background: "#f0fdf4",
    color: "#166534",
    border: "#bbf7d0",
    icon: "✅",
  },
  warning: {
    background: "#fffbeb",
    color: "#92400e",
    border: "#fcd34d",
    icon: "⚠️",
  },
  error: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "#fca5a5",
    icon: "❌",
  },
};

const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  children,
  onClose,
  closable = true,
  style,
}) => {
  const config = typeConfig[type];

  return (
    <div
      style={{
        background: config.background,
        color: config.color,
        border: `1px solid ${config.border}`,
        borderRadius: "8px",
        padding: "16px",
        margin: "12px 0",
        fontSize: "0.875rem",
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        ...style,
      }}
      role="alert"
      aria-live="polite"
    >
      <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>
        {config.icon}
      </span>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <h4 style={{
            margin: "0 0 4px 0",
            fontSize: "1rem",
            fontWeight: "600",
            lineHeight: "1.4",
          }}>
            {title}
          </h4>
        )}
        <div style={{
          lineHeight: "1.5",
          ...(title && { fontSize: "0.875rem" }),
        }}>
          {children}
        </div>
      </div>

      {closable && onClose && (
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: config.color,
            fontSize: "1.25rem",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            flexShrink: 0,
            width: "24px",
            height: "24px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
          aria-label="알림 닫기"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;