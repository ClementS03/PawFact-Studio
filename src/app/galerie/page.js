import Navbar from '@/components/Navbar'
import Gallery from '@/components/Gallery'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Galerie — PawFect Studio',
  description: 'Découvrez les plus belles transformations réalisées chez PawFect Studio, salon de toilettage premium à Paris.',
}

export default function GaleriePage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
