// Demo user data
export const DEMO_USER = {
  id: "demo-user-id",
  email: "demo@example.com",
  name: "Demo User",
  role: "user" as const,
}

// Simple demo authentication system
export const demoAuth = {
  // Get current session
  getSession: async () => {
    // Check if we have a stored demo user
    const storedUser = typeof localStorage !== "undefined" ? localStorage.getItem("demo_user") : null

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
    }
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    // In demo mode, accept any email with password "password"
    if (password === "password") {
      const user = {
        ...DEMO_USER,
        email: email, // Use the provided email
      }

      // Store in localStorage
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("demo_user", JSON.stringify(user))
      }

      return {
        success: true,
        message: "Signed in successfully (Demo Mode)",
        user,
      }
    }

    return {
      success: false,
      message: "Invalid credentials. In demo mode, use any email with password 'password'",
      user: null,
    }
  },

  // Sign up
  signUp: async (email: string, password: string, name: string) => {
    const user = {
      id: "demo-user-id",
      email,
      name,
      role: "user" as const,
    }

    // Store in localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("demo_user", JSON.stringify(user))
    }

    return {
      success: true,
      message: "Account created successfully (Demo Mode)",
      user,
    }
  },

  // Sign out
  signOut: async () => {
    // Remove from localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("demo_user")
    }

    return { success: true }
  },
}
