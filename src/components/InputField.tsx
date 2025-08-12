import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  style?: React.CSSProperties;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  error, 
  helperText, 
  style, 
  id,
  ...rest 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div style={{ marginBottom: "16px", ...style }}>
      {label && (
        <label 
          htmlFor={inputId}
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
      <input
        id={inputId}
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
      />
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

export default InputField;