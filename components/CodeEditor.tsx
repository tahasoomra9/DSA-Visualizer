"use client";

import type { CSSProperties } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeEditorProps = {
  code: string;
  currentLine?: number;
  language?: string;
  title?: string;
};

export function CodeEditor({
  code,
  currentLine = 1,
  language = "java",
  title = "Algorithm Code",
}: Readonly<CodeEditorProps>) {
  const activeLine = Number.isFinite(currentLine) && currentLine > 0
    ? Math.floor(currentLine)
    : 1;

  return (
    <section
      className="mt-10 overflow-hidden rounded-xl border"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <header
        className="border-b px-4 py-3 text-sm font-semibold"
        style={{
          borderColor: "rgba(255, 255, 255, 0.12)",
          color: "rgba(255, 255, 255, 0.92)",
        }}
      >
        {title}
      </header>

      <div className="code-editor-scrollbar max-h-112 overflow-auto p-4">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-mono)",
            },
          }}
          showLineNumbers
          wrapLines
          lineNumberStyle={{
            color: "rgba(255, 255, 255, 0.45)",
            minWidth: "2.25rem",
          }}
          lineProps={(lineNumber: number) => {
            const style: CSSProperties = {
              display: "block",
              width: "100%",
            };

            if (lineNumber === activeLine) {
              style.backgroundColor = "rgba(255, 255, 255, 0.10)";
              style.borderLeft = "3px solid #0ea5e9";
            }

            return { style };
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
