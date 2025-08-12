import React from "react";

interface MessageProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
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

const Message: React.FC<MessageProps> = ({
  type = "info",
  title,
  children,
  icon,
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
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        ...style,
      }}
      role="status"
      aria-live="polite"
    >
      <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>
        {icon || config.icon}
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
    </div>
  );
};

export default Message;