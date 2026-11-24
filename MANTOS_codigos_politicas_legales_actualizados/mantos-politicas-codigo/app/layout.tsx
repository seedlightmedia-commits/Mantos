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

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f2eee7',
}

const WHATSAPP_URL = 'https://wa.me/573114769412'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="footer-wordmark" href="/">MANTOS</a>
        <span>PORTA TU LLAMADO.</span>
        <small>© {new Date().getFullYear()} MANTOS. TODOS LOS DERECHOS RESERVADOS.</small>
      </div>

      <nav className="footer-links" aria-label="Enlaces del pie de página">
        <a href="/men">MEN</a>
        <a href="/women">WOMEN</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">CONTACT</a>
        <a href="https://www.instagram.com/somosmantos/" target="_blank" rel="noreferrer">INSTAGRAM</a>
      </nav>

      <nav className="footer-legal" aria-label="Información legal">
        <a href="/envios-y-cambios">ENVÍOS Y CAMBIOS</a>
        <a href="/privacidad">PRIVACIDAD</a>
        <a href="/terminos">TÉRMINOS</a>
      </nav>
    </footer>
  )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
