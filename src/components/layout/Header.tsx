"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/artisans", label: "Artisans" },
    { href: "/carte", label: "Carte" },
    { href: "/a-propos", label: "\u00c0 propos" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-foreground leading-tight">
                SiteArtisan
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                Annuaire des artisans
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>
            <Link href="/ajouter-mon-entreprise">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Ajouter mon entreprise
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full">
                    Administration
                  </Button>
                </Link>
                <Link href="/ajouter-mon-entreprise" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter mon entreprise
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
