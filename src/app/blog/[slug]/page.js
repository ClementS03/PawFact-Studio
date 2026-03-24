import Navbar from '@/components/Navbar'
import BlogPost from '@/components/BlogPost'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { translations as tr } from '@/lib/i18n'

export function generateStaticParams() {
  return tr.blog.articles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const article = tr.blog.articles.find(a => a.slug === params.slug)
  if (!article) return { title: 'Article — PawFect Studio' }
  return {
    title: `${article.title.fr} — PawFect Studio`,
    description: article.excerpt.fr,
  }
}

export default function BlogPostPage({ params }) {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <BlogPost slug={params.slug} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
