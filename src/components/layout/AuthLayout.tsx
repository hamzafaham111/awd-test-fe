import { ReactNode } from "react"
import { Card } from "antd"

interface AuthLayoutProps {
  children: ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl"
  className?: string
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  "4xl": "max-w-4xl",
}

export function AuthLayout({ children, maxWidth = "md", className = "" }: AuthLayoutProps) {
  return (
    <main className={`relative font-poppins min-h-screen flex items-center justify-center p-4 ${className}`} style={{
      backgroundImage: `url('/images/auth-background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-sky-600 opacity-40 pointer-events-none z-0" />
      <div className={`relative w-full ${maxWidthClasses[maxWidth]} z-10`}>
        <Card className="w-full mx-auto shadow-lg border-2 sm:border font-poppins !rounded-2xl">
          {children}
        </Card>
      </div>
    </main>
  )
} 