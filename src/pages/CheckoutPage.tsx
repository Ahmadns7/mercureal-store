import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../lib/products'
import { formatNaira } from '../lib/format'
import { cartTotal, placeOrder, type Order } from '../lib/cart'
import { useCart } from '../App'

export default function CheckoutPage() {
  const { cart, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const [paying, setPaying] = useState(false)
  const prices = Object.fromEntries(products.map((p) => [p.id, p.price]))
  const total = cartTotal(cart, prices)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.name && form.address && form.phone

  if (cart.length === 0) return <p className="py-10 text-center text-stone-500">Cart is empty</p>

  const pay = () => {
    setPaying(true)
    // simulated Paystack-style step, demo only
    setTimeout(() => {
      const order: Order = placeOrder({ ...form, items: cart, total })
      clear()
      navigate(`/order/${order.number}`, { replace: true })
    }, 1500)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Checkout</h1>
      <div className="mb-4 rounded-2xl border border-yellow-600/40 bg-yellow-900/20 p-3 text-xs text-yellow-300">
        Demo checkout — no real money moves, no payment keys involved.
      </div>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input value={form.name} onChange={set('name')} placeholder="Full name" className="w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 outline-none focus:border-emerald-500" data-testid="name" />
        <input value={form.address} onChange={set('address')} placeholder="Delivery address" className="w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 outline-none focus:border-emerald-500" data-testid="address" />
        <input value={form.phone} onChange={set('phone')} placeholder="Phone number" inputMode="tel" className="w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 outline-none focus:border-emerald-500" data-testid="phone" />
      </form>
      <div className="mt-4 flex items-center justify-between border-t border-stone-800 pt-4 text-lg font-bold">
        <span>Pay</span>
        <span data-testid="checkout-total">{formatNaira(total)}</span>
      </div>
      <button
        onClick={pay}
        disabled={!valid || paying}
        className="mt-3 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-stone-950 disabled:opacity-40 active:scale-[0.98]"
        data-testid="pay"
      >
        {paying ? 'Processing payment…' : 'Pay now'}
      </button>
    </div>
  )
}
