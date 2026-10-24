import { Link } from 'react-router-dom'
import { products } from '../lib/products'
import { formatNaira } from '../lib/format'
import { cartTotal } from '../lib/cart'
import { useCart } from '../App'

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart()
  const prices = Object.fromEntries(products.map((p) => [p.id, p.price]))
  const items = cart
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id)! }))
    .filter((i) => i.product)

  if (items.length === 0) return <p className="py-10 text-center text-stone-500">Cart is empty. <Link to="/" className="text-emerald-400">Shop</Link></p>

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Your cart</h1>
      {items.map(({ product, qty }) => (
        <div key={product.id} className="mb-3 flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-900 p-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-stone-800 text-2xl">{product.emoji}</div>
          <div className="flex-1">
            <div className="text-sm font-medium">{product.name}</div>
            <div className="text-sm text-emerald-400">{formatNaira(product.price)}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => updateQty(product.id, qty - 1)} className="h-8 w-8 rounded-lg bg-stone-800" data-testid={`dec-${product.id}`}>−</button>
            <span className="w-6 text-center" data-testid={`qty-${product.id}`}>{qty}</span>
            <button onClick={() => updateQty(product.id, qty + 1)} className="h-8 w-8 rounded-lg bg-stone-800" data-testid={`inc-${product.id}`}>+</button>
          </div>
          <button onClick={() => removeItem(product.id)} className="ml-1 text-xs text-red-400">remove</button>
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span data-testid="cart-total">{formatNaira(cartTotal(cart, prices))}</span>
      </div>
      <Link
        to="/checkout"
        className="mt-4 block rounded-xl bg-emerald-500 py-3 text-center font-semibold text-stone-950 active:scale-[0.98]"
      >
        Checkout
      </Link>
    </div>
  )
}
