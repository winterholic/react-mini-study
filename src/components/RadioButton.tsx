import React from "react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  style?: React.CSSProperties;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  disabled = false,
  error,
  style,
  id,
  ...rest
}) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div style={{ marginBottom: "12px", ...style }}>
      <label
        htmlFor={radioId}
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          gap: "8px",
          userSelect: "none",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            id={radioId}
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            style={{
              position: "absolute",
              opacity: 0,
              width: "20px",
              height: "20px",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            {...rest}
          />
          <div style={{
            width: "20px",
            height: "20px",
            border: error ? "2px solid #ef4444" : "2px solid #d1d5db",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            ...(checked && { borderColor: "#3b82f6" }),
            ...(error && { borderColor: "#ef4444" }),
          }}>
            {checked && (
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#3b82f6",
              }} />
            )}
          </div>
        </div>
        <span style={{
          fontSize: "0.875rem",
          color: error ? "#ef4444" : "#374151",
          fontWeight: "500",
        }}>
          {label}
        </span>
      </label>
      {error && (
        <p style={{
          marginTop: "4px",
          marginLeft: "28px",
          fontSize: "0.75rem",
          color: "#ef4444",
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioButton;