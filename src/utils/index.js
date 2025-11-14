import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName) {
  const routes = {
    Home: "/",
    Menu: "/menu",
    Deals: "/deals",
    About: "/about",
    FAQ: "/faq",
    Contact: "/contact",
    Legal: "/legal",
    NotFound: "/404",
    ServiceUnavailable: "/503",
  }
  return routes[pageName] || "/"
}
