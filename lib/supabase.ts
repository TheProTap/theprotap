import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log environment variables for debugging (only in development)
if (process.env.NODE_ENV === "development") {
  console.log("Supabase URL:", supabaseUrl ? "Set" : "Not set")
  console.log("Supabase Anon Key:", supabaseAnonKey ? "Set" : "Not set")
}

// Helper function to validate URL
const isValidUrl = (urlString: string | undefined): boolean => {
  if (!urlString) return false

  try {
    new URL(urlString)
    return true
  } catch (e) {
    return false
  }
}

// Create a dummy client for fallback when URL is invalid
const createDummyClient = () => {
  console.warn("Using dummy Supabase client due to invalid configuration")

  // Return an object with the same shape as the Supabase client
  // but with methods that return empty results
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({
        data: null,
        error: { message: "Supabase not configured. Please check your environment variables." },
      }),
      signUp: async () => ({
        data: null,
        error: { message: "Supabase not configured. Please check your environment variables." },
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
        limit: () => ({ data: [], error: null }),
      }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
  }
}

// Validate and create Supabase client
let supabaseClient: any
let usingDummyClient = false

if (isValidUrl(supabaseUrl) && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl!, supabaseAnonKey)
    console.log("Supabase client initialized successfully")
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    supabaseClient = createDummyClient()
    usingDummyClient = true
  }
} else {
  console.warn(
    "Invalid Supabase configuration. URL:",
    supabaseUrl ? "provided but invalid" : "missing",
    "Anon key:",
    supabaseAnonKey ? "provided" : "missing",
  )
  supabaseClient = createDummyClient()
  usingDummyClient = true
}

// Export the client
export const supabase = supabaseClient

// Export flag indicating if we're using the dummy client
export const isUsingDummyClient = () => usingDummyClient

// Simple function to test connection
export const testSupabaseConnection = async () => {
  try {
    if (usingDummyClient) {
      return {
        success: false,
        message: "Supabase not configured. Please check your environment variables.",
      }
    }

    if (!isValidUrl(supabaseUrl)) {
      return {
        success: false,
        message: "Invalid Supabase URL. Please check your environment variables.",
      }
    }

    const { error } = await supabase.from("profiles").select("count").limit(1)

    if (error) {
      throw error
    }

    return { success: true, message: "Connected successfully to Supabase" }
  } catch (error: any) {
    console.error("Supabase connection error:", error)
    return {
      success: false,
      message: error.message || "Failed to connect to Supabase",
    }
  }
}

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !usingDummyClient && isValidUrl(supabaseUrl) && !!supabaseAnonKey
}
