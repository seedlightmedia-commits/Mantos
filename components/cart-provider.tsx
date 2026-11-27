
'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from 'react'

import type { Product } from '@/data/products'
import { formatPrice } from '@/data/products'
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp-order'
import { getActiveOffer, getPromo, tierText } from '@/lib/promo'

type CartLine = {
  key: string
  product: Product
  size: string
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  add: (product: Product, size: string, quantity: number) => void
  remove: (key: string) => void
  update: (key: string, quantity: number) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  // Recuperar carrito guardado.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('mantos-cart')

      if (saved) {
        setLines(JSON.parse(saved) as CartLine[])
      }
    } catch {
      window.localStorage.removeItem('mantos-cart')
    }

    setReady(true)
  }, [])

  // Guardar cambios del carrito.
  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(
        'mantos-cart',
        JSON.stringify(lines)
      )
    }
  }, [lines, ready])

  const value = useMemo<CartContextValue>(() => ({
    lines,
    open,
    setOpen,

    count: lines.reduce(
      (total, line) => total + line.quantity,
      0
    ),

    subtotal: lines.reduce(
      (total, line) =>
        total + line.product.price * line.quantity,
      0
    ),

    add: (product, size, quantity) =>
      setLines((current) => {
        const key = `${product.id}-${size}`
        const existing = current.find(
          (line) => line.key === key
        )

        if (existing) {
          return current.map((line) =>
            line.key === key
              ? {
                  ...line,
                  quantity: line.quantity + quantity,
                }
              : line
          )
        }

        return [
          ...current,
          { key, product, size, quantity },
        ]
      }),

    remove: (key) =>
      setLines((current) =>
        current.filter((line) => line.key !== key)
      ),

    update: (key, quantity) =>
      setLines((current) =>
        quantity <= 0
          ? current.filter((line) => line.key !== key)
          : current.map((line) =>
              line.key === key
                ? { ...line, quantity }
                : line
            )
      ),
  }), [lines, open])

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return value
}

// Estilo de los letreros de promociones.
function bannerStyle(
  blackFriday: boolean,
  big: boolean
): CSSProperties {
  const base: CSSProperties = {
    padding: big ? '12px' : '8px 10px',
    marginBottom: 6,
    lineHeight: 1.4,
    fontSize: big ? 13 : 11,
  }

  if (blackFriday) {
    return big
      ? {
          ...base,
          background: '#e10600',
          color: 'var(--ivory)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          fontWeight: 600,
        }
      : {
          ...base,
          background: '#111',
          color: 'var(--ivory)',
          borderLeft: '4px solid #e10600',
        }
  }

  return big
    ? {
        ...base,
        background: 'var(--ink)',
        color: 'var(--ivory)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        fontWeight: 600,
      }
    : {
        ...base,
        border: '1px solid var(--line)',
        background: 'var(--beige)',
      }
}

// Promociones y progreso.
// Se muestran debajo del resumen de precios.
function CartOffers({ count }: { count: number }) {
  const { source, tiers } = getActiveOffer()

  if (tiers.length === 0) return null

  const promo = getPromo(count, 0)
  const blackFriday = source === 'black-friday'
  const accent = blackFriday ? '#e10600' : 'var(--ink)'
  const steps = Math.max(
    ...tiers.map((tier) => tier.from)
  )

  return (
    <div style={{ padding: '8px 0 10px' }}>
      {blackFriday && (
        <div
          className="eyebrow"
          style={{
            color: '#e10600',
            marginBottom: 7,
          }}
        >
          BLACK FRIDAY
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 8,
        }}
      >
        {Array.from(
          { length: steps },
          (_, index) => index + 1
        ).map((step) => {
          const tier = tiers.find(
            (item) => item.from === step
          )

          return (
            <div key={step} style={{ flex: 1 }}>
              <div
                style={{
                  height: 5,
                  background:
                    count >= step ? accent : '#cfc9c0',
                }}
              />

              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginTop: 3,
                  opacity: 0.7,
                  textAlign: 'center',
                  minHeight: 11,
                }}
              >
                {tier
                  ? `${step} · ${tier.percent}%${
                      tier.freeShippingBogota
                        ? ' + envío'
                        : ''
                    }`
                  : ''}
              </div>
            </div>
          )
        })}
      </div>

      {tiers
        .filter((tier) => tier.message)
        .map((tier) => (
          <div
            key={tier.from}
            style={bannerStyle(
              blackFriday,
              !!tier.big
            )}
          >
            {count >= tier.from ? '✓ ' : ''}
            {tierText(tier)}
          </div>
        ))}

      {promo.nudge && (
        <p
          style={{
            margin: '6px 0 0',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {promo.nudge}
        </p>
      )}
    </div>
  )
}

// Bolsa de compras.
function CartDrawer() {
  const {
    lines,
    count,
    open,
    setOpen,
    subtotal,
    remove,
    update,
  } = useCart()

  const promo = getPromo(count, subtotal)

  if (!open) return null

  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setOpen(false)
        }
      }}
    >
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100dvh',
          maxHeight: '100dvh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
        }}
      >
        {/* ENCABEZADO */}
        <div className="drawer-head">
          <h2 id="cart-title">
            TU BOLSA <span>({count})</span>
          </h2>

          <button
            className="icon-button dark-icon"
            aria-label="Cerrar bolsa"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>
              Tu bolsa está esperando una historia.
            </p>

            <button
              className="text-link"
              onClick={() => setOpen(false)}
            >
              CONTINUAR COMPRANDO <span>→</span>
            </button>
          </div>
        ) : (
          <>
            {/* LISTA DE PRENDAS */}
            <div
              className="cart-lines"
              style={{
                flex: '0 1 auto',
                minHeight: 120,
                maxHeight: '42dvh',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
              }}
            >
              {lines.map((line) => (
                <article
                  className="cart-line"
                  key={line.key}
                >
                  <img
                    src={line.product.images.front}
                    alt={line.product.name}
                  />

                  <div className="cart-line-info">
                    <h3>{line.product.name}</h3>

                    <p>Talla {line.size}</p>

                    <div className="cart-quantity">
                      <button
                        aria-label="Disminuir cantidad"
                        onClick={() =>
                          update(
                            line.key,
                            line.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{line.quantity}</span>

                      <button
                        aria-label="Aumentar cantidad"
                        onClick={() =>
                          update(
                            line.key,
                            line.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-line-price">
                    <span>
                      {formatPrice(
                        line.product.price * line.quantity
                      )}
                    </span>

                    <button
                      className="remove-link"
                      onClick={() => remove(line.key)}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* RESUMEN FIJO EN LA PARTE INFERIOR */}
            <div
              className="cart-bottom"
              style={{
                flexShrink: 0,
                borderTop: '1px solid var(--line)',
                paddingTop: 12,
              }}
            >
              {/* SUBTOTAL ORIGINAL */}
              <div className="subtotal-row">
                <span>Subtotal</span>

                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              {/* DESCUENTO */}
              {promo.discount > 0 && (
                <div
                  className="subtotal-row"
                  style={{ marginTop: 8 }}
                >
                  <span>
                    {promo.label} ({promo.percent}%)
                  </span>

                  <strong
                    style={{ color: '#e10600' }}
                  >
                    −{formatPrice(promo.discount)}
                  </strong>
                </div>
              )}

              {/* TOTAL FINAL */}
              <div
                className="subtotal-row"
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: '1px solid var(--line)',
                }}
              >
                <strong>TOTAL</strong>

                <strong style={{ fontSize: 18 }}>
                  {formatPrice(promo.total)}
                </strong>
              </div>

              {/* ENVÍO GRATIS */}
              {promo.freeShippingBogota && (
                <div
                  style={{
                    marginTop: 10,
                    padding: '8px 10px',
                    background: '#e6dfd4',
                    color: '#514238',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  ✓ ENVÍO GRATIS EN BOGOTÁ

                  <span
                    style={{
                      display: 'block',
                      marginTop: 3,
                      fontWeight: 400,
                      letterSpacing: 0,
                    }}
                  >
                    Para otras ciudades, el envío se cotiza
                    por separado.
                  </span>
                </div>
              )}

              {/* LETREROS DE PROMOCIÓN */}
              <CartOffers count={count} />

              {/* BOTÓN WHATSAPP */}
              <button
                className="button button-dark full-width"
                onClick={() =>
                  window.open(
                    buildWhatsAppOrderUrl(lines),
                    '_blank'
                  )
                }
              >
                FINALIZAR COMPRA <span>→</span>
              </button>

              <button
                className="text-link continue-link"
                onClick={() => setOpen(false)}
              >
                CONTINUAR COMPRANDO
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
