import React from "react";

interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "xs" | "sm" | "md";
  loading?: boolean;
  style?: React.CSSProperties;
}

const SmallButton: React.FC<SmallButtonProps> = ({ 
  children, 
  variant = "primary", 
  size = "sm",
  loading = false,
  disabled,
  style, 
  ...rest 
}) => {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontWeight: "500",
    borderRadius: "6px",
    border: "none",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    fontFamily: "inherit",
    outline: "none",
    position: "relative",
    overflow: "hidden",
  };

  const sizeStyles = {
    xs: { padding: "4px 8px", fontSize: "0.75rem" },
    sm: { padding: "6px 12px", fontSize: "0.875rem" },
    md: { padding: "8px 16px", fontSize: "1rem" },
  };

  const variantStyles = {
    primary: {
      background: disabled || loading ? "#9ca3af" : "#3b82f6",
      color: "#ffffff",
      boxShadow: disabled || loading ? "none" : "0 2px 8px 0 rgba(59, 130, 246, 0.25)",
      "&:hover": !disabled && !loading ? {
        background: "#2563eb",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px 0 rgba(59, 130, 246, 0.35)",
      } : {},
    },
    secondary: {
      background: disabled || loading ? "#f3f4f6" : "#f8fafc",
      color: disabled || loading ? "#9ca3af" : "#374151",
      border: "1px solid #e5e7eb",
      "&:hover": !disabled && !loading ? {
        background: "#f1f5f9",
        borderColor: "#cbd5e1",
      } : {},
    },
    outline: {
      background: "transparent",
      color: disabled || loading ? "#9ca3af" : "#3b82f6",
      border: "1px solid #3b82f6",
      "&:hover": !disabled && !loading ? {
        background: "#3b82f6",
        color: "#ffffff",
      } : {},
    },
    ghost: {
      background: "transparent",
      color: disabled || loading ? "#9ca3af" : "#6b7280",
      "&:hover": !disabled && !loading ? {
        background: "#f3f4f6",
        color: "#374151",
      } : {},
    },
    danger: {
      background: disabled || loading ? "#fca5a5" : "#ef4444",
      color: "#ffffff",
      boxShadow: disabled || loading ? "none" : "0 2px 8px 0 rgba(239, 68, 68, 0.25)",
      "&:hover": !disabled && !loading ? {
        background: "#dc2626",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px 0 rgba(239, 68, 68, 0.35)",
      } : {},
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button
      style={buttonStyles}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <div style={{
          width: "12px",
          height: "12px",
          border: "2px solid transparent",
          borderTop: "2px solid currentColor",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }} />
      )}
      {children}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
};

export default SmallButton;