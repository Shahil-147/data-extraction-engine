"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Terminal, ChevronRight } from "lucide-react"

export interface LogEntry {
  id: string
  timestamp: Date
  message: string
  type: "info" | "success" | "warning" | "error"
}

interface ActivityLogProps {
  logs: LogEntry[]
}

const typeColors = {
  info: "text-white/60",
  success: "text-emerald-400",
  warning: "text-amber-400",
  error: "text-red-400",
}

const typePrefixes = {
  info: "[INFO]",
  success: "[OK]",
  warning: "[WARN]",
  error: "[ERR]",
}

export function ActivityLog({ logs }: ActivityLogProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <Terminal className="h-4 w-4 text-cyan-400" strokeWidth={1.5} />
        <h3 className="text-sm font-medium uppercase tracking-widest text-white/70">
          Activity Log
        </h3>
      </div>

      {/* Log entries */}
      <div className="h-[200px] overflow-y-auto p-4 font-mono text-xs">
        <AnimatePresence mode="popLayout">
          {logs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-white/30">
              <span>Awaiting extraction commands...</span>
            </div>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.02,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group flex items-start gap-2 py-1.5 hover:bg-white/[0.02]"
              >
                <ChevronRight className="mt-0.5 h-3 w-3 text-cyan-400/50" strokeWidth={2} />
                <span className="text-white/30">{formatTime(log.timestamp)}</span>
                <span className={`font-semibold ${typeColors[log.type]}`}>
                  {typePrefixes[log.type]}
                </span>
                <span className="text-white/70">{log.message}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Cursor blink effect */}
      <div className="border-t border-white/5 px-5 py-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-cyan-400">$</span>
          <span className="text-white/50">ready</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="h-4 w-1.5 bg-cyan-400"
          />
        </div>
      </div>
    </motion.div>
  )
}
