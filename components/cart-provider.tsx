'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/data/products'
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp-order'

type CartLine = { key: string; product: Product; size: string; quantity: number }
type CartContextValue = { lines: CartLine[]; count: number; subtotal: number; add: (product: Product, size: string, quantity: number) => void; remove: (key: string) => void; update: (key: string, quantity: number) => void; open: boolean; setOpen: (open: boolean) => void }
const CartContext = createContext<CartContextValue | null>(null)


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    try { const saved = window.localStorage.getItem('mantos-cart'); if (saved) setLines(JSON.parse(saved) as CartLine[]) } catch { window.localStorage.removeItem('mantos-cart') }
    setReady(true)
  }, [])
  useEffect(() => { if (ready) window.localStorage.setItem('mantos-cart', JSON.stringify(lines)) }, [lines, ready])
  const value = useMemo<CartContextValue>(() => ({
    lines, open, setOpen,
    count: lines.reduce((total, line) => total + line.quantity, 0),
    subtotal: lines.reduce((total, line) => total + line.product.price * line.quantity, 0),
    add: (product, size, quantity) => setLines((current) => {
      const key = `${product.id}-${size}`
      const existing = current.find((line) => line.key === key)
      return existing ? current.map((line) => line.key === key ? { ...line, quantity: line.quantity + quantity } : line) : [...current, { key, product, size, quantity }]
    }),
    remove: (key) => setLines((current) => current.filter((line) => line.key !== key)),
    update: (key, quantity) => setLines((current) => current.map((line) => line.key === key ? { ...line, quantity: Math.max(1, quantity) } : line)),
  }), [lines, open])
  return <CartContext.Provider value={value}>{children}<CartDrawer /></CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside CartProvider')
  return value
}

function CartDrawer() {
  const { lines, open, setOpen, subtotal, remove, update } = useCart()
  if (!open) return null
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-head"><h2 id="cart-title">TU BOLSA <span>({lines.reduce((sum, line) => sum + line.quantity, 0)})</span></h2><button className="icon-button dark-icon" aria-label="Cerrar bolsa" onClick={() => setOpen(false)}>×</button></div>
      {lines.length === 0 ? <div className="cart-empty"><p>Tu bolsa está esperando una historia.</p><button className="text-link" onClick={() => setOpen(false)}>CONTINUAR COMPRANDO <span>→</span></button></div> : <>
        <div className="cart-lines">{lines.map((line) => <article className="cart-line" key={line.key}>
          <img src={line.product.images.front} alt={line.product.name} />
          <div className="cart-line-info"><h3>{line.product.name}</h3><p>Talla {line.size}</p><div className="cart-quantity"><button aria-label="Disminuir cantidad" onClick={() => update(line.key, line.quantity - 1)}>−</button><span>{line.quantity}</span><button aria-label="Aumentar cantidad" onClick={() => update(line.key, line.quantity + 1)}>+</button></div></div>
          <div className="cart-line-price"><span>{formatPrice(line.product.price * line.quantity)}</span><button className="remove-link" onClick={() => remove(line.key)}>Eliminar</button></div>
        </article>)}</div>
        <div className="cart-bottom"><div className="subtotal-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Envío calculado al finalizar la compra.</p><button className="button button-dark full-width" onClick={() => window.open(buildWhatsAppOrderUrl(lines), '_blank')}>FINALIZAR COMPRA <span>→</span></button><button className="text-link continue-link" onClick={() => setOpen(false)}>CONTINUAR COMPRANDO</button></div>
      </>}
    </aside>
  </div>
}

import { formatPrice } from '@/data/products'
