"use client"

import { useState } from "react"
import { BarChartIcon as ChartBar, Globe, Server, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Note {
  author: string
  date: string
  content: string
}

interface ProfileCardProps {
  title: string
  industry: string
  employeeCount: string
  lifetimeValue: string
  acv: string
  deals: string
  churn: string
  tam: string
  firmographics: {
    revenue: string
    location: string
  }
  techStack: string[]
  painPoints: string[]
  recentDeals: string[]
  notes: Note[]
}

export function ProfileCard({
  title,
  industry,
  employeeCount,
  lifetimeValue,
  acv,
  deals,
  churn,
  tam,
  firmographics,
  techStack,
  painPoints,
  recentDeals,
  notes,
}: ProfileCardProps) {
  const [noteInput, setNoteInput] = useState("")

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <span className="text-gray-400">IC</span>
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            {industry} • {employeeCount}
          </div>

          {/* Lifetime Value */}
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="mr-1">$</span>
              <span>Lifetime Value</span>
            </div>
            <div className="text-2xl font-bold">{lifetimeValue}</div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div>
              <div className="text-xs text-gray-500">ACV</div>
              <div className="font-medium">{acv}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Deals</div>
              <div className="font-medium">{deals}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Churn</div>
              <div className="font-medium">{churn}</div>
            </div>
          </div>

          {/* Total Addressable Market */}
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <ChartBar className="w-4 h-4 mr-1" />
              <span>Total Addressable Market</span>
            </div>
            <div className="text-xl font-bold">{tam}</div>
          </div>

          {/* Firmographics */}
          <div className="mb-4">
            <div className="flex items-center text-sm font-medium mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                <path d="M3 7h18" />
                <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
              </svg>
              <span>Firmographics</span>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <ChartBar className="w-4 h-4 mr-2 text-gray-400" />
                <span>Revenue: {firmographics.revenue}</span>
              </div>
              <div className="flex items-center text-sm">
                <Globe className="w-4 h-4 mr-2 text-gray-400" />
                <span>Location: {firmographics.location}</span>
              </div>
            </div>
          </div>

          {/* Technographics */}
          <div className="mb-4">
            <div className="flex items-center text-sm font-medium mb-2">
              <Server className="w-4 h-4 mr-1" />
              <span>Technographics</span>
            </div>
            <div className="text-sm mb-1">Tech Stack:</div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Pain Points */}
          <div className="mb-4">
            <div className="flex items-center text-sm font-medium mb-2">
              <Zap className="w-4 h-4 mr-1" />
              <span>Key Pain Points</span>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {painPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Recent Deals */}
          <div className="mb-4">
            <div className="flex items-center text-sm font-medium mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Recent Deals</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentDeals.map((deal) => (
                <span key={deal} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
                  {deal}
                </span>
              ))}
            </div>
          </div>

          {/* Team Notes */}
          <div>
            <div className="text-sm font-medium mb-2">Team Notes</div>
            {notes.map((note, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span className="font-medium">{note.author}</span>
                  <span className="ml-auto">{note.date}</span>
                </div>
                <p className="text-sm">{note.content}</p>
              </div>
            ))}
            <div className="relative mt-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Add a note or @mention a teammate..."
                className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm pr-8"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
