import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  dot?: boolean;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  rounded = false,
  dot = false,
  style,
}) => {
  const variantConfig = {
    default: {
      background: "#f3f4f6",
      color: "#374151",
      border: "#e5e7eb",
    },
    primary: {
      background: "#eff6ff",
      color: "#1e40af",
      border: "#bfdbfe",
    },
    success: {
      background: "#f0fdf4",
      color: "#166534",
      border: "#bbf7d0",
    },
    warning: {
      background: "#fffbeb",
      color: "#92400e",
      border: "#fcd34d",
    },
    error: {
      background: "#fef2f2",
      color: "#991b1b",
      border: "#fca5a5",
    },
    info: {
      background: "#f0f9ff",
      color: "#0c4a6e",
      border: "#7dd3fc",
    },
  };

  const sizeConfig = {
    sm: {
      padding: "2px 6px",
      fontSize: "0.75rem",
      dotSize: "4px",
    },
    md: {
      padding: "4px 8px",
      fontSize: "0.875rem",
      dotSize: "6px",
    },
    lg: {
      padding: "6px 12px",
      fontSize: "1rem",
      dotSize: "8px",
    },
  };

  const config = variantConfig[variant];
  const sizeStyle = sizeConfig[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: config.background,
        color: config.color,
        border: `1px solid ${config.border}`,
        borderRadius: rounded ? "9999px" : "6px",
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        fontWeight: "500",
        lineHeight: "1",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {dot && (
        <div
          style={{
            width: sizeStyle.dotSize,
            height: sizeStyle.dotSize,
            borderRadius: "50%",
            background: config.color,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
