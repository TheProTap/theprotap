// Demo data for the application
// This is used when Supabase is not available

// Types
export interface DemoUser {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  bio?: string
  location?: string
  avatar?: string
  skills?: string[]
  connections?: string[]
  followers?: string[]
  following?: string[]
}

export interface DemoCard {
  id: string
  userId: string
  name: string
  title: string
  design: string
  status: "active" | "inactive" | "pending"
  createdAt: string
}

export interface DemoOrder {
  id: string
  userId: string
  cardId: string
  amount: number
  status: "pending" | "completed" | "cancelled"
  createdAt: string
}

// Demo data store
class DemoDataService {
  private users: DemoUser[] = []
  private cards: DemoCard[] = []
  private orders: DemoOrder[] = []
  private initialized = false

  constructor() {
    // Initialize with some data
    this.generateDemoData()
  }

  // Generate demo data
  generateDemoData() {
    if (this.initialized) return

    // Create demo users
    this.users = [
      {
        id: "1",
        email: "user@example.com",
        name: "Demo User",
        role: "user",
        bio: "Professional software developer with 5 years of experience",
        location: "San Francisco, CA",
        avatar: "/placeholder.svg?height=200&width=200",
        skills: ["JavaScript", "React", "Node.js", "TypeScript"],
        connections: ["2", "3"],
        followers: ["2", "3"],
        following: ["2"],
      },
      {
        id: "2",
        email: "admin@example.com",
        name: "Demo Admin",
        role: "admin",
        bio: "Product manager and team lead",
        location: "New York, NY",
        avatar: "/placeholder.svg?height=200&width=200",
        skills: ["Product Management", "UX Design", "Team Leadership"],
        connections: ["1", "3"],
        followers: ["1"],
        following: ["1", "3"],
      },
      {
        id: "3",
        email: "jane@example.com",
        name: "Jane Smith",
        role: "user",
        bio: "UX Designer with a passion for creating intuitive interfaces",
        location: "Seattle, WA",
        avatar: "/placeholder.svg?height=200&width=200",
        skills: ["UI Design", "User Research", "Figma", "Sketch"],
        connections: ["1", "2"],
        followers: ["2"],
        following: ["1"],
      },
    ]

    // Create demo cards
    this.cards = [
      {
        id: "card1",
        userId: "1",
        name: "Professional Card",
        title: "Software Developer",
        design: "modern",
        status: "active",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "card2",
        userId: "2",
        name: "Business Card",
        title: "Product Manager",
        design: "classic",
        status: "active",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    // Create demo orders
    this.orders = [
      {
        id: "order1",
        userId: "1",
        cardId: "card1",
        amount: 29.99,
        status: "completed",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "order2",
        userId: "2",
        cardId: "card2",
        amount: 49.99,
        status: "completed",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    this.initialized = true
  }

  // User methods
  async getUser(id: string): Promise<DemoUser | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async getUserByEmail(email: string): Promise<DemoUser | null> {
    return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
  }

  async updateUser(id: string, data: Partial<DemoUser>): Promise<DemoUser | null> {
    const index = this.users.findIndex((user) => user.id === id)
    if (index === -1) return null

    this.users[index] = { ...this.users[index], ...data }
    return this.users[index]
  }

  // Card methods
  async getCards(userId: string): Promise<DemoCard[]> {
    return this.cards.filter((card) => card.userId === userId)
  }

  async getCard(id: string): Promise<DemoCard | null> {
    return this.cards.find((card) => card.id === id) || null
  }

  async createCard(data: Omit<DemoCard, "id" | "createdAt">): Promise<DemoCard> {
    const newCard: DemoCard = {
      id: `card${this.cards.length + 1}`,
      ...data,
      createdAt: new Date().toISOString(),
    }
    this.cards.push(newCard)
    return newCard
  }

  async updateCard(id: string, data: Partial<DemoCard>): Promise<DemoCard | null> {
    const index = this.cards.findIndex((card) => card.id === id)
    if (index === -1) return null

    this.cards[index] = { ...this.cards[index], ...data }
    return this.cards[index]
  }

  // Order methods
  async getOrders(userId: string): Promise<DemoOrder[]> {
    return this.orders.filter((order) => order.userId === userId)
  }

  async getOrder(id: string): Promise<DemoOrder | null> {
    return this.orders.find((order) => order.id === id) || null
  }

  async createOrder(data: Omit<DemoOrder, "id" | "createdAt">): Promise<DemoOrder> {
    const newOrder: DemoOrder = {
      id: `order${this.orders.length + 1}`,
      ...data,
      createdAt: new Date().toISOString(),
    }
    this.orders.push(newOrder)
    return newOrder
  }

  // Connection methods
  async getConnections(userId: string): Promise<DemoUser[]> {
    const user = await this.getUser(userId)
    if (!user || !user.connections) return []

    return this.users.filter((u) => user.connections?.includes(u.id))
  }

  async getFollowers(userId: string): Promise<DemoUser[]> {
    const user = await this.getUser(userId)
    if (!user) return []

    return this.users.filter((u) => u.following?.includes(userId))
  }

  async getFollowing(userId: string): Promise<DemoUser[]> {
    const user = await this.getUser(userId)
    if (!user || !user.following) return []

    return this.users.filter((u) => user.following?.includes(u.id))
  }

  async followUser(userId: string, targetId: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return false

    if (!this.users[userIndex].following) {
      this.users[userIndex].following = []
    }

    if (!this.users[userIndex].following.includes(targetId)) {
      this.users[userIndex].following.push(targetId)
    }

    return true
  }

  async unfollowUser(userId: string, targetId: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return false

    if (!this.users[userIndex].following) return false

    this.users[userIndex].following = this.users[userIndex].following.filter((id) => id !== targetId)
    return true
  }
}

// Export a singleton instance
export const demoData = new DemoDataService()
