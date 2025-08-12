import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = "md",
  style,
}) => {
  const sizeConfig = {
    sm: { width: 32, height: 18, thumbSize: 12 },
    md: { width: 44, height: 24, thumbSize: 18 },
    lg: { width: 56, height: 30, thumbSize: 24 },
  };

  const config = sizeConfig[size];
  const toggleId = `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ marginBottom: "12px", ...style }}>
      <label
        htmlFor={toggleId}
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          gap: "12px",
          userSelect: "none",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            id={toggleId}
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            disabled={disabled}
            style={{ display: "none" }}
          />
          <div
            style={{
              width: config.width,
              height: config.height,
              background: checked 
                ? (disabled ? "#9ca3af" : "#10b981") 
                : (disabled ? "#e5e7eb" : "#d1d5db"),
              borderRadius: config.height,
              position: "relative",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "inline-block",
              boxShadow: checked 
                ? "0 0 0 2px rgba(16, 185, 129, 0.2)" 
                : "0 0 0 2px transparent",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: checked 
                  ? config.width - config.thumbSize - 3 
                  : 3,
                top: (config.height - config.thumbSize) / 2,
                width: config.thumbSize,
                height: config.thumbSize,
                background: "#ffffff",
                borderRadius: "50%",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transform: checked ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>
        </div>
        {label && (
          <span style={{
            fontSize: "0.875rem",
            color: "#374151",
            fontWeight: "500",
          }}>
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default ToggleSwitch;