'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { MessageSquareQuote } from 'lucide-react'

function Stars({ count = 5 }) {
  return (
    <div className="testimonial-stars" aria-label={`${count} étoiles`}>
      {Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}
    </div>
  )
}

export default function Testimonials() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const tm = tr.testimonials

  useEffect(() => {
    let ctx

    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          const cards = sectionRef.current.querySelectorAll('.testimonial-card')
          gsap.set(cards, { opacity: 0, y: 36, scale: 0.97 })
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.13,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.testimonials-grid'),
              start: 'top 82%',
              once: true,
            },
          })
        }, sectionRef)
      } catch {
        sectionRef.current?.querySelectorAll('.testimonial-card').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }

    animate()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="testimonials-section" id="testimonials" ref={sectionRef}>
      <div className="container-site">
        <div className="testimonials-header">
          <span className="section-eyebrow">
            <MessageSquareQuote size={14} />
            {t(tm.eyebrow, lang)}
          </span>
          <h2 className="section-title">{t(tm.title, lang)}</h2>
          <p className="body-text">{t(tm.desc, lang)}</p>
        </div>

        <div className="testimonials-grid">
          {tm.list.map((item, i) => (
            <div
              key={i}
              className={`testimonial-card${item.featured ? ' testimonial-card--featured' : ''}`}
            >
              <div className="testimonial-quote-mark" aria-hidden="true">
                <MessageSquareQuote size={40} strokeWidth={1} />
              </div>

              <Stars />

              <p className="testimonial-text">{t(item.text, lang)}</p>

              <div className="testimonial-author">
                <div
                  className={`testimonial-avatar${item.avatarVariant ? ` testimonial-avatar--${item.avatarVariant}` : ''}`}
                  aria-hidden="true"
                >
                  {item.initial}
                </div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-pet-label">{t(item.pet, lang)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
