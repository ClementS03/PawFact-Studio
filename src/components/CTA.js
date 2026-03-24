'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { PawPrint, ArrowRight, Phone, CheckCircle } from 'lucide-react'

export default function CTA() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const c = tr.cta

  useEffect(() => {
    let ctx

    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          const inner = sectionRef.current.querySelector('.cta-inner')
          gsap.set(inner, { opacity: 0, y: 36, scale: 0.97 })
          gsap.to(inner, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: inner,
              start: 'top 82%',
              once: true,
            },
          })
        }, sectionRef)
      } catch {
        const inner = sectionRef.current?.querySelector('.cta-inner')
        if (inner) { inner.style.opacity = '1'; inner.style.transform = 'none' }
      }
    }

    animate()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="cta-section" id="cta" ref={sectionRef}>
      <div className="container-site">
        <div className="cta-inner">
          <div className="cta-icon" aria-hidden="true">
            <PawPrint size={32} strokeWidth={1.75} />
          </div>

          <h2 className="cta-title">{t(c.title, lang)}</h2>
          <p className="cta-desc">{t(c.desc, lang)}</p>

          <div className="cta-actions">
            <a href="tel:+33123456789" className="btn-primary">
              {t(c.btn1, lang)}
              <ArrowRight size={16} />
            </a>
            <a href="tel:+33123456789" className="btn-white">
              <Phone size={16} />
              {t(c.btn2, lang)}
            </a>
          </div>

          <p className="cta-note">
            <span className="cta-note-icon"><CheckCircle size={14} /></span>
            {t(c.note, lang)}
          </p>
        </div>
      </div>
    </section>
  )
}
