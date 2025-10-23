import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  style,
  theme = "light",
}) => {
  const sizeConfig = {
    sm: { width: "400px", maxWidth: "90vw" },
    md: { width: "600px", maxWidth: "90vw" },
    lg: { width: "800px", maxWidth: "95vw" },
    xl: { width: "1200px", maxWidth: "95vw" },
  };

  const config = sizeConfig[size];

  const themeStyles = {
    light: {
      overlay: "rgba(0, 0, 0, 0.5)",
      background: "#ffffff",
      titleColor: "#111827",
      borderColor: "#e5e7eb",
      closeButtonColor: "#6b7280",
      closeButtonHoverBg: "#f3f4f6",
      closeButtonHoverColor: "#374151",
    },
    dark: {
      overlay: "rgba(0, 0, 0, 0.8)",
      background: "rgba(18, 18, 18, 0.98)",
      titleColor: "#ffffff",
      borderColor: "rgba(255, 255, 255, 0.1)",
      closeButtonColor: "rgba(255, 255, 255, 0.6)",
      closeButtonHoverBg: "rgba(255, 255, 255, 0.1)",
      closeButtonHoverColor: "#ffffff",
    },
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: currentTheme.overlay,
        backdropFilter: theme === "dark" ? "blur(8px)" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        animation: "fadeIn 0.2s ease-out",
        ...style,
      }}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        style={{
          background: currentTheme.background,
          border: theme === "dark" ? `1px solid ${currentTheme.borderColor}` : undefined,
          borderRadius: theme === "dark" ? "20px" : "12px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          width: config.width,
          maxWidth: config.maxWidth,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{
            padding: "20px 24px 16px 24px",
            borderBottom: `1px solid ${currentTheme.borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <h2 style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: "600",
              color: currentTheme.titleColor,
            }}>
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: theme === "dark" ? `1px solid ${currentTheme.borderColor}` : "none",
                  fontSize: "1.5rem",
                  color: currentTheme.closeButtonColor,
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: theme === "dark" ? "8px" : "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = currentTheme.closeButtonHoverBg;
                  e.currentTarget.style.color = currentTheme.closeButtonHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = currentTheme.closeButtonColor;
                }}
                aria-label="모달 닫기"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        <div style={{
          padding: title ? "16px 24px 24px 24px" : "24px",
          overflow: "auto",
          flex: 1,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
