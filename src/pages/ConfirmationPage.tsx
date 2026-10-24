import { Link, useParams } from 'react-router-dom'
import { loadOrders } from '../lib/cart'
import { formatNaira } from '../lib/format'

export default function ConfirmationPage() {
  const { number } = useParams()
  const order = loadOrders().find((o) => o.number === number)

  if (!order) return <p className="py-10 text-center text-stone-500">Order not found</p>

  return (
    <div className="text-center">
      <div className="py-8 text-5xl">✅</div>
      <h1 className="text-xl font-bold">Order confirmed</h1>
      <p className="mt-1 text-stone-400">Order <span className="font-mono text-emerald-400">{order.number}</span></p>
      <p className="mt-1 text-lg font-semibold">{formatNaira(order.total)}</p>
      <p className="mt-3 text-sm text-stone-400">Deliver to {order.name}, {order.address}</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-stone-950">Keep shopping</Link>
        <Link to="/orders" className="flex-1 rounded-xl border border-stone-700 py-3 font-semibold">My orders</Link>
      </div>
    </div>
  )
}
