"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Filter, PlusCircle, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SignalFilter {
  id: string
  label: string
  selected: boolean
}

interface Signal {
  id: string
  name: string
  type?: string
  isVariable: boolean
  filters?: SignalFilter[]
  selected: boolean
}

interface CriterionOption {
  value: string
  label: string
  type: string
  isVariable: boolean
  filterOptions?: { id: string; label: string }[]
}

interface ICPCategory {
  id: string
  name: string
  isNew?: boolean
}

export function CustomWeightingModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [scoreMode, setScoreMode] = useState("automated")
  const [selectedCriterion, setSelectedCriterion] = useState("")
  const [isAddingNewICP, setIsAddingNewICP] = useState(false)
  const [newICPName, setNewICPName] = useState("")
  const [selectedICP, setSelectedICP] = useState<string>("enterprise-saas")

  const icpCategories: ICPCategory[] = [
    { id: "enterprise-saas", name: "Enterprise SaaS" },
    { id: "mid-market-fintech", name: "Mid-Market FinTech" },
    { id: "smb-ecommerce", name: "SMB E-commerce" },
  ]

  // Define filter options for different criteria
  const filterOptionsByType: Record<string, { id: string; label: string }[]> = {
    "total-ltv": [
      { id: "0-50k", label: "$0-$50k" },
      { id: "50k-100k", label: "$50k-$100k" },
      { id: "100k-150k", label: "$100k-$150k" },
      { id: "150k-200k", label: "$150k-$200k" },
      { id: "200k+", label: "$200k+" },
    ],
    industry: [
      { id: "retail", label: "Retail" },
      { id: "cpg", label: "CPG" },
      { id: "automotive", label: "Automotive" },
      { id: "healthcare", label: "Healthcare" },
      { id: "technology", label: "Technology" },
      { id: "finance", label: "Finance" },
      { id: "manufacturing", label: "Manufacturing" },
    ],
    employees: [
      { id: "1-10", label: "1-10 employees" },
      { id: "11-50", label: "11-50 employees" },
      { id: "51-200", label: "51-200 employees" },
      { id: "201-500", label: "201-500 employees" },
      { id: "501-1000", label: "501-1000 employees" },
      { id: "1001+", label: "1001+ employees" },
    ],
    location: [
      { id: "north-america", label: "North America" },
      { id: "europe", label: "Europe" },
      { id: "asia-pacific", label: "Asia Pacific" },
      { id: "latin-america", label: "Latin America" },
      { id: "middle-east", label: "Middle East" },
      { id: "africa", label: "Africa" },
    ],
    cloud: [
      { id: "aws", label: "AWS" },
      { id: "azure", label: "Azure" },
      { id: "gcp", label: "Google Cloud" },
      { id: "ibm", label: "IBM Cloud" },
      { id: "oracle", label: "Oracle Cloud" },
      { id: "digital-ocean", label: "Digital Ocean" },
    ],
    funding: [
      { id: "pre-seed", label: "Pre-seed" },
      { id: "seed", label: "Seed" },
      { id: "series-a", label: "Series A" },
      { id: "series-b", label: "Series B" },
      { id: "series-c+", label: "Series C+" },
      { id: "public", label: "Public" },
      { id: "bootstrapped", label: "Bootstrapped" },
    ],
    "founding-year": [
      { id: "before-2000", label: "Before 2000" },
      { id: "2000-2010", label: "2000-2010" },
      { id: "2011-2015", label: "2011-2015" },
      { id: "2016-2020", label: "2016-2020" },
      { id: "after-2020", label: "After 2020" },
    ],
    "revenue-range": [
      { id: "0-1m", label: "$0-$1M" },
      { id: "1m-10m", label: "$1M-$10M" },
      { id: "10m-50m", label: "$10M-$50M" },
      { id: "50m-100m", label: "$50M-$100M" },
      { id: "100m+", label: "$100M+" },
    ],
  }

  const criteriaOptions: CriterionOption[] = [
    {
      value: "total-funding",
      label: "Total funding",
      type: "financial",
      isVariable: true,
      filterOptions: filterOptionsByType.funding,
    },
    {
      value: "founding-date",
      label: "Founding date",
      type: "company",
      isVariable: true,
      filterOptions: filterOptionsByType["founding-year"],
    },
    {
      value: "marketing-employees",
      label: "Total marketing employees",
      type: "employees",
      isVariable: true,
      filterOptions: filterOptionsByType.employees,
    },
    {
      value: "total-revenue",
      label: "Total revenue",
      type: "financial",
      isVariable: true,
      filterOptions: filterOptionsByType["revenue-range"],
    },
    {
      value: "cloud-provider",
      label: "Cloud provider",
      type: "tech",
      isVariable: true,
      filterOptions: filterOptionsByType.cloud,
    },
    {
      value: "headquarters",
      label: "Headquarters location",
      type: "company",
      isVariable: true,
      filterOptions: filterOptionsByType.location,
    },
    {
      value: "total-ltv",
      label: "Total customer LTV",
      type: "financial",
      isVariable: true,
      filterOptions: filterOptionsByType["total-ltv"],
    },
    {
      value: "industry",
      label: "Industry vertical",
      type: "company",
      isVariable: true,
      filterOptions: filterOptionsByType.industry,
    },
    {
      value: "total-employees",
      label: "Total employees",
      type: "employees",
      isVariable: true,
      filterOptions: filterOptionsByType.employees,
    },
    { value: "hiring-remote", label: "Hiring Remote Roles", type: "hiring", isVariable: false },
    { value: "has-marketing-leader", label: "Has Marketing Leader", type: "employees", isVariable: false },
    { value: "hiring-finance", label: "Hiring Finance", type: "hiring", isVariable: false },
    { value: "hiring-privacy", label: "Hiring Privacy", type: "hiring", isVariable: false },
    { value: "using-ai", label: "Using AI", type: "tech", isVariable: false },
    { value: "has-mobile-app", label: "Has Mobile App", type: "tech", isVariable: false },
    { value: "public-company", label: "Public Company", type: "company", isVariable: false },
  ]

  const [signals, setSignals] = useState<Signal[]>([
    {
      id: "1",
      name: "Total customer LTV",
      type: "financial",
      isVariable: true,
      selected: true,
      filters: filterOptionsByType["total-ltv"].map((option) => ({
        id: option.id,
        label: option.label,
        selected: option.id === "100k-150k" || option.id === "150k-200k",
      })),
    },
    { id: "2", name: "Hiring Remote Roles", type: "hiring", isVariable: false, selected: true },
    {
      id: "3",
      name: "Industry vertical",
      type: "company",
      isVariable: true,
      selected: true,
      filters: filterOptionsByType.industry.map((option) => ({
        id: option.id,
        label: option.label,
        selected: option.id === "technology" || option.id === "finance",
      })),
    },
    { id: "4", name: "Hiring Finance", type: "hiring", isVariable: false, selected: true },
    { id: "5", name: "Hiring Privacy", type: "hiring", isVariable: false, selected: true },
    {
      id: "6",
      name: "Founding date",
      type: "company",
      isVariable: true,
      selected: true,
      filters: filterOptionsByType["founding-year"].map((option) => ({
        id: option.id,
        label: option.label,
        selected: option.id === "2000-2010",
      })),
    },
  ])

  const addCriterion = (value: string) => {
    if (!value) return

    const criterion = criteriaOptions.find((c) => c.value === value)
    if (!criterion) return

    // Create new signal
    const newSignal: Signal = {
      id: `${signals.length + 1}-${Date.now()}`,
      name: criterion.label,
      type: criterion.type,
      isVariable: criterion.isVariable,
      selected: true,
    }

    // Add filter options if available for variable criteria
    if (criterion.isVariable && criterion.filterOptions) {
      newSignal.filters = criterion.filterOptions.map((option) => ({
        id: option.id,
        label: option.label,
        selected: false,
      }))
    }

    setSignals([...signals, newSignal])
    setSelectedCriterion("")
  }

  const toggleFilter = (signalId: string, filterId: string) => {
    setSignals(
      signals.map((signal) => {
        if (signal.id === signalId && signal.filters) {
          const updatedFilters = signal.filters.map((filter) =>
            filter.id === filterId ? { ...filter, selected: !filter.selected } : filter,
          )
          return { ...signal, filters: updatedFilters }
        }
        return signal
      }),
    )
  }

  const deleteSignal = (id: string) => {
    setSignals(signals.filter((signal) => signal.id !== id))
  }

  const getSelectedFiltersCount = (signal: Signal) => {
    if (!signal.filters) return 0
    return signal.filters.filter((f) => f.selected).length
  }

  const getSelectedFiltersText = (signal: Signal) => {
    if (!signal.filters) return ""
    const selected = signal.filters.filter((f) => f.selected)
    if (selected.length === 0) return "Any"
    if (selected.length === 1) return selected[0].label
    return `${selected.length} selected`
  }

  const handleAddNewICP = () => {
    if (newICPName.trim() === "") return

    // In a real app, you would save this to your backend
    // For now, we'll just switch to the new ICP
    setIsAddingNewICP(false)
    setSelectedICP(`new-${Date.now()}`)
    setNewICPName("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-6 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">Define ICP Criteria</DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Select criteria and filters to define your ideal customer profile.
          </DialogDescription>
        </DialogHeader>

        {/* ICP Category Selection */}
        <div className="mb-8">
          <div className="text-sm font-medium text-gray-500 mb-4">ICP CATEGORY</div>

          {isAddingNewICP ? (
            <div className="flex items-center gap-3">
              <Input
                placeholder="Enter new ICP name"
                value={newICPName}
                onChange={(e) => setNewICPName(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAddNewICP}
                disabled={newICPName.trim() === ""}
                className="bg-green-100 hover:bg-green-200 text-green-800"
              >
                Create
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNewICP(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {icpCategories.map((category) => (
                <div
                  key={category.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedICP === category.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedICP(category.id)}
                >
                  <RadioGroup value={selectedICP} onValueChange={setSelectedICP}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={category.id} id={category.id} />
                      <Label htmlFor={category.id} className="font-medium">
                        {category.name}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}

              <div
                className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={() => setIsAddingNewICP(true)}
              >
                <div className="flex items-center text-gray-600">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span>Add new ICP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">SCORING TYPE</div>
            <Select value={scoreMode} onValueChange={setScoreMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select scoring type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automated">Ghost automated scoring</SelectItem>
                <SelectItem value="custom">Ghost weighting + custom triggers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">ADD CRITERION</div>
            <Select
              value={selectedCriterion}
              onValueChange={(value) => {
                setSelectedCriterion(value)
                addCriterion(value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select criterion to add" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="header-variable" disabled>
                  Variable Criteria
                </SelectItem>
                {criteriaOptions
                  .filter((c) => c.isVariable)
                  .map((criterion) => (
                    <SelectItem key={criterion.value} value={criterion.value}>
                      {criterion.label}
                    </SelectItem>
                  ))}
                <SelectItem value="header-binary" disabled>
                  Binary Criteria
                </SelectItem>
                {criteriaOptions
                  .filter((c) => !c.isVariable)
                  .map((criterion) => (
                    <SelectItem key={criterion.value} value={criterion.value}>
                      {criterion.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-gray-500">SELECTED CRITERIA</div>
            <div className="text-sm font-medium text-gray-500">{signals.length} CRITERIA</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {signals.map((signal) => (
              <div key={signal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      signal.type === "financial"
                        ? "bg-green-500"
                        : signal.type === "company"
                          ? "bg-blue-500"
                          : signal.type === "employees"
                            ? "bg-yellow-500"
                            : signal.type === "tech"
                              ? "bg-purple-500"
                              : signal.type === "hiring"
                                ? "bg-orange-500"
                                : "bg-gray-500"
                    }`}
                  ></div>
                  <div className="font-medium flex-1">{signal.name}</div>
                  <button
                    onClick={() => deleteSignal(signal.id)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-gray-100"
                    aria-label="Delete signal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {signal.isVariable && signal.filters ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-500">Value:</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 border-dashed">
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            <span>{getSelectedFiltersText(signal)}</span>
                            {getSelectedFiltersCount(signal) > 0 && (
                              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                                {getSelectedFiltersCount(signal)}
                              </Badge>
                            )}
                            <ChevronsUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search options..." />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {signal.filters.map((filter) => (
                                  <CommandItem
                                    key={filter.id}
                                    onSelect={() => toggleFilter(signal.id, filter.id)}
                                    className="flex items-center gap-2"
                                  >
                                    <Checkbox
                                      checked={filter.selected}
                                      onCheckedChange={() => toggleFilter(signal.id, filter.id)}
                                      className="mr-2 h-4 w-4"
                                      id={`filter-${signal.id}-${filter.id}`}
                                    />
                                    <label htmlFor={`filter-${signal.id}-${filter.id}`} className="flex-1 text-sm">
                                      {filter.label}
                                    </label>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {getSelectedFiltersCount(signal) > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {signal.filters
                          .filter((f) => f.selected)
                          .map((filter) => (
                            <Badge key={filter.id} variant="outline" className="text-xs">
                              {filter.label}
                              <button
                                className="ml-1 text-gray-400 hover:text-gray-600"
                                onClick={() => toggleFilter(signal.id, filter.id)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-2">Status:</div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <Check className="mr-1 h-3 w-3" /> Yes
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-indigo-200 hover:bg-indigo-300 text-indigo-800">Save</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
