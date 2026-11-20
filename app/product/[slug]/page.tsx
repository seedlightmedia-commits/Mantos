import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/storefront'
import { getProduct, products } from '@/data/products'

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  return { title: product ? `${product.name} | MANTOS` : 'Prenda | MANTOS', description: product?.description }
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}