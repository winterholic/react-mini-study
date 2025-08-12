import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  variant?: "spinner" | "dots" | "pulse" | "bars";
  style?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({
  size = 32,
  color = "#3b82f6",
  variant = "spinner",
  style,
}) => {
  const renderSpinner = () => (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeDasharray={Math.PI * (size - 8)}
        strokeDashoffset={Math.PI * (size - 8) * 0.25}
        style={{
          transformOrigin: "50% 50%",
          animation: "loader-spin 1s linear infinite",
        }}
      />
    </svg>
  );

  const renderDots = () => (
    <div style={{ display: "flex", gap: "4px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: size / 4,
            height: size / 4,
            borderRadius: "50%",
            background: color,
            animation: `loader-dots 1.4s ease-in-out infinite both`,
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        animation: "loader-pulse 1.2s ease-in-out infinite",
      }}
    />
  );

  const renderBars = () => (
    <div style={{ display: "flex", gap: "2px", alignItems: "flex-end" }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: size / 8,
            height: size * (0.3 + (i * 0.2)),
            background: color,
            borderRadius: "2px",
            animation: `loader-bars 1.2s ease-in-out infinite both`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "bars":
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  return (
    <div
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      {renderLoader()}
      <style>
        {`
          @keyframes loader-spin {
            100% { transform: rotate(360deg); }
          }
          
          @keyframes loader-dots {
            0%, 80%, 100% { 
              transform: scale(0);
              opacity: 0.5;
            }
            40% { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes loader-pulse {
            0%, 100% { 
              transform: scale(0.8);
              opacity: 0.5;
            }
            50% { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes loader-bars {
            0%, 40%, 100% { 
              transform: scaleY(0.4);
            }
            20% { 
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;