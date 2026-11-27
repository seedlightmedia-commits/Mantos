'use client'

import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { Camera, Menu, ShoppingBag, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/data/products'
import { formatPrice, getCollection } from '@/data/products'
import { useCart } from '@/components/cart-provider'
import { BLACK_FRIDAY, tierSummary, useBlackFriday } from '@/lib/promo'

// Mensaje que aparece escrito automáticamente cuando alguien abre el WhatsApp de MANTOS.
// Puedes cambiar el texto entre comillas.
const WHATSAPP_MESSAGE = 'Hola MANTOS 👋 Me gustaría saber más sobre sus prendas.'
const WHATSAPP_URL = `https://wa.me/573114769412?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// ---------------------------------------------------------------------------
// BLACK FRIDAY: letreros negro y rojo en cada producto
// Se encienden y apagan solos por fecha (el interruptor está en lib/promo.ts).
// Esto es lo ÚNICO que desaparece al terminar: los avisos de la bolsa siguen.
// ---------------------------------------------------------------------------
const blackFridayBadgeStyle: CSSProperties = {
  position: 'absolute', top: 12, left: 12, zIndex: 3, pointerEvents: 'none',
  display: 'inline-flex', alignItems: 'center', gap: 6,
  background: '#111', color: 'var(--ivory)', border: '1px solid #e10600',
  padding: '6px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
  animation: 'bf-pulse 1.8s infinite',
}

function BlackFridayStyles() {
  const live = useBlackFriday()
  if (!live) return null
  return <style>{`@keyframes bf-pulse { 0% { box-shadow: 0 0 0 0 rgba(225,6,0,.65) } 70% { box-shadow: 0 0 0 10px rgba(225,6,0,0) } 100% { box-shadow: 0 0 0 0 rgba(225,6,0,0) } }`}</style>
}

function BlackFridayBadge() {
  const live = useBlackFriday()
  if (!live) return null
  const percent = BLACK_FRIDAY.tiers[0]?.percent
  return <span style={blackFridayBadgeStyle}>BLACK <span style={{ color: '#ff3b30' }}>FRIDAY</span>{percent ? <span style={{ background: '#e10600', color: 'var(--ivory)', padding: '2px 6px' }}>-{percent}%</span> : null}</span>
}

// Letrero informativo completo: conserva los tres niveles de Black Friday.
function BlackFridayInfo() {
  const live = useBlackFriday()
  if (!live) return null

  const tiers = [...BLACK_FRIDAY.tiers].sort((a, b) => a.from - b.from)
  const last = tiers[tiers.length - 1]

  return (
    <div
      style={{
        background: '#111',
        color: 'var(--ivory)',
        borderLeft: '3px solid #e10600',
        padding: '12px 14px',
        margin: '14px 0',
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <strong
        style={{
          display: 'block',
          color: '#ff3b30',
          letterSpacing: '0.16em',
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        BLACK FRIDAY
      </strong>
      {tiers.map((tier) => (
        <div key={tier.from}>
          {tier === last && tiers.length > 1
            ? `${tier.from} o más`
            : `${tier.from} ${tier.from === 1 ? 'prenda' : 'prendas'}`}
          : {tierSummary(tier)}
        </div>
      ))}
    </div>
  )
}

export function Header() {
  const { count, setOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 45); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll) }, [])
  const links = <><Link href="/men" onClick={() => setMenuOpen(false)}>MEN</Link><Link href="/women" onClick={() => setMenuOpen(false)}>WOMEN</Link></>
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <BlackFridayStyles />
    <nav className="nav-side nav-left" aria-label="Colecciones">{links}</nav>
    <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    <Link className="wordmark" href="/" aria-label="MANTOS, inicio">MANTOS</Link>
    <div className="nav-side nav-right"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">CONTACT</a><a className="social-link" href="https://www.instagram.com/somosmantos/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera /></a><button className="bag-button" onClick={() => setOpen(true)} aria-label={`Abrir bolsa, ${count} productos`}><ShoppingBag /><span>{count}</span></button></div>
    {menuOpen && <div className="mobile-menu-panel">{links}<a href={WHATSAPP_URL} target="_blank" rel="noreferrer">CONTACT</a><button onClick={() => { setOpen(true); setMenuOpen(false) }}>SHOPPING BAG ({count})</button></div>}
  </header>
}

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><Link href={`/product/${product.slug}`} className="product-image-wrap" aria-label={`Ver ${product.name}`}>
    <BlackFridayBadge />
    <img className="card-front" src={product.images.front} alt={`${product.name}, vista frontal`} loading="lazy" />
    <img className="card-back" src={product.images.back || product.images.front} alt={`${product.name}, vista posterior`} loading="lazy" />
    <span className="quick-view">VER PRENDA <ArrowRight size={14} /></span>
  </Link><div className="product-meta"><div><Link href={`/product/${product.slug}`} className="product-name">{product.name}</Link><span className="product-caption">{product.category === 'jacket' ? 'DENIM COLLECTION' : 'PRIMERA COLECCIÓN'}</span></div><span className="product-price">{formatPrice(product.price)}</span></div></article>
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}

export function HomeCollections() {
  const [collection, setCollection] = useState<'men' | 'women'>('men')
  const items = getCollection(collection).filter((product) => product.category === 't-shirt')
  return <section className="first-edition" id="collection">
    <div className="section-heading"><div><span className="eyebrow">COLECCIÓN 001 · 2026</span><h2>THE FIRST EDITION</h2></div><div className="collection-tabs" role="tablist" aria-label="Seleccionar colección"><button role="tab" aria-selected={collection === 'men'} className={collection === 'men' ? 'active' : ''} onClick={() => setCollection('men')}>MEN</button><button role="tab" aria-selected={collection === 'women'} className={collection === 'women' ? 'active' : ''} onClick={() => setCollection('women')}>WOMEN</button></div></div>
    <ProductGrid products={items} />
  </section>
}

export function CollectionPage({ collection }: { collection: 'men' | 'women' }) {
  const [selected, setSelected] = useState<'men' | 'women'>(collection)
  const tshirts = getCollection(selected).filter((product) => product.category === 't-shirt')
  const jackets = getCollection('women').filter((product) => product.category === 'jacket')
  return <main className="collection-page"><div className="collection-intro"><span className="eyebrow">MANTOS — PRIMERA COLECCIÓN</span><h1>MANTOS {selected.toUpperCase()}</h1><p>{selected === 'women' ? 'La misma esencia. Otra expresión.' : 'Expresión, identidad y carácter.'}</p></div><div className="collection-controls"><div className="collection-tabs"><button className={selected === 'men' ? 'active' : ''} onClick={() => setSelected('men')}>MEN</button><button className={selected === 'women' ? 'active' : ''} onClick={() => setSelected('women')}>WOMEN</button></div><span>{String(tshirts.length + (selected === 'women' ? jackets.length : 0)).padStart(2, '0')} PIEZAS</span></div><ProductGrid products={tshirts} />{selected === 'women' && <section className="denim-section"><div className="section-heading denim-heading"><div><span className="eyebrow">PIEZAS INTERVENIDAS</span><h2>DENIM COLLECTION</h2></div><p>Una nueva forma de llevar lo extraordinario.</p></div><ProductGrid products={jackets} /></section>}</main>
}

export function ProductDetail({ product }: { product: Product }) {
  const { add, setOpen } = useCart()
  const blackFridayLive = useBlackFriday()
  const firstTierPercent = BLACK_FRIDAY.tiers[0]?.percent ?? 0
  const blackFridayUnitPrice = Math.round(
    product.price * (1 - firstTierPercent / 100)
  )
  const unitSavings = product.price - blackFridayUnitPrice
  const gallery = product.gallery
  const [active, setActive] = useState(0)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(false)
  const [sizeGuide, setSizeGuide] = useState(false)
  const [zoom, setZoom] = useState(false)
  return <main className="detail-page"><div className="breadcrumb"><Link href="/">INICIO</Link><span>/</span><Link href={`/${product.collection}`}>{product.collection.toUpperCase()}</Link><span>/</span><span>{product.name.toUpperCase()}</span></div><div className="detail-layout">
    <div className="gallery"><div className="gallery-main"><BlackFridayBadge /><img src={gallery[active].src} alt={`${product.name} — ${gallery[active].label.toLowerCase()}`} onClick={() => setZoom(true)} /><span className="image-label">{gallery[active].label}</span><button className="gallery-arrow prev" aria-label="Imagen anterior" onClick={() => setActive((active + gallery.length - 1) % gallery.length)}><ChevronLeft /></button><button className="gallery-arrow next" aria-label="Siguiente imagen" onClick={() => setActive((active + 1) % gallery.length)}><ChevronRight /></button></div><div className="gallery-thumbs">{gallery.map((image, index) => <button key={`${image.label}-${index}`} className={active === index ? 'selected' : ''} onClick={() => setActive(index)} aria-label={`Ver imagen ${image.label.toLowerCase()}`}><img src={image.src} alt="" /><span>{image.label}</span></button>)}</div></div>
    <section className="product-info"><span className="eyebrow">{product.category === 'jacket' ? 'DENIM COLLECTION' : 'MANTOS — PRIMERA COLECCIÓN'}</span><h1>{product.name}</h1><div className="detail-price-block">
      <p className="detail-price">{formatPrice(product.price)} <span>COP</span></p>
      {blackFridayLive && firstTierPercent > 0 && (
        <div style={{ marginTop: 2, marginBottom: 10 }}>
          <p
            style={{
              margin: 0,
              fontSize: 25,
              lineHeight: 1.2,
              fontWeight: 700,
              color: '#e10600',
              letterSpacing: '-0.03em',
            }}
          >
            {formatPrice(blackFridayUnitPrice)}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)' }}>
            Ahorras {formatPrice(unitSavings)} por prenda
          </p>
        </div>
      )}
    </div>
    <BlackFridayInfo />
    <dl className="detail-specs"><div><dt>TIPO DE PRENDA</dt><dd>{product.garment}</dd></div><div><dt>MATERIAL</dt><dd>{product.material}</dd></div><div><dt>GRAMAJE</dt><dd>{product.weight || '—'}</dd></div></dl><div className="detail-rule" /><div className="size-title"><span>TALLA</span><button onClick={() => setSizeGuide(true)}>GUÍA DE TALLAS ↗</button></div><div className="size-options">{product.sizes.map((item) => <button key={item} className={size === item ? 'active' : ''} aria-pressed={size === item} onClick={() => { setSize(item); setError(false) }}>{item}</button>)}</div>{error && <p className="size-error" role="alert">Selecciona una talla antes de continuar.</p>}<div className="quantity-title">CANTIDAD</div><div className="quantity-stepper"><button aria-label="Disminuir cantidad" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button aria-label="Aumentar cantidad" onClick={() => setQuantity(quantity + 1)}>+</button></div><button className="button button-dark full-width add-button" onClick={() => { if (!size) { setError(true); return } add(product, size, quantity); setOpen(true) }}>AÑADIR AL CARRITO <ArrowRight size={16} /></button><p className="shipping-note">Envío a todo Colombia · Cambios fáciles</p><div className="product-accordions"><details open><summary>DESCRIPCIÓN</summary><p>{product.description}</p></details><details><summary>DETALLES DE LA PRENDA</summary><ul><li>Prenda: {product.garment}</li><li>Material: {product.material}</li>{product.weight && <li>Peso: {product.weight}</li>}<li>Fit: {product.fit}</li><li>Cuello: {product.neck}</li><li>Color: {product.color}</li><li>Colección: Primera colección MANTOS</li>{product.extraDetails.map((line) => <li key={line}>{line}</li>)}</ul>{product.images.material && <img className="material-guide" src={product.images.material} alt="Guía visual de material y camiseta" />}</details></div></section>
    </div>{sizeGuide && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSizeGuide(false) }}><section className="size-modal" role="dialog" aria-modal="true" aria-labelledby="size-title"><button className="modal-close" aria-label="Cerrar guía" onClick={() => setSizeGuide(false)}>×</button><span className="eyebrow">ENCUENTRA TU FIT</span><h2 id="size-title">GUÍA DE TALLAS</h2><p>Medidas aproximadas en centímetros.</p><table><thead><tr><th>TALLA</th><th>PECHO</th><th>LARGO</th></tr></thead><tbody>{product.sizes.map((item, index) => <tr key={item}><td>{item}</td><td>{[52, 55, 58, 61, 64][index] ?? 55}</td><td>{[68, 70, 72, 74, 76][index] ?? 70}</td></tr>)}</tbody></table><p className="size-modal-note">Si estás entre dos tallas, elige la más grande para un fit relajado.</p></section></div>}{zoom && <button className="zoom-view" aria-label="Cerrar imagen ampliada" onClick={() => setZoom(false)}><img src={gallery[active].src} alt={`${product.name} ampliada`} /><span>×</span></button>}</main>
}
