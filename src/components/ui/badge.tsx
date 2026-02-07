import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-gray-100 text-gray-700",
        outline: "border-gray-300 text-gray-700",
        plombier: "border-transparent bg-blue-100 text-blue-700",
        pisciniste: "border-transparent bg-cyan-100 text-cyan-700",
        paysagiste: "border-transparent bg-green-100 text-green-700",
        electricien: "border-transparent bg-amber-100 text-amber-700",
        demenageur: "border-transparent bg-purple-100 text-purple-700",
        certified: "border-transparent bg-emerald-100 text-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
