import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../lib/products'
import { formatNaira } from '../lib/format'

export default function Home() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const visible = products.filter(
    (p) =>
      (cat === 'All' || p.category === cat) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        className="mb-3 w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-base outline-none focus:border-emerald-500"
        data-testid="search"
      />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
              cat === c ? 'bg-emerald-500 font-semibold text-stone-950' : 'bg-stone-800 text-stone-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {visible.map((p) => (
          <Link
            key={p.id}
            to={`/p/${p.id}`}
            className="rounded-2xl border border-stone-800 bg-stone-900 p-3 active:scale-[0.98]"
          >
            <div className="mb-2 flex h-24 items-center justify-center rounded-xl bg-stone-800 text-4xl">{p.emoji}</div>
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-sm text-emerald-400">{formatNaira(p.price)}</div>
          </Link>
        ))}
      </div>
      {visible.length === 0 && <p className="py-10 text-center text-stone-500">Nothing matches that</p>}
    </div>
  )
}
