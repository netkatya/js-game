"use client";

import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MonacoEditor({ value, onChange }: MonacoEditorProps) {
  return (
    <Editor
      height="280px"
      language="javascript"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        lineNumbers: "on",
        wordWrap: "on",
        cursorBlinking: "smooth",
        readOnly: false,
        folding: false,
        glyphMargin: false,
        renderValidationDecorations: "off",
      }}
    />
  );
}
