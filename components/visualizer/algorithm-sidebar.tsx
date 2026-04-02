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
}: Readonly<AlgorithmSidebarProps>) {
  const [collapsed, setCollapsed] = useState(() => {
    if (globalThis.window === undefined) {
      return false;
    }

    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  });

  // Save collapsed state to localStorage
  useEffect(() => {
    if (globalThis.window !== undefined) {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
    }
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className="relative h-screen shrink-0 overflow-y-auto border-r transition-all duration-300 ease-out"
      style={{
        width: collapsed ? "3.5rem" : "min(18rem, 82vw)",
        backgroundColor: "var(--background)",
        borderColor: "var(--muted)",
      }}
    >
      <div
        className="sticky top-0 z-10 border-b px-3 py-3 backdrop-blur"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--muted)",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          {!collapsed && (
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold tracking-wide"
                style={{ borderColor: "var(--border)", color: "var(--primary)" }}
              >
                DS
              </span>
              <div className="min-w-0">
                <h2
                  className="truncate text-sm font-semibold leading-none"
                  style={{ color: "var(--foreground)" }}
                >
                  DSA Wizard
                </h2>
                <p
                  className="mt-1 text-[11px] leading-none"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Algorithm Visualizer
                </p>
              </div>
            </div>
          )}

          {collapsed && (
            <span
              className="mx-auto inline-flex h-7 w-7 items-center justify-center rounded-lg border text-[11px] font-bold tracking-wide"
              style={{ borderColor: "var(--border)", color: "var(--primary)" }}
              aria-hidden="true"
            >
              DS
            </span>
          )}

          <button
            onClick={toggleCollapsed}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted/40"
            style={{
              color: "var(--muted-foreground)",
              borderColor: "var(--border)",
            }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${
                collapsed ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      <nav className="flex flex-col px-2.5 py-3">
        {!collapsed && (
          <p
            className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            Algorithms
          </p>
        )}

        <div className="flex flex-col gap-1.5">
        {ALGORITHM_ORDER.map((key) => {
          const algorithm = ALGORITHM_DEFINITIONS[key];
          const isSelected = key === selectedAlgorithm;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`group relative w-full rounded-lg border px-3 py-2.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ${
                isSelected ? "hover:opacity-95" : "hover:bg-muted/40"
              } ${
                collapsed ? "flex justify-center" : "flex flex-col items-start gap-1"
              }`}
              style={{
                backgroundColor: isSelected
                  ? "var(--primary)"
                  : "var(--background)",
                color: isSelected
                  ? "var(--primary-foreground)"
                  : "var(--foreground)",
                borderColor: isSelected ? "var(--primary)" : "var(--border)",
                boxShadow: isSelected ? "0 0 0 1px var(--primary)" : "none",
              }}
              title={collapsed ? algorithm.label : undefined}
            >
              {collapsed ? (
                <span className="text-xs font-semibold tracking-wide">
                  {algorithm.label
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
              ) : (
                <>
                  <span className="text-sm font-semibold leading-snug wrap-break-word">
                    {algorithm.label}
                  </span>
                  <span
                    className="text-xs leading-snug whitespace-normal wrap-break-word"
                    style={{
                      color: isSelected
                        ? "var(--primary-foreground)"
                        : "var(--muted-foreground)",
                    }}
                  >
                    {algorithm.description}
                  </span>
                </>
              )}
            </button>
          );
        })}
        </div>
      </nav>
    </aside>
  );
}
