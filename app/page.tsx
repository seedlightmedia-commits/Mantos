import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HomeCollections, ProductGrid } from '@/components/storefront'
import { getCollection, heroImage } from '@/data/products'

export default function Home() {
  const women = getCollection('women')
  return <main>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(20,18,16,.56) 0%, rgba(20,18,16,.20) 47%, transparent 75%), url("${heroImage}")` }}>
      <div className="hero-copy"><span className="hero-kicker">MANTOS · PRIMERA COLECCIÓN</span><h1>PORTA TU<br />LLAMADO.</h1><p>Una identidad. Muchas formas de llevarla.</p><a className="hero-link" href="#collection">DESCUBRIR COLECCIÓN <ArrowRight size={17} /></a></div><span className="hero-index">01 — 04</span>
    </section>
    <div className="brand-strip"><span>MANTOS — PRIMERA COLECCIÓN</span><i /><p>Prendas que conectan identidad, expresión y propósito.<br />Diseñadas para el día a día, con la fuerza de lo que te mueve.</p></div>
    <HomeCollections />
    <section className="women-feature" style={{ backgroundImage: `linear-gradient(90deg, rgba(22,20,18,.48), rgba(22,20,18,.08) 65%), url("${women[4].images.back}")` }}><div><span className="eyebrow">MANTOS · OTRA EXPRESIÓN</span><h2>MANTOS<br />WOMEN</h2><p>La misma esencia. Otra expresión.</p><Link href="/women" className="hero-link">DESCUBRIR WOMEN <ArrowRight size={17} /></Link></div></section>
    <section className="home-jackets"><div className="section-heading"><div><span className="eyebrow">PIEZAS INTERVENIDAS</span><h2>DENIM, REIMAGINED</h2></div><Link href="/women" className="text-link">DESCUBRIR WOMEN <span>→</span></Link></div><ProductGrid products={women.filter((product) => product.category === 'jacket')} /></section>
  </main>
}
