import { describe, it, expect } from 'vitest'
import { addToCart, setQty, removeFromCart, cartCount, cartTotal } from './cart'

const prices = { p1: 12500, p2: 24900 }

describe('cart logic', () => {
  it('adds new item', () => {
    expect(addToCart([], 'p1')).toEqual([{ id: 'p1', qty: 1 }])
  })

  it('increments existing item instead of duplicating', () => {
    const cart = addToCart([{ id: 'p1', qty: 2 }], 'p1')
    expect(cart).toEqual([{ id: 'p1', qty: 3 }])
  })

  it('sets quantity and removes at zero', () => {
    let cart = addToCart([], 'p1')
    cart = setQty(cart, 'p1', 5)
    expect(cartCount(cart)).toBe(5)
    cart = setQty(cart, 'p1', 0)
    expect(cart).toEqual([])
  })

  it('removes item', () => {
    const cart = addToCart(addToCart([], 'p1'), 'p2')
    expect(removeFromCart(cart, 'p1')).toEqual([{ id: 'p2', qty: 1 }])
  })

  it('totals with naira prices', () => {
    const cart = [
      { id: 'p1', qty: 2 },
      { id: 'p2', qty: 1 },
    ]
    expect(cartTotal(cart, prices)).toBe(49900)
  })

  it('ignores unknown ids in total', () => {
    expect(cartTotal([{ id: 'nope', qty: 3 }], prices)).toBe(0)
  })
})
