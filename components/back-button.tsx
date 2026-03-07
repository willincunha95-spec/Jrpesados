"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface BackButtonProps {
  className?: string
}

export function BackButton({ className }: BackButtonProps) {
  return (
    <Link href="/">
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-border hover:bg-secondary w-fit mb-6 ${className}`}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar Home</span>
      </Button>
    </Link>
  )
}
