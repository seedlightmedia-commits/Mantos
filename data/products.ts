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
  garment: string
  neck: string
  color: string
  sizes: string[]
  images: { front: string; back: string; details?: string; material?: string }
  gallery: GalleryImage[] // todas las fotos del producto, en orden, con su etiqueta
  extraDetails: string[] // líneas extra para "Detalles de la prenda"
  available: boolean
  featured: boolean
}

// ---------------------------------------------------------------------------
// FOTOS GENERALES
// ---------------------------------------------------------------------------
const assets = {
  hero: 'Portada2.png',
  teeMaterial: 'GraciaDetalles.webp', // foto de material por defecto (si una camiseta no tiene la suya)
}

// Convierte 'foto.webp' en '/foto.webp' para que cargue desde cualquier página.
// Los enlaces completos (https://...) se dejan como están.
const img = (src: string) =>
  src.startsWith('http') || src.startsWith('/') ? src : `/${src}`

// ---------------------------------------------------------------------------
// VALORES POR DEFECTO DE LAS CAMISETAS
// Si una camiseta no define un dato, usa el de aquí.
// ---------------------------------------------------------------------------
const teeDefaults = {
  price: 99000,
  garment: 'Camiseta manga corta',
  description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
  material: '100% algodón',
  weight: '200 GSM',
  fit: 'Oversized / relaxed fit',
  neck: 'Cuello redondo acanalado',
  color: 'Marfil',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
}

// ---------------------------------------------------------------------------
// DISEÑOS
// Cada diseño tiene una versión HOMBRE (men) y una MUJER (women).
// Cada versión es independiente: puede tener su propio precio, detalles y fotos.
//
// OBLIGATORIOS
//   front  = foto principal (la que se ve en el catálogo)
//   back   = foto de espalda
//
// OPCIONALES (si no los pones, usa los valores por defecto de arriba)
//   detailPhoto   = foto de DETALLE de ESA prenda (miniatura DETAIL, con zoom)
//   materialPhoto = foto de MATERIAL de ESA prenda (miniatura MATERIAL, con zoom)
//   extras        = fotos adicionales (todas las que quieras, aparecen después)
//   price         = precio, ej. 89000
//   description   = descripción propia
//   garment       = tipo de prenda, ej. 'Camiseta manga corta', 'Saco'
//   material      = ej. '100% algodón peinado'
//   weight        = gramaje, ej. '240 GSM'
//   fit           = ej. 'Boxy fit'
//   neck          = ej. 'Cuello redondo'
//   color         = ej. 'Arena'
//   sizes         = ej. ['S', 'M', 'L']
//   details       = líneas extra para "Detalles de la prenda",
//                   ej. ['Estampado bordado', 'Etiqueta interna MANTOS']
//
// Los archivos locales deben estar en la carpeta /public.
// ---------------------------------------------------------------------------
type Variant = {
  front: string
  back: string
  extras?: string[]
  detailPhoto?: string
  materialPhoto?: string
  price?: number
  description?: string
  garment?: string
  material?: string
  weight?: string
  fit?: string
  neck?: string
  color?: string
  sizes?: string[]
  details?: string[]
}

type Design = {
  id: string
  name: string
  men: Variant
  women: Variant
}

const designs: Design[] = [
  {
    id: 'metanoia',
    name: 'Diseño 01 — Metanoia',
    men: {
      front: 'metanoiafrenteblanco.webp',
      back: 'metanoiaespaldablanco.webp',
      extras: ['metanoiafrentehombre.webp', 'metanoiaespaldahombre.webp'],
      // detailPhoto: 'metanoiadetallehombre.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'metanoiamaterialhombre.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Camiseta manga corta',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
    women: {
      front: 'metanoiafrente.webp',
      back: 'metanoiaespalda.webp',
      extras: ['metanoiafrentestile.webp'],
      // detailPhoto: 'metanoiadetallemujer.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'metanoiamaterialmujer.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Camiseta manga corta',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
  },
  {
    id: 'sus-nombres',
    name: 'Diseño 02 — Sus nombres',
    men: {
      front: 'nombresfrentehombre.webp',
      back: 'nombresespaldahombre.webp',
      extras: [],
      detailPhoto: 'nombresdetalle.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'nombresmaterialhombre.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Camiseta manga corta',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
    women: {
      front: 'nombresfrente.webp',
      back: 'nombresespalda.webp',
      extras: [],
      // detailPhoto: 'nombresdetallemujer.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'nombresmaterialmujer.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Camiseta manga corta',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
  },
  {
    id: 'exodo',
    name: 'Diseño 03 — Exodo',
    men: {
      front: 'Exodofrentehombre.png',
      back: 'Exodoespaldahombre.png',
      extras: [],
      // detailPhoto: 'exododetallehombre.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'exodomaterialhombre.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Camiseta manga corta',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
    women: {
      front: 'Exodofrentemujer.png',
      back: 'Exodoespaldamujer.png',
      extras: [],
      // detailPhoto: 'exododetallemujer.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'exodomaterialmujer.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Camiseta manga corta',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
  },
  {
    id: 'exodo-saco',
    name: 'Diseño 04 — Exodo saco',
    men: {
      front: 'Exodofrentesaco.png',
      back: 'Exodoespaldasaco.png',
      extras: [],
      // detailPhoto: 'exodosacodetallehombre.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'exodosacomaterialhombre.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Saco',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
    women: {
      front: 'graciamujerfrente.webp', // PENDIENTE: foto frente mujer del diseño 04
      back: 'graciamujerespalda.webp', // PENDIENTE: foto espalda mujer del diseño 04
      extras: [],
      // detailPhoto: 'exodosacodetallemujer.webp',     // ← foto DETALLE de esta prenda
      // materialPhoto: 'exodosacomaterialmujer.webp',  // ← foto MATERIAL de esta prenda
      price: 99000,
      description: 'Una pieza de la primera colección MANTOS. Diseñada para expresar identidad y personalidad a través de una propuesta gráfica contemporánea.',
      garment: 'Saco',
      material: '100% algodón',
      weight: '200 GSM',
      fit: 'Oversized / relaxed fit',
      neck: 'Cuello redondo acanalado',
      color: 'Marfil',
      details: [],
    },
  },
]

// ---------------------------------------------------------------------------
// CONSTRUCTOR DE CAMISETAS (no necesitas tocar esto)
// ---------------------------------------------------------------------------
const tee = (design: Design, index: number, collection: 'men' | 'women'): Product => {
  const v = design[collection]
  const extras = v.extras ?? []
  const materialPhoto = img(v.materialPhoto ?? assets.teeMaterial)
  const detailPhoto = v.detailPhoto ? img(v.detailPhoto) : undefined

  return {
    id: `${design.id}-${collection}`,
    slug: `diseno-${String(index + 1).padStart(2, '0')}-${collection}`,
    name: design.name,
    category: 't-shirt',
    collection,
    price: v.price ?? teeDefaults.price,
    description: v.description ?? teeDefaults.description,
    garment: v.garment ?? teeDefaults.garment,
    material: v.material ?? teeDefaults.material,
    weight: v.weight ?? teeDefaults.weight,
    fit: v.fit ?? teeDefaults.fit,
    neck: v.neck ?? teeDefaults.neck,
    color: v.color ?? teeDefaults.color,
    sizes: v.sizes ?? teeDefaults.sizes,
    images: {
      front: img(v.front),
      back: img(v.back),
      details: detailPhoto,
      material: materialPhoto,
    },
    gallery: [
      { src: img(v.front), label: 'FRONT' },
      { src: img(v.back), label: 'BACK' },
      ...(detailPhoto ? [{ src: detailPhoto, label: 'DETAIL' }] : []),
      { src: materialPhoto, label: 'MATERIAL' },
      ...extras.map((src, i) => ({ src: img(src), label: `EXTRA ${i + 1}` })),
    ],
    extraDetails: v.details ?? [],
    available: true,
    featured: true,
  }
}

// ---------------------------------------------------------------------------
// CHAQUETAS DENIM (sección "Denim, Reimagined" — mujer)
// Obligatorios: id, name, front, back
// Opcionales: extras, materialPhoto, price, description, material, weight,
//             fit, neck, color, sizes, details
// OJO: 'front' es la foto que se ve en el catálogo.
// ---------------------------------------------------------------------------
type Jacket = {
  id: string
  name: string
  front: string
  back: string
  extras?: string[]
  detailPhoto?: string
  materialPhoto?: string
  price?: number
  description?: string
  garment?: string
  material?: string
  weight?: string
  fit?: string
  neck?: string
  color?: string
  sizes?: string[]
  details?: string[]
}

const jacketDefaults = {
  price: 189000,
  garment: 'Chaqueta denim',
  material: 'Denim de algodón',
  fit: 'Relaxed fit',
  neck: 'Cuello camisero',
  color: 'Denim claro',
  sizes: ['S', 'M', 'L'],
}

const jackets: Jacket[] = [
  {
    id: 'chaqueta-01-women',
    name: 'Chaqueta Denim 01',
    description: 'Denim con carácter y detalles artesanales. Una silueta relajada para llevar tu identidad a tu manera.',
    front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta01_mujer_frente-lzoGvqDgFJzM6Tvk1GSd0EZ3yAqxBX.webp',
    back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta01_mujer_espalda-iebFgJ12ZftLT7oGqIf8oblZ2QnvJC.webp',
    extras: [
      // 'chaqueta01_extra1.webp',
    ],
    // detailPhoto: 'chaqueta01_detalle.webp',     // ← foto DETALLE
    // materialPhoto: 'chaqueta01_material.webp',  // ← foto MATERIAL
  },
  {
    id: 'chaqueta-02-women',
    name: 'Chaqueta Denim 02',
    description: 'Una chaqueta denim intervenida con detalles de perlas y bordado. Pieza única de la colección MANTOS WOMEN.',
    front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta02_mujer_frente-2XOspKLk1AwR07UGD0MSoGmU1sdINO.webp',
    back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaqueta02_mujer_espalda-VQCDuXBQTtIH8dbm4eGyROr94SlN13.webp',
    extras: [
      // 'chaqueta02_extra1.webp',
    ],
    // detailPhoto: 'chaqueta02_detalle.webp',     // ← foto DETALLE
    // materialPhoto: 'chaqueta02_material.webp',  // ← foto MATERIAL
  },
]

const jacketProduct = (jacket: Jacket): Product => {
  const extras = jacket.extras ?? []
  return {
    id: jacket.id,
    slug: jacket.id,
    name: jacket.name,
    category: 'jacket',
    collection: 'women',
    price: jacket.price ?? jacketDefaults.price,
    description: jacket.description ?? '',
    garment: jacket.garment ?? jacketDefaults.garment,
    material: jacket.material ?? jacketDefaults.material,
    weight: jacket.weight,
    fit: jacket.fit ?? jacketDefaults.fit,
    neck: jacket.neck ?? jacketDefaults.neck,
    color: jacket.color ?? jacketDefaults.color,
    sizes: jacket.sizes ?? jacketDefaults.sizes,
    images: {
      front: img(jacket.front),
      back: img(jacket.back),
      details: jacket.detailPhoto ? img(jacket.detailPhoto) : undefined,
      material: jacket.materialPhoto ? img(jacket.materialPhoto) : undefined,
    },
    gallery: [
      { src: img(jacket.front), label: 'FRONT' },
      { src: img(jacket.back), label: 'BACK' },
      ...(jacket.detailPhoto ? [{ src: img(jacket.detailPhoto), label: 'DETAIL' }] : []),
      ...(jacket.materialPhoto ? [{ src: img(jacket.materialPhoto), label: 'MATERIAL' }] : []),
      ...extras.map((src, i) => ({ src: img(src), label: `EXTRA ${i + 1}` })),
    ],
    extraDetails: jacket.details ?? [],
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
  ...jackets.map((jacket) => jacketProduct(jacket)),
]

export const getProduct = (slug: string) => products.find((product) => product.slug === slug)
export const getCollection = (collection: Product['collection']) => products.filter((product) => product.collection === collection)
export const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)
export const heroImage = img(assets.hero)