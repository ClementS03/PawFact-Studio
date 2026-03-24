'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { Scissors, Droplets, Gem, Leaf, Sparkles, HeartPulse, ArrowRight } from 'lucide-react'

const SERVICE_ICONS = {
  coral:  <Scissors   size={24} strokeWidth={1.75} />,
  teal:   <Droplets   size={24} strokeWidth={1.75} />,
  yellow: <Gem        size={24} strokeWidth={1.75} />,
  purple: <Leaf       size={24} strokeWidth={1.75} />,
  pink:   <Sparkles   size={24} strokeWidth={1.75} />,
  blue:   <HeartPulse size={24} strokeWidth={1.75} />,
}

export default function Services() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const s = tr.services

  useEffect(() => {
    let ctx

    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          const cards = sectionRef.current.querySelectorAll('.service-card')
          gsap.set(cards, { opacity: 0, y: 48 })
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.services-grid'),
              start: 'top 82%',
              once: true,
            },
          })
        }, sectionRef)
      } catch {
        sectionRef.current?.querySelectorAll('.service-card').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }

    animate()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container-site">
        <div className="services-header">
          <span className="section-eyebrow">
            <Scissors size={14} />
            {t(s.eyebrow, lang)}
          </span>
          <h2 className="section-title">{t(s.title, lang)}</h2>
          <p className="body-text">{t(s.desc, lang)}</p>
        </div>

        <div className="services-grid">
          {s.list.map((service, i) => (
            <div key={i} className={`service-card service-card--${service.color}`}>
              <div className={`service-icon-wrap service-icon-wrap--${service.color}`}>
                {SERVICE_ICONS[service.color]}
              </div>

              <div>
                <div className="service-card-title">{t(service.title, lang)}</div>
              </div>

              <p className="service-card-desc">{t(service.desc, lang)}</p>

              <div className="service-card-footer">
                <div>
                  <div className="service-card-from">{t(s.from, lang)}</div>
                  <div className="service-card-price">{service.price}</div>
                </div>
                <a href="#cta" className="service-card-link">
                  {t(s.more, lang)}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
