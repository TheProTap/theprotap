/**
 * Redirects the user to the specified path using the most reliable method
 */
export function redirectTo(path: string): void {
  // Use window.location for a hard navigation (most reliable)
  window.location.href = path
}

/**
 * Redirects the user to the dashboard
 */
export function redirectToDashboard(): void {
  redirectTo("/dashboard")
}
