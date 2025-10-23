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
        borderRadius: "12px",
        marginBottom: "16px",
        overflow: "hidden",
        boxShadow: isOpen ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
        transition: "box-shadow 0.3s ease",
        ...style,
      }}
    >
      <button
        onClick={onToggle}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "20px",
          background: isOpen ? "#f9fafb" : "#ffffff",
          border: "none",
          textAlign: "left",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.2s ease",
          ...(disabled && { opacity: 0.6 }),
        }}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <span style={{
          fontSize: "1rem",
          fontWeight: "600",
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
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1V15M1 8H15"
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
          transition: "max-height 0.3s ease-in-out",
          background: "#f9fafb",
        }}
      >
        <div style={{
          padding: "0 20px 20px 20px",
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