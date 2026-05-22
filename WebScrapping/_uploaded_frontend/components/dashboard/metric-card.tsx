"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: number
  suffix?: string
  icon: LucideIcon
  delay?: number
}

export function MetricCard({ title, value, suffix = "", icon: Icon, delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const startDelay = delay * 1000

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(interval)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.04]"
    >
      {/* Subtle glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/50">
            {title}
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-mono text-4xl font-light tracking-tight text-white">
              {displayValue.toLocaleString()}
            </span>
            {suffix && (
              <span className="text-lg font-light text-white/40">{suffix}</span>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
          <Icon className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent"
      />
    </motion.div>
  )
}
