import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  padding = "md",
  hoverable = false, // This prop is noted as unused for now to prevent errors
  style
}) => {
  const baseStyles: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    elevated: {
      border: "none",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    outlined: {
      border: "2px solid #e5e7eb",
      boxShadow: "none",
    },
    filled: {
      border: "none",
      background: "#f9fafb",
      boxShadow: "none",
    },
  };

  const paddingStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "16px" },
    md: { padding: "24px" },
    lg: { padding: "32px" },
  };

  const cardStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...paddingStyles[padding],
    ...style,
  };

  return (
    <div style={cardStyles}>
      {children}
    </div>
  );
};

export default Card;