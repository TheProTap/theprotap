"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { useAuth } from "@/contexts/auth-context"
import { navigateTo, scrollToSection, handleClick } from "@/lib/click-handler"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle sign out with direct navigation
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      // Force navigation to home page
      window.location.href = "/"
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center" onClick={handleClick(() => navigateTo("/"))}>
          <Logo className="h-8 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">
            Products
          </Link>
          <button
            onClick={handleClick(() => scrollToSection("pricing"))}
            className="text-gray-700 hover:text-primary transition-colors"
          >
            Pricing
          </button>
          <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="ghost" onClick={handleClick(() => navigateTo("/dashboard"))}>
                Dashboard
              </Button>
              <Button onClick={handleClick(handleSignOut)}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={handleClick(() => navigateTo("/login"))}>
                Log In
              </Button>
              <Button onClick={handleClick(() => navigateTo("/signup"))}>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container py-4 flex flex-col space-y-4">
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <button
              onClick={handleClick(() => {
                scrollToSection("pricing")
                setIsMenuOpen(false)
              })}
              className="text-gray-700 hover:text-primary transition-colors py-2"
            >
              Pricing
            </button>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <>
                <button
                  onClick={handleClick(() => {
                    navigateTo("/dashboard")
                    setIsMenuOpen(false)
                  })}
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                >
                  Dashboard
                </button>
                <Button
                  onClick={handleClick(() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={handleClick(() => {
                    navigateTo("/login")
                    setIsMenuOpen(false)
                  })}
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                >
                  Log In
                </button>
                <Button
                  onClick={handleClick(() => {
                    navigateTo("/signup")
                    setIsMenuOpen(false)
                  })}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
