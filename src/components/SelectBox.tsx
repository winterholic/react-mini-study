import React from "react";

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
  helperText?: string;
  style?: React.CSSProperties;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  label,
  error,
  helperText,
  style,
  id,
  ...rest
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div style={{ marginBottom: "16px", ...style }}>
      {label && (
        <label 
          htmlFor={selectId}
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={selectId}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: error ? "2px solid #ef4444" : "2px solid #e5e7eb",
            background: "#ffffff",
            color: "#111827",
            outline: "none",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            appearance: "none",
            cursor: "pointer",
            ...(error && { borderColor: "#ef4444" }),
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? "#ef4444" : "#3b82f6";
            e.target.style.boxShadow = error 
              ? "0 0 0 3px rgba(239, 68, 68, 0.1)" 
              : "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "#ef4444" : "#e5e7eb";
            e.target.style.boxShadow = "none";
          }}
          {...rest}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          width: "0",
          height: "0",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #6b7280",
        }} />
      </div>
      {error && (
        <p style={{
          marginTop: "4px",
          fontSize: "0.75rem",
          color: "#ef4444",
        }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p style={{
          marginTop: "4px",
          fontSize: "0.75rem",
          color: "#6b7280",
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default SelectBox;