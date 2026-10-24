import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../lib/products'
import { formatNaira } from '../lib/format'
import { useCart } from '../App'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()
  const navigate = useNavigate()

  if (!product) return <p className="py-10 text-center text-stone-500">Product not found</p>

  return (
    <div>
      <div className="mb-4 flex h-48 items-center justify-center rounded-2xl bg-stone-900 text-7xl">{product.emoji}</div>
      <h1 className="text-xl font-bold">{product.name}</h1>
      <div className="mt-1 text-lg text-emerald-400">{formatNaira(product.price)}</div>
      <p className="mt-3 text-sm text-stone-400">{product.description}</p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => addItem(product.id)}
          className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-stone-950 active:scale-[0.98]"
        >
          Add to cart
        </button>
        <button
          onClick={() => {
            addItem(product.id)
            navigate('/cart')
          }}
          className="flex-1 rounded-xl border border-emerald-500 py-3 font-semibold text-emerald-400 active:scale-[0.98]"
        >
          Buy now
        </button>
      </div>
    </div>
  )
}
