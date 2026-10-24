export type Product = {
  id: string
  name: string
  price: number
  category: string
  emoji: string
  description: string
}

export const products: Product[] = [
  { id: 'p1', name: 'Ankara Tote Bag', price: 12500, category: 'Fashion', emoji: '👜', description: 'Handmade ankara-print tote, lined, roomy enough for a laptop.' },
  { id: 'p2', name: 'Bluetooth Earbuds', price: 24900, category: 'Electronics', emoji: '🎧', description: 'TWS earbuds, 24h battery with case, touch controls.' },
  { id: 'p3', name: 'Adire Throw Pillow', price: 6800, category: 'Home', emoji: '🛋️', description: 'Adire-dyed cotton cover, 45x45cm, insert included.' },
  { id: 'p4', name: 'Power Bank 20000mAh', price: 17900, category: 'Electronics', emoji: '🔋', description: 'Fast-charge power bank with dual USB-A and one USB-C port.' },
  { id: 'p5', name: 'Kente Phone Pouch', price: 4200, category: 'Fashion', emoji: '📱', description: 'Woven kente phone pouch with drawstring closure.' },
  { id: 'p6', name: 'Shea Butter 250g', price: 3500, category: 'Beauty', emoji: '🧴', description: 'Raw unrefined shea butter from northern Nigeria.' },
  { id: 'p7', name: 'Espresso Cup Set', price: 9200, category: 'Home', emoji: '☕', description: 'Set of 4 hand-glazed ceramic espresso cups.' },
  { id: 'p8', name: 'Desk LED Lamp', price: 15400, category: 'Electronics', emoji: '💡', description: 'Rechargeable LED desk lamp, 3 color temps, touch dimmer.' },
  { id: 'p9', name: 'Spice Gift Box', price: 8100, category: 'Food', emoji: '🌶️', description: 'Six-northern-spice sampler: suya, yaji, kanwa and more.' },
  { id: 'p10', name: 'Leather Slippers', price: 11500, category: 'Fashion', emoji: '🥿', description: 'Hand-stitched calf leather slippers, Kano made.' },
  { id: 'p11', name: 'Plantain Chips Pack', price: 1500, category: 'Food', emoji: '🍌', description: 'Crispy salted plantain chips, 6 x 50g packs.' },
  { id: 'p12', name: 'Woven Storage Basket', price: 9900, category: 'Home', emoji: '🧺', description: 'Handwoven elephant grass basket with lid.' },
]

export const categories = [...new Set(products.map((p) => p.category))].sort()
