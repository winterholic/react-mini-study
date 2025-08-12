import React from "react";

interface ProgressProps {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  striped?: boolean;
  style?: React.CSSProperties;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  animated = false,
  striped = false,
  style,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantConfig = {
    default: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",
  };

  const sizeConfig = {
    sm: { height: "8px", fontSize: "0.75rem" },
    md: { height: "12px", fontSize: "0.875rem" },
    lg: { height: "16px", fontSize: "1rem" },
  };

  const config = variantConfig[variant];
  const sizeStyle = sizeConfig[size];

  return (
    <div style={{ width: "100%", ...style }}>
      {showLabel && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}>
          <span style={{
            fontSize: sizeStyle.fontSize,
            color: "#374151",
            fontWeight: "500",
          }}>
            진행률
          </span>
          <span style={{
            fontSize: sizeStyle.fontSize,
            color: "#6b7280",
          }}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div style={{
        width: "100%",
        height: sizeStyle.height,
        background: "#f3f4f6",
        borderRadius: sizeStyle.height / 2,
        overflow: "hidden",
        position: "relative",
      }}>
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            background: config,
            borderRadius: sizeStyle.height / 2,
            transition: animated ? "width 0.6s ease" : "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {striped && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.15) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0.15))",
                backgroundSize: "20px 20px",
                animation: animated ? "progress-stripes 1s linear infinite" : "none",
              }}
            />
          )}
        </div>
      </div>

      {striped && animated && (
        <style>
          {`
            @keyframes progress-stripes {
              0% { background-position: 0 0; }
              100% { background-position: 20px 0; }
            }
          `}
        </style>
      )}
    </div>
  );
};

export default Progress;
