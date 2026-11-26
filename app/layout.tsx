
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import { CartProvider } from '@/components/cart-provider'
import { Header } from '@/components/storefront'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'MANTOS — Porta tu llamado',
    template: '%s | MANTOS',
  },
  description:
    'Una identidad. Muchas formas de llevarla. Descubre la primera colección MANTOS: streetwear contemporáneo con propósito.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f2eee7',
}

const WHATSAPP_URL = 'https://wa.me/573114769412'
const META_PIXEL_ID = '1644592423792233'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="footer-wordmark" href="/">MANTOS</a>
        <span>PORTA TU LLAMADO.</span>
        <small>
          ©️ {new Date().getFullYear()} MANTOS. TODOS LOS DERECHOS RESERVADOS.
        </small>
      </div>

      <nav className="footer-links" aria-label="Enlaces del pie de página">
        <a href="/men">MEN</a>
        <a href="/women">WOMEN</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          CONTACT
        </a>
        <a
          href="https://www.instagram.com/somosmantos/"
          target="_blank"
          rel="noreferrer"
        >
          INSTAGRAM
        </a>
      </nav>

      <nav className="footer-legal" aria-label="Información legal">
        <a href="/envios-y-cambios">ENVÍOS Y CAMBIOS</a>
        <a href="/privacidad">PRIVACIDAD</a>
        <a href="/terminos">TÉRMINOS</a>
      </nav>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">

        {/* META PIXEL - MANTOS */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

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
