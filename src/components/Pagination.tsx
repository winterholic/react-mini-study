import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  showFirstLast?: boolean;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  showFirstLast = true,
  size = "md",
  style,
}) => {
  if (totalPages <= 1) return null;

  const sizeConfig = {
    sm: { padding: "6px 10px", fontSize: "0.875rem" },
    md: { padding: "8px 12px", fontSize: "0.875rem" },
    lg: { padding: "12px 16px", fontSize: "1rem" },
  };

  const config = sizeConfig[size];

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const renderPageButton = (page: number | string, isCurrent = false, isDisabled = false) => {
    if (page === "...") {
      return (
        <span style={{
          padding: config.padding,
          fontSize: config.fontSize,
          color: "#6b7280",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          ...
        </span>
      );
    }

    return (
      <button
        key={page}
        onClick={() => typeof page === "number" && onPageChange(page)}
        disabled={isDisabled}
        style={{
          padding: config.padding,
          fontSize: config.fontSize,
          fontWeight: isCurrent ? "600" : "500",
          background: isCurrent ? "#3b82f6" : "#ffffff",
          color: isCurrent ? "#ffffff" : "#374151",
          border: isCurrent ? "1px solid #3b82f6" : "1px solid #e5e7eb",
          borderRadius: "6px",
          cursor: isDisabled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          minWidth: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(isCurrent && {
            boxShadow: "0 1px 3px 0 rgba(59, 130, 246, 0.3)",
          }),
        }}
        onMouseEnter={(e) => {
          if (!isCurrent && !isDisabled) {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.borderColor = "#d1d5db";
          }
        }}
        onMouseLeave={(e) => {
          if (!isCurrent && !isDisabled) {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }
        }}
      >
        {page}
      </button>
    );
  };

  const renderNavigationButton = (direction: "prev" | "next" | "first" | "last", disabled: boolean) => {
    const icons = {
      first: "«",
      prev: "‹",
      next: "›",
      last: "»",
    };

    return (
      <button
        onClick={() => {
          if (direction === "first") onPageChange(1);
          else if (direction === "prev") onPageChange(currentPage - 1);
          else if (direction === "next") onPageChange(currentPage + 1);
          else if (direction === "last") onPageChange(totalPages);
        }}
        disabled={disabled}
        style={{
          padding: config.padding,
          fontSize: config.fontSize,
          background: "#ffffff",
          color: disabled ? "#9ca3af" : "#374151",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          minWidth: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.borderColor = "#d1d5db";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }
        }}
        aria-label={`${direction === "first" ? "첫" : direction === "prev" ? "이전" : direction === "next" ? "다음" : "마지막"} 페이지로 이동`}
      >
        {icons[direction]}
      </button>
    );
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        ...style,
      }}
      role="navigation"
      aria-label="페이지 네비게이션"
    >
      {showFirstLast && renderNavigationButton("first", currentPage === 1)}
      {renderNavigationButton("prev", currentPage === 1)}
      
      {showPageNumbers && getVisiblePages().map((page, index) => 
        renderPageButton(page, page === currentPage, false)
      )}
      
      {renderNavigationButton("next", currentPage === totalPages)}
      {showFirstLast && renderNavigationButton("last", currentPage === totalPages)}
    </nav>
  );
};

export default Pagination;