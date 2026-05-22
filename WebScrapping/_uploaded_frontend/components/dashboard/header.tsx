"use client"

import { motion } from "framer-motion"
import { Terminal, Settings, Bell } from "lucide-react"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
            <Terminal className="h-4 w-4 text-cyan-400" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white">
              WebScraper
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-cyan-400/80">
              Enterprise
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {["Dashboard", "History", "Analytics", "API"].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className={`text-sm transition-colors duration-200 ${
                index === 0
                  ? "font-medium text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative rounded-lg p-2.5 text-white/50 transition-all duration-200 hover:bg-white/5 hover:text-white/80">
            <Bell className="h-4 w-4" strokeWidth={1.5} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </button>
          <button className="rounded-lg p-2.5 text-white/50 transition-all duration-200 hover:bg-white/5 hover:text-white/80">
            <Settings className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <div className="ml-2 h-8 w-px bg-white/10" />
          <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-xs font-semibold text-black">
            A
          </div>
        </div>
      </div>
    </motion.header>
  )
}
