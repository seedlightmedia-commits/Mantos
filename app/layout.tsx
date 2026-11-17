import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { CartProvider } from '@/components/cart-provider'
import { Header } from '@/components/storefront'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'MANTOS — Porta tu llamado', template: '%s | MANTOS' },
  description: 'Una identidad. Muchas formas de llevarla. Descubre la primera colección MANTOS: streetwear contemporáneo con propósito.',
  generator: 'v0.app',
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f2eee7' }

function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><a className="footer-wordmark" href="/">MANTOS</a><span>PORTA TU LLAMADO.</span><small>© 2025 MANTOS. TODOS LOS DERECHOS RESERVADOS.</small></div><nav className="footer-links" aria-label="Enlaces del pie"><a href="/men">MEN</a><a href="/women">WOMEN</a><a href="https://wa.me/573000000000" target="_blank" rel="noreferrer">CONTACT</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM</a></nav><div className="footer-legal"><span>ENVÍOS Y CAMBIOS</span><span>PRIVACIDAD</span><span>TÉRMINOS</span></div></footer>
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className="antialiased"><CartProvider><Header />{children}<Footer /></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
