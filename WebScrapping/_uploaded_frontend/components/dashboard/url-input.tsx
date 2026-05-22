"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, ArrowRight, Loader2 } from "lucide-react"

interface URLInputProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
}

export function URLInput({ onSubmit, isLoading = false }: URLInputProps) {
  const [url, setUrl] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Glow effect container */}
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 40px rgba(0, 255, 255, 0.15), 0 0 80px rgba(0, 255, 255, 0.05)"
            : "0 0 0px rgba(0, 255, 255, 0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-2xl"
      >
        <form onSubmit={handleSubmit} className="relative">
          {/* Input container */}
          <div
            className={`relative flex items-center overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-xl transition-all duration-400 ${
              isFocused
                ? "border-cyan-500/60 bg-white/[0.04]"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            {/* Icon */}
            <div className="flex items-center justify-center pl-6">
              <Globe
                className={`h-5 w-5 transition-colors duration-300 ${
                  isFocused ? "text-cyan-400" : "text-white/40"
                }`}
                strokeWidth={1.5}
              />
            </div>

            {/* Input */}
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter target URL to scrape..."
              className="flex-1 bg-transparent px-4 py-5 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
            />

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={!url.trim() || isLoading}
              whileTap={{ scale: 0.98 }}
              className="mr-3 flex items-center gap-2 rounded-xl bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Extract</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </>
              )}
            </motion.button>
          </div>

          {/* Animated border gradient */}
          <motion.div
            animate={{
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </form>
      </motion.div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-center text-xs text-white/30"
      >
        Supports HTTP/HTTPS protocols • JavaScript rendering enabled
      </motion.p>
    </motion.div>
  )
}
