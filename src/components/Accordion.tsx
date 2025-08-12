import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean;
  defaultOpen?: number[];
  style?: React.CSSProperties;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  disabled = false,
  style,
}) => {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        marginBottom: "8px",
        overflow: "hidden",
        ...style,
      }}
    >
      <button
        onClick={onToggle}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "16px 20px",
          background: "#ffffff",
          border: "none",
          textAlign: "left",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s ease",
          ...(disabled && { opacity: 0.6 }),
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = "#f9fafb";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = "#ffffff";
          }
        }}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <span style={{
          fontSize: "1rem",
          fontWeight: "500",
          color: "#111827",
        }}>
          {title}
        </span>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          transition: "transform 0.2s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      
      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div style={{
          padding: "0 20px 20px 20px",
          borderTop: "1px solid #f3f4f6",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  defaultOpen = [],
  style,
}) => {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpen);

  const handleToggle = (index: number) => {
    if (multiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const childrenArray = React.Children.toArray(children);
  
  return (
    <div style={{ width: "100%", ...style }}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          return React.cloneElement(child, {
            key: index,
            isOpen: openItems.includes(index),
            onToggle: () => handleToggle(index),
          });
        }
        return child;
      })}
    </div>
  );
};

export default Accordion;
