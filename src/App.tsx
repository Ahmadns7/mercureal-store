import { createContext, useContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

import { loadCart, saveCart, cartCount, addToCart, setQty, removeFromCart, type Cart } from './lib/cart'

type CartCtx = {
  cart: Cart
  addItem: (id: string, qty?: number) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartCtx>(null!)
export const useCart = () => useContext(CartContext)

export default function App() {
  const [cart, setCart] = useState<Cart>(() => loadCart())
  const navigate = useNavigate()

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const ctx: CartCtx = {
    cart,
    addItem: (id, qty = 1) => setCart((c) => addToCart(c, id, qty)),
    updateQty: (id, qty) => setCart((c) => setQty(c, id, qty)),
    removeItem: (id) => setCart((c) => removeFromCart(c, id)),
    clear: () => setCart([]),
  }

  return (
    <CartContext.Provider value={ctx}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-800 bg-stone-950/90 px-4 py-3 backdrop-blur">
          <Link to="/" className="text-lg font-bold tracking-tight text-emerald-400">
            MercuReal<span className="text-stone-100"> Store</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/orders" className="text-stone-400 hover:text-stone-100">Orders</NavLink>
            <button
              onClick={() => navigate('/cart')}
              className="rounded-full bg-emerald-500 px-3 py-1 font-semibold text-stone-950"
              data-testid="cart-count"
            >
              🛒 {cartCount(cart)}
            </button>
          </nav>
        </header>
        <main className="flex-1 px-4 py-4">
          <Outlet />
        </main>
        <footer className="border-t border-stone-800 px-4 py-3 text-center text-xs text-stone-500">
          Demo store · no real payments · MercuReal Tech Solutions
        </footer>
      </div>
    </CartContext.Provider>
  )
}
