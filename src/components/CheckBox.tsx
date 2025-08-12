import React from "react";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  style?: React.CSSProperties;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  style,
  id,
  ...rest
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div style={{ marginBottom: "12px", ...style }}>
      <label
        htmlFor={checkboxId}
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
            id={checkboxId}
            type="checkbox"
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
            borderRadius: "4px",
            background: checked ? "#3b82f6" : "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            ...(checked && { borderColor: "#3b82f6" }),
            ...(error && { borderColor: "#ef4444" }),
          }}>
            {checked && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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

export default CheckBox;