import type { Product } from '@/data/products'
import { formatPrice, products } from '@/data/products'

// Una línea del carrito: la prenda, la talla elegida y la cantidad.
type CartLine = { product: Product; size: string; quantity: number }

const WHATSAPP_NUMBER = '573114769412'

// Arma el enlace de WhatsApp con el resumen completo del pedido.
export function buildWhatsAppOrderUrl(lines: CartLine[]) {
  const items = lines.map(({ product: saved, size, quantity }, index) => {
    // El carrito se guarda en el navegador del cliente, así que se busca la versión
    // actual de la prenda por si se guardó con datos antiguos (sin gramaje, etc.).
    const product = products.find((p) => p.id === saved.id) ?? saved
    // El precio es el que el cliente vio en su bolsa.
    const price = saved.price

    return [
      `*${index + 1}. ${product.name}* (${product.collection === 'men' ? 'Hombre' : 'Mujer'})`,
      product.garment ? `Prenda: ${product.garment}` : null,
      product.weight ? `Gramaje: ${product.weight}` : null,
      product.color ? `Color: ${product.color}` : null,
      `Talla: ${size}`,
      `Cantidad: ${quantity}`,
      `Precio unitario: ${formatPrice(price)}`,
      `Subtotal: ${formatPrice(price * quantity)}`,
    ]
      .filter(Boolean)
      .join('\n')
  })

  const totalUnits = lines.reduce((sum, line) => sum + line.quantity, 0)
  const totalPrice = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  const message = [
    'Hola MANTOS 👋 Quiero hacer este pedido:',
    '',
    items.join('\n\n'),
    '',
    `Total de prendas: ${totalUnits}`,
    `*Total a pagar: ${formatPrice(totalPrice)}*`,
    '',
    '¿Me confirman disponibilidad y forma de pago?',
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
