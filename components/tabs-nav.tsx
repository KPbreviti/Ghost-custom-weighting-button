"use client"

import { useState } from "react"

export function TabsNav() {
  const [activeTab, setActiveTab] = useState("active")

  const tabs = [
    { id: "active", label: "Active" },
    { id: "planned", label: "Planned" },
    { id: "archived", label: "Archived" },
    { id: "recommended", label: "Recommended" },
  ]

  return (
    <div className="border-b border-gray-200">
      <div className="flex justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
