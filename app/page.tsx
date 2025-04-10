import Image from "next/image"
import { TabsNav } from "@/components/tabs-nav"
import { ProfileCard } from "@/components/profile-card"
import { CustomWeightingButton } from "@/components/custom-weighting-button"

export default function ProfilesPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[200px] border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <Image src="/ghost-logo.svg" alt="Ghost Logo" width={80} height={30} />
        </div>
        <div className="mt-4">
          <p className="px-4 py-2 text-xs font-medium text-gray-500">Platform</p>
          <SidebarItem icon="connect" label="Connect" />
          <SidebarItem icon="profiles" label="Profiles" active />
          <SidebarItem icon="territory" label="Territory" />
          <SidebarItem icon="insights" label="Insights" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold mb-2">Ideal Customer Profiles</h1>
              <p className="text-gray-600">
                Detailed profiles of our target customers with key attributes including lifetime value, firmographics,
                and technographics.
              </p>
            </div>
            <CustomWeightingButton />
          </div>

          {/* Tabs */}
          <TabsNav />

          {/* Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <ProfileCard
              title="Enterprise SaaS"
              industry="Technology"
              employeeCount="1000+ employees"
              lifetimeValue="$120,000"
              acv="$40,000"
              deals="1.2/year"
              churn="5%"
              tam="$25B"
              firmographics={{
                revenue: "$50M - $500M",
                location: "North America, Europe",
              }}
              techStack={["AWS", "Kubernetes", "React", "Node.js", "PostgreSQL"]}
              painPoints={[
                "Managing complex infrastructure at scale",
                "Ensuring security compliance",
                "Reducing operational costs",
              ]}
              recentDeals={["Acme Corp", "TechStart Inc", "Global Systems Ltd"]}
              notes={[
                {
                  author: "Sarah K.",
                  date: "3/20/2024",
                  content: "Great fit for our new security features",
                },
              ]}
            />

            <ProfileCard
              title="Mid-Market FinTech"
              industry="Financial Services"
              employeeCount="100-999 employees"
              lifetimeValue="$75,000"
              acv="$25,000"
              deals="0.8/year"
              churn="8%"
              tam="$10B"
              firmographics={{
                revenue: "$10M - $50M",
                location: "United States, UK, Australia",
              }}
              techStack={["Google Cloud", "Docker", "Vue.js", "Python", "MongoDB"]}
              painPoints={["Regulatory compliance", "Fast and secure transactions", "Customer data protection"]}
              recentDeals={["Acme Corp", "TechStart Inc", "Global Systems Ltd"]}
              notes={[]}
            />

            <ProfileCard
              title="SMB E-commerce"
              industry="Retail & E-commerce"
              employeeCount="10-99 employees"
              lifetimeValue="$25,000"
              acv="$5,000"
              deals="1.5/year"
              churn="15%"
              tam="$5B"
              firmographics={{
                revenue: "$1M - $10M",
                location: "Global, primarily US and EU",
              }}
              techStack={["Shopify", "WordPress", "PHP", "MySQL"]}
              painPoints={[
                "Increasing customer acquisition",
                "Optimizing conversion rates",
                "Managing inventory efficiently",
              ]}
              recentDeals={["Acme Corp", "TechStart Inc", "Global Systems Ltd"]}
              notes={[]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center px-4 py-2 ${
        active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <div className="w-5 h-5 mr-3">
        <SidebarIcon name={icon} />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

function SidebarIcon({ name }: { name: string }) {
  switch (name) {
    case "connect":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z" />
          <path d="M15 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4z" />
          <path d="M3 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
          <path d="M6 9v1" />
          <path d="M9 6h1" />
          <path d="M14 9v1" />
          <path d="M9 14h1" />
          <path d="M19 9v1" />
          <path d="M14 19v1" />
          <path d="M19 14h1" />
        </svg>
      )
    case "profiles":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case "territory":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case "insights":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      )
    default:
      return null
  }
}
