export type GalleryImage = { src: string; label: string }

export type Product = {
  id: string
  slug: string
  name: string
  category: 't-shirt' | 'jacket'
  collection: 'men' | 'women'
  price: number
  description: string
  material: string
  weight?: string
  fit: string
  color: string
  sizes: string[]
  images: { front: string; back: string; details?: string; material?: string }
  gallery: GalleryImage[] // todas las fotos del producto, en orden, con su etiqueta
  available: boolean
  featured: boolean
}

// ---------------------------------------------------------------------------
// FOTOS GENERALES
// ---------------------------------------------------------------------------
const assets = {
  hero: 'Portada1.webp',
  teeMaterial: 'GraciaDetalles.webp', // foto de material por defecto (si un diseño no tiene la suya)
}

// Convierte 'foto.webp' en '/foto.webp' para que cargue desde cualquier página.
// Los enlaces completos (https://...) se dejan como están.
const img = (src: string) =>
  src.startsWith('http') || src.startsWith('/') ? src : `/${src}`

// ---------------------------------------------------------------------------
// DISEÑOS
// Cada diseño tiene sus propias fotos para HOMBRE y para MUJER.
//   front  = foto principal (la que se ve en el catálogo)
//   back   = foto de espalda
//   material = foto de detalle/material de ese diseño (opcional)
//   extras = fotos adicionales (agrega todas las que quieras)
//   color (a nivel de diseño) = color de la prenda, ej. 'Arena', 'Marfil'
//
// Por ahora dejé las fotos que ya tenías para que la página no se rompa.
// Solo reemplaza el nombre de cada archivo por la foto correcta de cada diseño.
// Los archivos locales deben estar en la carpeta /public.
// ---------------------------------------------------------------------------
type DesignPhotos = {
  front: string
  back: string
  material?: string // foto de detalle/material de ESTE diseño (si no pones, usa la general)
  extras?: string[]
}

type Design = {
  id: string
  name: string
  color?: string // color de este diseño (si no pones, usa 'Marfil')
  men: DesignPhotos
  women: DesignPhotos
}

const designs: Design[] = [
  {
    id: 'metanoia',
    name: 'Diseño 01 — Metanoia',
    color: 'Marfil', // cambiar si el color es otro
    men: {
      front: 'metanoiafrenteblanco.webp',
      back: 'metanoiaespaldablanco.webp',
      // material: 'metanoiadetalle.webp', // foto de material propia (opcional)
      extras: ['metanoiafrentehombre.webp', 'metanoiaespaldahombre.webp'],
    },
    women: {
      front: 'metanoiafrente.webp',
      back: 'metanoiaespalda.webp',
      extras: ['metanoiafrentestile.webp'],
    },
  },
  {
    id: 'sus-nombres',
    name: 'Diseño 02 — Sus nombres',
    color: 'Marfil',
    men: {
      front: 'nombresfrentehombre.webp',
      back: 'nombresespaldahombre.webp',
      extras: ['nombresdetalle.webp'],
    },
    women: {
      front: 'nombresfrente.webp',
      back: 'nombresespalda.webp',
      extras: [],
    },
  },
  {
    id: 'exodo',
    name: 'Diseño 03 — Exodo',
    color: 'Marfil',
    men: {
      front: 'Exodofrentehombre.png',
      back: 'Exodoespaldahombre.png',
      extras: [],
    },
    women: {
      front: 'Exodofrentemujer.png',
      back: 'Exodoespaldamujer.png',
      extras: [],
    },
  },
  {
    id: 'exodo-saco',
    name: 'Diseño 04 — Exodo saco',
    color: 'Marfil',
    men: {
      front: 'Exodofrentesaco.png',
      back: 'Exodoespaldasaco.png',
      extras: [],
    },
    women: {
      front: 'graciamujerfrente.webp', // PENDIENTE: foto frente mujer del diseño 04
      back: 'graciamujerespalda.webp', // PENDIENTE: foto espalda mujer del diseño 04
      extras: [],
    },
  },
]

// ---------------------------------------------------------------------------
// CONSTRUCTOR DE CAMISETAS (no necesitas tocar esto)
// ---------------------------------------------------------------------------
const tee = (design: Design, index: number, collection: 'men' | 'women'): Product => {
  const photos = design[collection]
  const extras = photos.extras ?? []

  return {
    id: `${design.id}-${collection}`,
    slug: `diseno-${String(index + 1).padStart(2, '0')}-${collection}`,
    name: design.name,
    category: 't-shirt',
    collection,
    price: 99000,
    description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
    material: '100% algodón',
    weight: '200 GSM',
    fit: 'Oversized / relaxed fit',
    color: design.color ?? 'Marfil',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: {
      front: img(photos.front),
      back: img(photos.back),
      details: img(extras[0] ?? photos.front),
      material: img(photos.material ?? assets.teeMaterial),
    },
    gallery: [
      { src: img(photos.front), label: 'FRONT' },
      { src: img(photos.back), label: 'BACK' },
      ...extras.map((src, i) => ({ src: img(src), label: extras.length > 1 ? `DETAIL ${i + 1}` : 'DETAIL' })),
      { src: img(photos.material ?? assets.teeMaterial), label: 'MATERIAL' },
    ],
    available: true,
    featured: true,
  }
}

// ---------------------------------------------------------------------------
// CHAQUETAS DENIM (sección "Denim, Reimagined" — mujer)
// Igual que las camisetas: front, back y las fotos extras que quieras.
// OJO: 'front' es la foto que se ve en el catálogo.
// ---------------------------------------------------------------------------
type Jacket = {
  id: string
  name: string
  description: string
  front: string
  back: string
  extras?: string[]
}

const jackets: Jacket[] = [
  {
    id: 'chaqueta-01-women',
    name: 'Chaqueta Denim 01',
    description: 'Denim con carácter y detalles artesanales. Una silueta relajada para llevar tu identidad a tu manera.',
    front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta01_mujer_frente-lzoGvqDgFJzM6Tvk1GSd0EZ3yAqxBX.webp',
    back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta01_mujer_espalda-iebFgJ12ZftLT7oGqIf8oblZ2QnvJC.webp',
    extras: [
      // 'chaqueta01_detalle1.webp',
    ],
  },
  {
    id: 'chaqueta-02-women',
    name: 'Chaqueta Denim 02',
    description: 'Una chaqueta denim intervenida con detalles de perlas y bordado. Pieza única de la colección MANTOS WOMEN.',
    front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta02_mujer_frente-2XOspKLk1AwR07UGD0MSoGmU1sdINO.webp',
    back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta02_mujer_espalda-VQCDuXBQTtIH8dbm4eGyROr94SlN13.webp',
    extras: [
      // 'chaqueta02_detalle1.webp',
    ],
  },
]

const jacketProduct = (jacket: Jacket, index: number): Product => {
  const extras = jacket.extras ?? []
  return {
    id: jacket.id,
    slug: jacket.id,
    name: jacket.name,
    category: 'jacket',
    collection: 'women',
    price: 189000,
    description: jacket.description,
    material: 'Denim de algodón',
    fit: 'Relaxed fit',
    color: 'Denim claro',
    sizes: ['S', 'M', 'L'],
    images: { front: img(jacket.front), back: img(jacket.back), details: img(extras[0] ?? jacket.front) },
    gallery: [
      { src: img(jacket.front), label: 'FRONT' },
      { src: img(jacket.back), label: 'BACK' },
      ...extras.map((src, i) => ({ src: img(src), label: extras.length > 1 ? `DETAIL ${i + 1}` : 'DETAIL' })),
    ],
    available: true,
    featured: true,
  }
}

// ---------------------------------------------------------------------------
// LISTA DE PRODUCTOS
// ---------------------------------------------------------------------------
export const products: Product[] = [
  ...designs.map((design, i) => tee(design, i, 'men')),
  ...designs.map((design, i) => tee(design, i, 'women')),
  ...jackets.map((jacket, i) => jacketProduct(jacket, i)),
]

export const getProduct = (slug: string) => products.find((product) => product.slug === slug)
export const getCollection = (collection: Product['collection']) => products.filter((product) => product.collection === collection)
export const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)
export const heroImage = img(assets.hero)