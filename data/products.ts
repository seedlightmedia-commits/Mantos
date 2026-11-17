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
  available: boolean
  featured: boolean
}

const assets = {
  hero: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mantoshombremujerfrontal-ew8tqb0nd0Xu7KwHg4r2dA2V9287XA.webp',
  teeMaterial: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/camisaalgodon200g-FDFayj4GmQwoDFxg7Bm2mkCeuvIAT5.webp',
  womenTeeFront: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno01_mujer_frente-HFlccCYQxZrFGGbrkB02CtZdBvxeIJ.webp',
  womenTeeBack: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno01_mujer_espalda-A61BfXrpyyl8OmPaTX7XccTsueDQu0.webp',
  menTee: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno01_hombre_frente-O2pituqG2GzzJZlSXKnYtmJVNNkK1I.webp',
  jacket1Front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta01_mujer_frente-lzoGvqDgFJzM6Tvk1GSd0EZ3yAqxBX.webp',
  jacket1Back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta01_mujer_espalda-iebFgJ12ZftLT7oGqIf8oblZ2QnvJC.webp',
  jacket2Front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta02_mujer_frente-2XOspKLk1AwR07UGD0MSoGmU1sdINO.webp',
  jacket2Back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta02_mujer_espalda-VQCDuXBQTtIH8dbm4eGyROr94SlN13.webp',
}

const designs = [
  { id: 'origen', name: 'Diseño 01 — Origen', title: 'Origen', menBack: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno01_hombre_espalda-ZdGF7AFAC7kBToOdUWLSIfJEdqULNU.webp' },
  { id: 'llamado', name: 'Diseño 02 — Llamado', title: 'Llamado', menBack: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno02_hombre_espalda-KEeUdLaJ50q3anKCBvW4QVOwrM6f7s.webp' },
  { id: 'horizonte', name: 'Diseño 03 — Horizonte', title: 'Horizonte', menBack: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno03_hombre_espalda-XULMv6seUXbNzmAUg54rDdugfrbeFI.webp' },
  { id: 'umbral', name: 'Diseño 04 — Umbral', title: 'Umbral', menBack: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diseno04_hombre_espalda-WH2d1yP9xccfYm66lfVC0kkOZec2et.webp' },
]

const tee = (design: (typeof designs)[number], collection: 'men' | 'women'): Product => ({
  id: `${design.id}-${collection}`,
  slug: `diseno-${String(designs.indexOf(design) + 1).padStart(2, '0')}-${collection}`,
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
  images: collection === 'men'
    ? { front: assets.menTee, back: design.menBack, details: assets.menTee, material: assets.teeMaterial }
    : { front: assets.womenTeeFront, back: assets.womenTeeBack, details: assets.womenTeeFront, material: assets.teeMaterial },
  available: true,
  featured: true,
})

export const products: Product[] = [
  ...designs.map((design) => tee(design, 'men')),
  ...designs.map((design) => tee(design, 'women')),
  {
    id: 'chaqueta-01-women', slug: 'chaqueta-01-women', name: 'Chaqueta Denim 01', category: 'jacket', collection: 'women', price: 189000,
    description: 'Denim con carácter y detalles artesanales. Una silueta relajada para llevar tu identidad a tu manera.', material: 'Denim de algodón', fit: 'Relaxed fit', color: 'Denim claro', sizes: ['S', 'M', 'L'],
    images: { front: assets.jacket1Front, back: assets.jacket1Back, details: assets.jacket1Front }, available: true, featured: true,
  },
  {
    id: 'chaqueta-02-women', slug: 'chaqueta-02-women', name: 'Chaqueta Denim 02', category: 'jacket', collection: 'women', price: 189000,
    description: 'Una chaqueta denim intervenida con detalles de perlas y bordado. Pieza única de la colección MANTOS WOMEN.', material: 'Denim de algodón', fit: 'Relaxed fit', color: 'Denim claro', sizes: ['S', 'M', 'L'],
    images: { front: assets.jacket2Front, back: assets.jacket2Back, details: assets.jacket2Front }, available: true, featured: true,
  },
]

export const getProduct = (slug: string) => products.find((product) => product.slug === slug)
export const getCollection = (collection: Product['collection']) => products.filter((product) => product.collection === collection)
export const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)
export const heroImage = assets.hero
