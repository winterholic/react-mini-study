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
  hoverable = false,
  style 
}) => {
  const baseStyles = {
    background: "#ffffff",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  const variantStyles = {
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

  const paddingStyles = {
    sm: { padding: "16px" },
    md: { padding: "24px" },
    lg: { padding: "32px" },
  };

  const hoverStyles = hoverable ? {
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: variant === "elevated" 
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  } : {};

  const cardStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...paddingStyles[padding],
    ...hoverStyles,
    ...style,
  };

  return (
    <div style={cardStyles}>
      {children}
    </div>
  );
};

export default Card;