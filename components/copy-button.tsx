"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasCopied(false)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("relative z-10 h-6 w-6  hover:bg-zinc-700", className)}
      onClick={() => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
    </Button>
  )
}
