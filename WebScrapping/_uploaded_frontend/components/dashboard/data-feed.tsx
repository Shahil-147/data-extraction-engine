"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Image, Link2, Video, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export interface ScrapedItem {
  id: string
  type: "image" | "link" | "video"
  url: string
  status: "success" | "pending" | "error"
  timestamp: Date
  size?: string
}

interface DataFeedProps {
  items: ScrapedItem[]
}

const typeIcons = {
  image: Image,
  link: Link2,
  video: Video,
}

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  pending: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
  error: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10" },
}

export function DataFeed({ items }: DataFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-white/70">
            Live Data Feed
          </h3>
        </div>
        <span className="font-mono text-xs text-white/40">
          {items.length} items extracted
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 border-b border-white/5 bg-white/[0.01] px-6 py-3 text-xs font-medium uppercase tracking-wider text-white/40">
        <div className="col-span-1">Type</div>
        <div className="col-span-6">Resource URL</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Action</div>
      </div>

      {/* Data Rows */}
      <div className="max-h-[400px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-white/30"
            >
              <div className="mb-4 rounded-full border border-white/10 p-4">
                <Link2 className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <p className="text-sm">No data extracted yet</p>
              <p className="mt-1 text-xs text-white/20">Enter a URL above to start scraping</p>
            </motion.div>
          ) : (
            items.map((item, index) => {
              const TypeIcon = typeIcons[item.type]
              const status = statusConfig[item.status]
              const StatusIcon = status.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group grid grid-cols-12 items-center gap-4 border-b border-white/5 px-6 py-4 transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  {/* Type */}
                  <div className="col-span-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <TypeIcon className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* URL */}
                  <div className="col-span-6 truncate font-mono text-sm text-white/70 transition-colors group-hover:text-white/90">
                    {item.url}
                  </div>

                  {/* Size */}
                  <div className="col-span-2 font-mono text-xs text-white/40">
                    {item.size || "—"}
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${status.bg}`}>
                      <StatusIcon className={`h-3 w-3 ${status.color}`} strokeWidth={2} />
                      <span className={`text-xs font-medium capitalize ${status.color}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="col-span-1">
                    <button className="rounded-lg p-2 text-white/30 transition-all duration-200 hover:bg-white/10 hover:text-cyan-400">
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
