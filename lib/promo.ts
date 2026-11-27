import { useEffect, useState } from 'react'

// ===========================================================================
// OFERTAS DE LA BOLSA  (todo se edita en ESTE archivo)
//
// Hay dos juegos de ofertas:
//   1) REGULAR_OFFER  -> las ofertas normales de la tienda (siempre visibles).
//   2) BLACK_FRIDAY   -> solo se usa mientras Black Friday está encendido;
//                        en ese tiempo REEMPLAZA a las normales. Al terminar,
//                        las normales vuelven solas.
//
// Cada "nivel" (tier) significa: "desde X prendas, aplica este descuento".
//   from                = desde cuántas prendas aplica
//   percent             = % de descuento (0 = sin descuento)
//   freeShippingBogota  = true -> envío gratis para Bogotá
//   message             = texto del letrero en la bolsa ('' = sin letrero).
//                         Escribe {percent} y se reemplaza solo por el número.
//   big                 = true -> letrero grande y llamativo
//
// Los niveles deben ir de menor a mayor "from".
// ===========================================================================

export type Tier = {
  from: number
  percent: number
  freeShippingBogota: boolean
  message: string
  big?: boolean
}

// ---------------------------------------------------------------------------
// 1) OFERTAS NORMALES (fuera de Black Friday)
//    ⚠️ Los números de abajo son EJEMPLOS: cámbialos antes de publicar,
//    porque el descuento se aplica de verdad al total del pedido.
//    Para quitar estos letreros y descuentos:  enabled: false
// ---------------------------------------------------------------------------
export const REGULAR_OFFER = {
  enabled: true,
  tiers: [
    { from: 2, percent: 5, freeShippingBogota: false, message: 'Por la compra de tu segunda prenda tienes {percent}% de descuento.' }, // ← EJEMPLO
    { from: 3, percent: 10, freeShippingBogota: true, big: true, message: 'Si llevas una tercera prenda tienes {percent}% de descuento en todo + envío gratis en Bogotá.' }, // ← EJEMPLO
  ] as Tier[],
}

// ---------------------------------------------------------------------------
// 2) BLACK FRIDAY
//    mode: 'auto' -> se enciende y apaga SOLO según las fechas.  ← dejar este
//    mode: 'off'  -> apagado siempre
//    mode: 'on'   -> encendido siempre (solo para probar en tu computador;
//                    nunca subas el proyecto con 'on')
//
//    Lo único que se apaga con Black Friday: los letreros "BLACK FRIDAY" de los
//    productos, la caja negra de cada prenda y estas ofertas especiales.
// ---------------------------------------------------------------------------
export const BLACK_FRIDAY = {
  mode: 'auto' as 'auto' | 'on' | 'off',

  // Hora de Colombia (-05:00). Solo el viernes 27 de noviembre de 2026.
  startsAt: '2026-11-27T00:00:00-05:00',
  endsAt: '2026-11-27T23:59:59-05:00',

  tiers: [
    { from: 1, percent: 10, freeShippingBogota: false, message: '' },
    { from: 2, percent: 10, freeShippingBogota: true, message: 'Por la compra del 2.º producto tendrás tu descuento del {percent}% en cada prenda + envío gratis en Bogotá.' },
    { from: 3, percent: 15, freeShippingBogota: true, big: true, message: 'Si llevas una tercera prenda tendrás {percent}% de descuento en todo y sin costo de envío en Bogotá.' },
  ] as Tier[],
}

// ¿Está Black Friday encendido en este momento?
export function isBlackFridayLive(now: Date = new Date()) {
  if (BLACK_FRIDAY.mode === 'off') return false
  if (BLACK_FRIDAY.mode === 'on') return true
  const time = now.getTime()
  return time >= new Date(BLACK_FRIDAY.startsAt).getTime() && time <= new Date(BLACK_FRIDAY.endsAt).getTime()
}

// Para los letreros de producto: empieza apagado y se enciende al cargar la página
// (así no hay diferencias entre servidor y navegador); se revisa cada minuto.
export function useBlackFriday() {
  const [live, setLive] = useState(false)
  useEffect(() => {
    const check = () => setLive(isBlackFridayLive())
    check()
    const timer = setInterval(check, 60_000)
    return () => clearInterval(timer)
  }, [])
  return live
}

const sortTiers = (tiers: Tier[]) => [...tiers].sort((a, b) => a.from - b.from)

// Qué ofertas están vigentes ahora: las de Black Friday, las normales, o ninguna.
export function getActiveOffer(): { source: 'black-friday' | 'regular' | null; tiers: Tier[] } {
  if (isBlackFridayLive()) return { source: 'black-friday', tiers: sortTiers(BLACK_FRIDAY.tiers) }
  if (REGULAR_OFFER.enabled) return { source: 'regular', tiers: sortTiers(REGULAR_OFFER.tiers) }
  return { source: null, tiers: [] }
}

// Texto del letrero con el {percent} ya reemplazado.
export const tierText = (tier: Tier) => tier.message.replace(/\{percent\}/g, String(tier.percent))

// Resumen corto de un nivel, ej. "10% de descuento + envío gratis en Bogotá".
export const tierSummary = (tier: Tier) =>
  `${tier.percent}% de descuento${tier.freeShippingBogota ? ' + envío gratis en Bogotá' : ''}`

const DEFAULT_SHIPPING_NOTE = 'Envío calculado al finalizar la compra.'

// Calcula descuento, total y mensajes según las prendas que hay en la bolsa.
export function getPromo(units: number, subtotal: number) {
  const { source, tiers } = getActiveOffer()

  const current = [...tiers].reverse().find((tier) => units >= tier.from)
  const next = tiers.find((tier) => tier.from > units)

  const percent = current?.percent ?? 0
  const discount = Math.round((subtotal * percent) / 100)
  const total = subtotal - discount
  const freeShippingBogota = current?.freeShippingBogota ?? false

  let nudge = ''
  if (tiers.length > 0) {
    if (!next) {
      nudge = '¡Desbloqueaste el máximo beneficio!'
    } else {
      const missing = next.from - units
      const parts: string[] = []
      if (next.percent > percent) parts.push(`${next.percent}% de descuento`)
      if (next.freeShippingBogota && !freeShippingBogota) parts.push('envío gratis en Bogotá')
      nudge = `Añade ${missing} prenda${missing > 1 ? 's' : ''} más y desbloquea ${parts.join(' + ') || 'más beneficios'}.`
    }
  }

  const shippingNote = freeShippingBogota
    ? 'Envío gratis para pedidos en Bogotá. Otras ciudades: se calcula al finalizar.'
    : DEFAULT_SHIPPING_NOTE

  const label = source === 'black-friday' ? 'Black Friday' : 'Descuento'

  return { source, tiers, percent, discount, total, freeShippingBogota, shippingNote, nudge, label }
}
