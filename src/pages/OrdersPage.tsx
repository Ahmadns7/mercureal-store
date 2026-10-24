import { Link } from 'react-router-dom'
import { loadOrders } from '../lib/cart'
import { formatNaira } from '../lib/format'

export default function OrdersPage() {
  const orders = loadOrders()
  if (orders.length === 0)
    return <p className="py-10 text-center text-stone-500">No orders yet. <Link to="/" className="text-emerald-400">Shop</Link></p>

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Order history</h1>
      {orders.map((o) => (
        <Link key={o.number} to={`/order/${o.number}`} className="mb-3 block rounded-2xl border border-stone-800 bg-stone-900 p-3">
          <div className="flex justify-between text-sm">
            <span className="font-mono text-emerald-400">{o.number}</span>
            <span className="font-semibold">{formatNaira(o.total)}</span>
          </div>
          <div className="mt-1 text-xs text-stone-500">
            {new Date(o.placedAt).toLocaleString()} · {o.items.reduce((s, i) => s + i.qty, 0)} item(s)
          </div>
        </Link>
      ))}
    </div>
  )
}
