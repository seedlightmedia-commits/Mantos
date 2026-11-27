
import type { Product } from '@/data/products'
import { formatPrice, products } from '@/data/products'
import { getPromo } from '@/lib/promo'

type CartLine = {
  product: Product
  size: string
  quantity: number
}

const WHATSAPP_NUMBER = '573114769412'

// Genera el mensaje completo del pedido con los descuentos aplicados.
export function buildWhatsAppOrderUrl(lines: CartLine[]) {
  const items = lines.map(({ product: saved, size, quantity }, index) => {
    // Recupera la información actualizada del producto.
    const product = products.find((p) => p.id === saved.id) ?? saved

    const price = saved.price
    const lineSubtotal = price * quantity

    return [
      `*${index + 1}. ${product.name}* (${product.collection === 'men' ? 'Hombre' : 'Mujer'})`,
      product.garment ? `Prenda: ${product.garment}` : null,
      product.weight ? `Gramaje: ${product.weight}` : null,
      product.color ? `Color: ${product.color}` : null,
      `Talla: ${size}`,
      `Cantidad: ${quantity}`,
      `Precio unitario: ${formatPrice(price)}`,
      `Subtotal: ${formatPrice(lineSubtotal)}`,
    ]
      .filter(Boolean)
      .join('\n')
  })

  const totalUnits = lines.reduce(
    (sum, line) => sum + line.quantity,
    0
  )

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0
  )

  // Se utiliza exactamente el mismo cálculo de promociones del carrito.
  const promo = getPromo(totalUnits, subtotal)

  const isBlackFriday = promo.source === 'black-friday'

  const shipping = promo.freeShippingBogota
    ? 'GRATIS para pedidos en Bogotá. Otras ciudades se cotizan por separado.'
    : 'Se calcula según la ciudad de destino.'

  const message = [
    isBlackFriday
      ? 'Hola MANTOS 👋 Quiero hacer este pedido (Black Friday 🖤):'
      : 'Hola MANTOS 👋 Quiero hacer este pedido:',

    '',
    '*DETALLE DEL PEDIDO*',
    '',
    items.join('\n\n'),

    '',
    '--------------------------',
    '*RESUMEN DE COMPRA*',
    '',
    `Total de prendas: ${totalUnits}`,
    `Subtotal: ${formatPrice(subtotal)}`,

    promo.discount > 0
      ? `Descuento ${promo.label} (${promo.percent}%): -${formatPrice(promo.discount)}`
      : null,

    `*TOTAL DE PRENDAS: ${formatPrice(promo.total)}*`,
    '',
    promo.freeShippingBogota
      ? '✓ *ENVÍO GRATIS EN BOGOTÁ*'
      : 'Envío: pendiente de cotización según ciudad.',

    '',
    '📍 Ciudad de envío:',
    '',
    '¿Me confirman disponibilidad y forma de pago?',
  ]
    .filter((line) => line !== null)
    .join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
