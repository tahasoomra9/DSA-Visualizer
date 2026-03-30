"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  ALGORITHM_DEFINITIONS,
  ALGORITHM_ORDER,
  type AlgorithmKey,
} from "@/lib/algorithms";

type AlgorithmSidebarProps = {
  selectedAlgorithm: AlgorithmKey;
  onSelect: (algorithm: AlgorithmKey) => void;
};

const SIDEBAR_COLLAPSED_KEY = "algorithm-sidebar-collapsed";

export function AlgorithmSidebar({
  selectedAlgorithm,
  onSelect,
}: AlgorithmSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
    setMounted(true);
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
    }
  }, [collapsed, mounted]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`transition-all duration-300 ease-in-out flex-shrink-0 border-r`}
      style={{
        width: collapsed ? "3rem" : "18rem",
        backgroundColor: "var(--background)",
        borderColor: "var(--muted)",
      }}
    >
      {/* Header with toggle button */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{
          borderColor: "var(--muted)",
        }}
      >
        {!collapsed && (
          <h2
            className="text-sm font-semibold truncate"
            style={{ color: "var(--muted-foreground)" }}
          >
            DSA WIZARD
          </h2>
        )}
        <button
          onClick={toggleCollapsed}
          className="p-1 rounded-md transition-colors hover:bg-opacity-10"
          style={{
            color: "var(--muted-foreground)",
          }}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            size={18}
            className={`transition-transform duration-300 ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Algorithm list */}
      <nav className="flex flex-col gap-4 p-2">
        {ALGORITHM_ORDER.map((key) => {
          const algorithm = ALGORITHM_DEFINITIONS[key];
          const isSelected = key === selectedAlgorithm;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                collapsed ? "flex justify-center" : "flex flex-col"
              }`}
              style={{
                backgroundColor: isSelected
                  ? "var(--primary)"
                  : "transparent",
                color: isSelected
                  ? "var(--primary-foreground)"
                  : "var(--foreground)",
                border: `1px solid ${
                  isSelected ? "var(--primary)" : "var(--muted)"
                }`,
              }}
              title={collapsed ? algorithm.label : undefined}
            >
              {collapsed ? (
                <span className="text-xs font-bold">
                  {algorithm.label
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
              ) : (
                <>
                  <span className="font-semibold text-sm">
                    {algorithm.label}
                  </span>
                  <span
                    className="text-xs leading-snug truncate"
                    style={{
                      color: isSelected
                        ? "var(--primary-foreground)"
                        : "var(--muted-foreground)",
                    }}
                  >
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
