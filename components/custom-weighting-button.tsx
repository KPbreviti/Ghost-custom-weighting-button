"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomWeightingModal } from "@/components/custom-weighting-modal"

export function CustomWeightingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="bg-purple-200 hover:bg-purple-300 text-purple-800">
        Custom Weighting
      </Button>
      <CustomWeightingModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
