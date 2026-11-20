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
  gallery: string[] // todas las fotos del producto, en orden
  available: boolean
  featured: boolean
}

// ---------------------------------------------------------------------------
// FOTOS GENERALES
// ---------------------------------------------------------------------------
const assets = {
  hero: 'Portada1.webp',
  teeMaterial: 'GraciaDetalles.webp', // foto del material (se usa en todas las camisetas)
}

// ---------------------------------------------------------------------------
// DISEÑOS
// Cada diseño tiene sus propias fotos para HOMBRE y para MUJER.
//   front  = foto principal (la que se ve en el catálogo)
//   back   = foto de espalda
//   extras = fotos adicionales (agrega todas las que quieras)
//
// Por ahora dejé las fotos que ya tenías para que la página no se rompa.
// Solo reemplaza el nombre de cada archivo por la foto correcta de cada diseño.
// Los archivos locales deben estar en la carpeta /public.
// ---------------------------------------------------------------------------
type DesignPhotos = { front: string; back: string; extras?: string[] }

type Design = {
  id: string
  name: string
  men: DesignPhotos
  women: DesignPhotos
}

const designs: Design[] = [
  {
    id: 'Metanoia',
    name: 'Diseño 01 — Origen',
    men: {
      front: 'metanoiafrenteblanco.webp',
      back: 'metanoiaespaldablanco.webp',
      extras: [ 'metanoiafrentehombre.webp','metanoiaespaldahombre.webp'
      ],
    },
    women: {
      front: 'metanoiafrente.webp', // REEMPLAZAR por la foto frente del diseño 01 mujer
      back: 'metanoiaespalda.webp', // REEMPLAZAR por la foto espalda del diseño 01 mujer
      extras: ['metanoiafrentestile.webp'
      ],
    },
  },
  {
    id: 'Yo soy',
    name: 'Diseño 02 — Sus nombres',
    men: {
      front: 'nombresfrentehombre.webp', // REEMPLAZAR
      back: 'nombresespaldahombre.webp', // REEMPLAZAR
      extras: ['nombresdetalle.webp'],
    },
    women: {
      front: 'nombresfrente.webp', // REEMPLAZAR por la foto frente del diseño 02 mujer
      back: 'nombresespalda.webp', // REEMPLAZAR por la foto espalda del diseño 02 mujer
      extras: [],
    },
  },
  {
    id: 'metanoia',
    name: 'Diseño 03 — Metanoia blanco',
    men: {
      front: 'metanoiafrenteblanco.webp', // REEMPLAZAR
      back: 'metanoiaespaldablanco.webp',
      extras: [],
    },
    women: {
      front: 'metanoiafrente.webp', // REEMPLAZAR por la foto frente del diseño 03 mujer
      back: 'metanoiaespalda.webp', // REEMPLAZAR por la foto espalda del diseño 03 mujer
      extras: [],
    },
  },
  {
    id: 'umbral',
    name: 'Diseño 04 — Umbral',
    men: {
      front: 'metanoiafrenteblanco.webp', // REEMPLAZAR
      back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno04_hombre_espalda-WH2d1yP9xccfYm66lfVC0kkOZec2et.webp',
      extras: [],
    },
    women: {
      front: 'graciamujerfrente.webp', // REEMPLAZAR por la foto frente del diseño 04 mujer
      back: 'graciamujerespalda.webp', // REEMPLAZAR por la foto espalda del diseño 04 mujer
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
    color: 'Marfil',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: {
      front: photos.front,
      back: photos.back,
      details: extras[0] ?? photos.front,
      material: assets.teeMaterial,
    },
    gallery: [photos.front, photos.back, ...extras, assets.teeMaterial],
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
    images: { front: jacket.front, back: jacket.back, details: extras[0] ?? jacket.front },
    gallery: [jacket.front, jacket.back, ...extras],
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
export const heroImage = assets.hero