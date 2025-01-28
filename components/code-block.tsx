import React from "react"
import { CopyButton } from "./copy-button"

interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="text-xs relative bg-zinc-950 text-violet-400 rounded-md p-4 border">
      <CopyButton value={code} className="absolute right-2 top-2" />
      <pre className=" overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
