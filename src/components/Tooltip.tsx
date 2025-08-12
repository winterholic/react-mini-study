import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 300,
  maxWidth = 200,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let x = 0;
    let y = 0;

    switch (position) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollX;
        y = triggerRect.top - tooltipRect.height - 8 + scrollY;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollX;
        y = triggerRect.bottom + 8 + scrollY;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - 8 + scrollX;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollY;
        break;
      case "right":
        x = triggerRect.right + 8 + scrollX;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollY;
        break;
    }

    // 화면 경계 체크
    if (x < 0) x = 8;
    if (x + tooltipRect.width > window.innerWidth) {
      x = window.innerWidth - tooltipRect.width - 8;
    }
    if (y < 0) y = 8;
    if (y + tooltipRect.height > window.innerHeight) {
      y = window.innerHeight - tooltipRect.height - 8;
    }

    setTooltipPosition({ x, y });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowPosition = () => {
    switch (position) {
      case "top":
        return { bottom: "-4px", left: "50%", transform: "translateX(-50%)" };
      case "bottom":
        return { top: "-4px", left: "50%", transform: "translateX(-50%)" };
      case "left":
        return { right: "-4px", top: "50%", transform: "translateY(-50%)" };
      case "right":
        return { left: "-4px", top: "50%", transform: "translateY(-50%)" };
      default:
        return {};
    }
  };

  const getArrowBorder = () => {
    switch (position) {
      case "top":
        return "border-top: 4px solid #1f2937; border-left: 4px solid transparent; border-right: 4px solid transparent;";
      case "bottom":
        return "border-bottom: 4px solid #1f2937; border-left: 4px solid transparent; border-right: 4px solid transparent;";
      case "left":
        return "border-left: 4px solid #1f2937; border-top: 4px solid transparent; border-bottom: 4px solid transparent;";
      case "right":
        return "border-right: 4px solid #1f2937; border-top: 4px solid transparent; border-bottom: 4px solid transparent;";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            background: "#1f2937",
            color: "#ffffff",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.875rem",
            lineHeight: "1.4",
            maxWidth: maxWidth,
            zIndex: 1000,
            pointerEvents: "none",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            ...style,
          }}
          role="tooltip"
        >
          {content}
          <div
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              ...getArrowPosition(),
            }}
          >
            <style>
              {`
                &::after {
                  content: '';
                  position: absolute;
                  ${getArrowBorder()}
                }
              `}
            </style>
          </div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
