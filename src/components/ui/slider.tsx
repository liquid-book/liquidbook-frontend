import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track 
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full",
        "bg-blue-100 dark:bg-blue-800"
      )}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute h-full",
          "bg-[#0064A7] dark:bg-[#0064A7]" // Updated dark mode color
        )} 
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className={cn(
        "block h-4 w-4 rounded-full border shadow transition-colors",
        "bg-white dark:bg-blue-950",
        "border-[#0064A7]/50 dark:border-[#0064A7]", // Updated border color in dark mode
        "hover:bg-blue-100 dark:hover:bg-[#0064A7]/10", // Updated hover effect
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-blue-400 dark:focus-visible:ring-[#0064A7]", // Updated focus ring color
        "disabled:pointer-events-none disabled:opacity-50"
      )} 
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }