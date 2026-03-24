import Navbar from '@/components/Navbar'
import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'À propos — PawFect Studio',
  description: 'Découvrez l\'histoire de PawFect Studio, salon de toilettage premium à Paris depuis 2014. Notre passion, nos valeurs et notre expertise.',
}

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
