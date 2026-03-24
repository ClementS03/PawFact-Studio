'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { PawPrint, Star, Scissors } from 'lucide-react'

export default function Team() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const tm = tr.team

  useEffect(() => {
    let ctx
    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          gsap.set('.team-hero-content', { opacity: 0, y: 28 })
          gsap.to('.team-hero-content', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })

          const cards = sectionRef.current?.querySelectorAll('.team-card')
          if (cards) {
            gsap.set(cards, { opacity: 0, y: 32, scale: 0.97 })
            gsap.to(cards, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.6, stagger: 0.14, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current.querySelector('.team-grid'), start: 'top 80%', once: true },
            })
          }
        }, sectionRef)
      } catch {
        sectionRef.current?.querySelectorAll('.team-hero-content, .team-card').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }
    animate()
    return () => ctx?.revert()
  }, [])

  const variantClass = {
    accent: 'team-avatar--accent',
    sage:   'team-avatar--sage',
    gold:   'team-avatar--gold',
  }

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="team-hero">
        <div className="container-site">
          <div className="team-hero-content">
            <span className="section-eyebrow">
              <PawPrint size={14} />
              {t(tm.eyebrow, lang)}
            </span>
            <h1 className="team-hero-title">{t(tm.title, lang)}</h1>
            <p className="team-hero-desc">{t(tm.desc, lang)}</p>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="team-section">
        <div className="container-site">
          <div className="team-grid">
            {tm.members.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-card-top">
                  <div className={`team-avatar ${variantClass[member.colorVariant] ?? ''}`}>
                    {member.initial}
                  </div>
                  <div className="team-stars" aria-label="5 étoiles">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} strokeWidth={0} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <div className="team-card-body">
                  <div className="team-member-name">{member.name}</div>
                  <div className="team-member-role">{t(member.role, lang)}</div>

                  <div className="team-badges">
                    <span className="team-badge">
                      <Scissors size={12} strokeWidth={1.75} />
                      {member.years} {t(tm.experience, lang)}
                    </span>
                    <span className="team-badge team-badge--specialty">
                      {t(tm.specialty, lang)} : {t(member.specialty, lang)}
                    </span>
                  </div>

                  <p className="team-bio">{t(member.bio, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
