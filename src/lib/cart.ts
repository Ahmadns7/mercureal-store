export type CartItem = { id: string; qty: number }
export type Cart = CartItem[]

const KEY = 'mercureal-store-cart'

export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((i) => typeof i?.id === 'string' && Number.isInteger(i?.qty) && i.qty > 0)
  } catch {
    return []
  }
}

export function saveCart(cart: Cart) {
  localStorage.setItem(KEY, JSON.stringify(cart))
}

export function addToCart(cart: Cart, id: string, qty = 1): Cart {
  const existing = cart.find((i) => i.id === id)
  if (existing) {
    return cart.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
  }
  return [...cart, { id, qty }]
}

export function setQty(cart: Cart, id: string, qty: number): Cart {
  if (qty <= 0) return cart.filter((i) => i.id !== id)
  return cart.map((i) => (i.id === id ? { ...i, qty } : i))
}

export function removeFromCart(cart: Cart, id: string): Cart {
  return cart.filter((i) => i.id !== id)
}

export function cartCount(cart: Cart): number {
  return cart.reduce((sum, i) => sum + i.qty, 0)
}

export function cartTotal(cart: Cart, prices: Record<string, number>): number {
  return cart.reduce((sum, i) => sum + i.qty * (prices[i.id] ?? 0), 0)
}

export type Order = {
  number: string
  placedAt: string
  items: CartItem[]
  total: number
  name: string
  address: string
  phone: string
}

const ORDERS_KEY = 'mercureal-store-orders'

export function placeOrder(order: Omit<Order, 'number' | 'placedAt'>): Order {
  const full: Order = {
    ...order,
    number: 'MR' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    placedAt: new Date().toISOString(),
  }
  const orders = loadOrders()
  orders.unshift(full)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  return full
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
