"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { FileText, Zap, Cpu, Database } from "lucide-react"
import { Header } from "@/components/dashboard/header"
import { MetricCard } from "@/components/dashboard/metric-card"
import { URLInput } from "@/components/dashboard/url-input"
import { DataFeed, ScrapedItem } from "@/components/dashboard/data-feed"
import { ActivityLog, LogEntry } from "@/components/dashboard/activity-log"

// Simulated data generation
const generateMockItem = (index: number): ScrapedItem => {
  const types: Array<"image" | "link" | "video"> = ["image", "link", "video"]
  const type = types[Math.floor(Math.random() * types.length)]
  const extensions = {
    image: [".jpg", ".png", ".webp", ".svg"],
    link: ["", "/page", "/article", "/product"],
    video: [".mp4", ".webm", ".mov"],
  }
  const ext = extensions[type][Math.floor(Math.random() * extensions[type].length)]
  const sizes = ["12.4 KB", "45.2 KB", "128 KB", "256 KB", "1.2 MB", "2.8 MB"]

  return {
    id: `item-${Date.now()}-${index}`,
    type,
    url: `https://example.com/assets/${type}-${index}${ext}`,
    status: Math.random() > 0.1 ? "success" : Math.random() > 0.5 ? "pending" : "error",
    timestamp: new Date(),
    size: type !== "link" ? sizes[Math.floor(Math.random() * sizes.length)] : undefined,
  }
}

const generateLogEntry = (message: string, type: LogEntry["type"] = "info"): LogEntry => ({
  id: `log-${Date.now()}-${Math.random()}`,
  timestamp: new Date(),
  message,
  type,
})

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<ScrapedItem[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [metrics, setMetrics] = useState({
    pagesScanned: 0,
    extractionRate: 0,
    activeThreads: 0,
    dataPoints: 0,
  })

  const addLog = useCallback((message: string, type: LogEntry["type"] = "info") => {
    setLogs((prev) => [generateLogEntry(message, type), ...prev].slice(0, 50))
  }, [])

  const handleScrape = useCallback(
    async (url: string) => {
      setIsLoading(true)
      setItems([])
      addLog(`Initiating scrape for: ${url}`, "info")
      addLog("Establishing secure connection...", "info")

      // Simulate scraping process
      await new Promise((r) => setTimeout(r, 800))
      addLog("Connection established", "success")
      addLog("Parsing DOM structure...", "info")

      await new Promise((r) => setTimeout(r, 500))
      addLog("DOM parsed successfully", "success")
      addLog("Extracting resources...", "info")

      // Update metrics
      setMetrics({
        pagesScanned: Math.floor(Math.random() * 50) + 10,
        extractionRate: Math.floor(Math.random() * 30) + 70,
        activeThreads: Math.floor(Math.random() * 6) + 2,
        dataPoints: Math.floor(Math.random() * 500) + 100,
      })

      // Simulate items coming in one by one
      const totalItems = Math.floor(Math.random() * 15) + 8
      for (let i = 0; i < totalItems; i++) {
        await new Promise((r) => setTimeout(r, 200 + Math.random() * 300))
        const newItem = generateMockItem(i)
        setItems((prev) => [newItem, ...prev])
        addLog(
          `Extracted ${newItem.type}: ${newItem.url.split("/").pop()}`,
          newItem.status === "success" ? "success" : newItem.status === "error" ? "error" : "warning"
        )
      }

      addLog(`Extraction complete. ${totalItems} resources found.`, "success")
      setIsLoading(false)
    },
    [addLog]
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-cyan-500/[0.03] blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-cyan-500/[0.02] blur-3xl" />
      </div>

      <Header />

      <main className="relative mx-auto max-w-7xl px-6 pb-20 pt-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">
            Web Data{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text font-semibold text-transparent">
              Extraction
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/50">
            Enterprise-grade web scraping with real-time data extraction, intelligent parsing, and
            comprehensive analytics.
          </p>
        </motion.div>

        {/* URL Input */}
        <div className="mx-auto mb-16 max-w-3xl">
          <URLInput onSubmit={handleScrape} isLoading={isLoading} />
        </div>

        {/* Metrics */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Pages Scanned"
            value={metrics.pagesScanned}
            icon={FileText}
            delay={0}
          />
          <MetricCard
            title="Extraction Rate"
            value={metrics.extractionRate}
            suffix="%"
            icon={Zap}
            delay={0.1}
          />
          <MetricCard
            title="Active Threads"
            value={metrics.activeThreads}
            icon={Cpu}
            delay={0.2}
          />
          <MetricCard
            title="Data Points"
            value={metrics.dataPoints}
            icon={Database}
            delay={0.3}
          />
        </div>

        {/* Data Feed & Activity Log */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataFeed items={items} />
          </div>
          <div className="lg:col-span-1">
            <ActivityLog logs={logs} />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 border-t border-white/5 pt-8 text-center"
        >
          <p className="text-xs text-white/30">
            WebScraper Enterprise • Real-time Data Extraction Platform
          </p>
        </motion.footer>
      </main>
    </div>
  )
}
