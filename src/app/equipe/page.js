import Navbar from '@/components/Navbar'
import Team from '@/components/Team'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Notre équipe — PawFect Studio',
  description: 'Rencontrez les toiletteuses certifiées de PawFect Studio, passionnées par le bien-être animal depuis 2014.',
}

export default function EquipePage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
