import type React from "react"
// Global click handler utility
export function handleClick(callback: () => void) {
  return (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Use setTimeout to ensure the click event completes
    setTimeout(() => {
      try {
        callback()
      } catch (error) {
        console.error("Click handler error:", error)
        // Fallback to direct navigation if needed
        if (typeof window !== "undefined" && callback.toString().includes("window.location")) {
          const match = callback.toString().match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/)
          if (match && match[1]) {
            window.location.href = match[1]
          }
        }
      }
    }, 0)
  }
}

// Direct navigation function
export function navigateTo(path: string) {
  if (typeof window !== "undefined") {
    window.location.href = path
  }
}

// Scroll to section function
export function scrollToSection(sectionId: string) {
  if (typeof window !== "undefined") {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      // If we're not on the homepage, navigate there first
      if (!window.location.pathname.endsWith("/")) {
        window.location.href = `/#${sectionId}`
      }
    }
  }
}
