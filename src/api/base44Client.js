// Mock Base44 API client for demonstration
// In production, this would connect to a real backend

const mockData = {
  menuItems: [],
  deals: [],
  reviews: [],
  orders: [],
}

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const base44 = {
  entities: {
    MenuItem: {
      filter: async (params) => {
        await delay(300)
        let items = mockData.menuItems

        if (params.is_available !== undefined) {
          items = items.filter(item => item.is_available === params.is_available)
        }
        if (params.is_popular !== undefined) {
          items = items.filter(item => item.is_popular === params.is_popular)
        }

        return items
      },
      create: async (data) => {
        await delay(200)
        const newItem = { ...data, id: Date.now().toString() }
        mockData.menuItems.push(newItem)
        return newItem
      },
    },
    Deal: {
      filter: async (params) => {
        await delay(300)
        let deals = mockData.deals

        if (params.is_active !== undefined) {
          deals = deals.filter(deal => deal.is_active === params.is_active)
        }
        if (params.is_featured !== undefined) {
          deals = deals.filter(deal => deal.is_featured === params.is_featured)
        }

        return deals
      },
    },
    Review: {
      filter: async (params) => {
        await delay(300)
        let reviews = mockData.reviews

        if (params.approved !== undefined) {
          reviews = reviews.filter(review => review.approved === params.approved)
        }
        if (params.is_featured !== undefined) {
          reviews = reviews.filter(review => review.is_featured === params.is_featured)
        }

        return reviews
      },
    },
    Order: {
      create: async (data) => {
        await delay(500)
        const newOrder = { ...data, id: Date.now().toString() }
        mockData.orders.push(newOrder)
        return newOrder
      },
    },
  },
  integrations: {
    Core: {
      SendEmail: async (params) => {
        await delay(500)
        console.log('Email sent:', params)
        return { success: true }
      },
    },
  },
}

// Initialize with some sample data
mockData.menuItems = [
  {
    id: "1",
    name: "Klassische Currywurst",
    description: "Saftige Bratwurst mit hausgemachter Curry-Sauce und frischen Zwiebeln",
    category: "wurst",
    price: 5.90,
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    is_popular: true,
    is_available: true,
    allergens: ["Gluten", "Senf"],
    spice_level: "medium"
  },
  {
    id: "2",
    name: "Schnitzel XXL",
    description: "Riesiges Schnitzel, handpaniert und butterweich gebraten",
    category: "schnitzel",
    price: 12.90,
    image_url: "https://images.unsplash.com/photo-1558030089-4729e972af5b?w=600&q=80",
    is_popular: true,
    is_available: true,
    allergens: ["Gluten", "Ei"],
    spice_level: "mild"
  },
  {
    id: "3",
    name: "Knusprige Pommes",
    description: "Handgeschnittene Pommes, frisch und super knusprig",
    category: "pommes",
    price: 3.50,
    image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
    is_popular: true,
    is_available: true,
    allergens: [],
    spice_level: "mild"
  },
]

mockData.deals = [
  {
    id: "1",
    title: "Lunch-Deal",
    description: "Currywurst + Pommes + Getränk nur 9,90€",
    discount_text: "20% SPAREN",
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
    valid_from: "2024-01-01",
    valid_until: "2025-12-31",
    is_active: true,
    is_featured: true,
    terms: "Gültig Mo-Fr von 11:00-14:00 Uhr"
  },
]

mockData.reviews = [
  {
    id: "1",
    customer_name: "Thomas M.",
    rating: 5,
    comment: "Die beste Currywurst der Stadt! Komme seit Jahren hierher und wurde noch nie enttäuscht.",
    is_featured: true,
    approved: true
  },
  {
    id: "2",
    customer_name: "Lisa K.",
    rating: 5,
    comment: "Mega lecker und super freundliches Personal. Die Pommes sind der Hammer!",
    is_featured: true,
    approved: true
  },
  {
    id: "3",
    customer_name: "Michael R.",
    rating: 5,
    comment: "Authentisch, lecker und immer frisch. Absolut empfehlenswert!",
    is_featured: true,
    approved: true
  },
]
