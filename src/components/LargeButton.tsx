import React from "react";

interface LargeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  style?: React.CSSProperties;
}

const LargeButton: React.FC<LargeButtonProps> = ({ 
  children, 
  variant = "primary", 
  size = "md",
  loading = false,
  disabled,
  style, 
  ...rest 
}) => {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
    borderRadius: "8px",
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
    sm: { padding: "8px 16px", fontSize: "0.875rem" },
    md: { padding: "12px 24px", fontSize: "1rem" },
    lg: { padding: "16px 32px", fontSize: "1.125rem" },
  };

  const variantStyles = {
    primary: {
      background: disabled || loading ? "#9ca3af" : "#3b82f6",
      color: "#ffffff",
      boxShadow: disabled || loading ? "none" : "0 4px 14px 0 rgba(59, 130, 246, 0.25)",
      "&:hover": !disabled && !loading ? {
        background: "#2563eb",
        transform: "translateY(-1px)",
        boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.35)",
      } : {},
    },
    secondary: {
      background: disabled || loading ? "#f3f4f6" : "#f8fafc",
      color: disabled || loading ? "#9ca3af" : "#374151",
      border: "2px solid #e5e7eb",
      "&:hover": !disabled && !loading ? {
        background: "#f1f5f9",
        borderColor: "#cbd5e1",
      } : {},
    },
    outline: {
      background: "transparent",
      color: disabled || loading ? "#9ca3af" : "#3b82f6",
      border: "2px solid #3b82f6",
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
      boxShadow: disabled || loading ? "none" : "0 4px 14px 0 rgba(239, 68, 68, 0.25)",
      "&:hover": !disabled && !loading ? {
        background: "#dc2626",
        transform: "translateY(-1px)",
        boxShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.35)",
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
          width: "16px",
          height: "16px",
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

export default LargeButton;