"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, Plus, Settings, LogOut, Menu, X, Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check against environment variable password
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Celexia@2006"

      if (password === adminPassword) {
        localStorage.setItem("admin_auth", "true")
        localStorage.setItem("admin_auth_time", Date.now().toString())
        onLogin()
      } else {
        setError("Mot de passe incorrect")
      }
    } catch (err) {
      setError("Erreur lors de la connexion")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Administration</h1>
          <p className="text-gray-500 mt-1">Connectez-vous pour accéder au panneau d&apos;administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError("") }}
              placeholder="Entrez le mot de passe"
              className="h-12"
              autoFocus
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full h-12"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          ArtisansFrance.fr — Panneau d&apos;administration
        </p>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const auth = localStorage.getItem("admin_auth")
    setIsAuthenticated(auth === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setIsAuthenticated(false)
  }

  // Show loading spinner while checking authentication (isAuthenticated is null)
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/artisans", label: "Artisans", icon: Users },
    { href: "/admin/artisans/new", label: "Ajouter", icon: Plus },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:w-64 flex-col fixed inset-y-0 z-50 bg-white border-r border-gray-100">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/logo.png" alt="ArtisansFrance.fr" className="h-8 w-auto" />
            <span className="font-heading font-bold text-gray-900">Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-primary-50 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <Settings className="w-5 h-5" />
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            D&eacute;connexion
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 h-14 flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-heading font-bold text-gray-900">Administration</span>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
              <span className="font-heading font-bold text-gray-900">Admin</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    pathname === item.href
                      ? "bg-primary-50 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full"
              >
                <LogOut className="w-5 h-5" />
                D&eacute;connexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
