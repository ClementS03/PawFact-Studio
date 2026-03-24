import Navbar from '@/components/Navbar'
import BlogList from '@/components/BlogList'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog — PawFect Studio',
  description: 'Conseils de toilettage, bien-être animal et actualités du salon PawFect Studio.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <BlogList />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
