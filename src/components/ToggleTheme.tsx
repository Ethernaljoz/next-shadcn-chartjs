import { Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

import React from 'react'

const ToggleTheme = () => {
  return (
    <Toggle aria-label="Toggle bold">
      <Sun  className="h-6 w-6" />
    </Toggle>
  )
}

export default ToggleTheme