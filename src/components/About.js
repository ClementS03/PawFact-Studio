'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { Award, Heart, Leaf, PawPrint, ArrowRight } from 'lucide-react'

export default function About() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const a = tr.about

  useEffect(() => {
    let ctx

    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          gsap.set('.about-text', { opacity: 0, x: -40 })
          gsap.set('.about-visual', { opacity: 0, x: 40 })

          gsap.to('.about-text', {
            opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
          })
          gsap.to('.about-visual', {
            opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', delay: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
          })

          const cards = sectionRef.current.querySelectorAll('.about-stat-card')
          gsap.set(cards, { opacity: 0, y: 24, scale: 0.97 })
          gsap.to(cards, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current.querySelector('.about-stats-grid'), start: 'top 82%', once: true },
          })
        }, sectionRef)
      } catch {
        sectionRef.current?.querySelectorAll('.about-text, .about-visual, .about-stat-card').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }

    animate()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container-site">
        <div className="about-grid">

          {/* Texte */}
          <div className="about-text">
            <span className="section-eyebrow">
              <PawPrint size={14} />
              {t(a.eyebrow, lang)}
            </span>
            <h2 className="section-title">{t(a.title, lang)}</h2>
            <p className="about-desc">{t(a.desc, lang)}</p>

            <div className="about-features">
              <div className="about-feature-item">
                <div className="about-feature-icon" aria-hidden="true">
                  <Award size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="about-feature-title">{t(a.feature1Title, lang)}</div>
                  <div className="about-feature-desc">{t(a.feature1Desc, lang)}</div>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="about-feature-icon about-feature-icon--sage" aria-hidden="true">
                  <Heart size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="about-feature-title">{t(a.feature2Title, lang)}</div>
                  <div className="about-feature-desc">{t(a.feature2Desc, lang)}</div>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="about-feature-icon about-feature-icon--gold" aria-hidden="true">
                  <Leaf size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="about-feature-title">{t(a.feature3Title, lang)}</div>
                  <div className="about-feature-desc">{t(a.feature3Desc, lang)}</div>
                </div>
              </div>
            </div>

            <a href="/equipe" className="btn-outline">
              {t(a.cta, lang)}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Visuel — grille de stats */}
          <div className="about-visual">
            <div className="about-deco-bar" aria-hidden="true" />
            <div className="about-stats-grid">
              <div className="about-stat-card about-stat-card--accent">
                <div className="about-stat-icon" aria-hidden="true">
                  <PawPrint size={28} strokeWidth={1.5} />
                </div>
                <div className="about-stat-number">{t(a.stat1n, lang)}</div>
                <div className="about-stat-label">{t(a.stat1l, lang)}</div>
              </div>

              <div className="about-stat-card">
                <div className="about-stat-icon" aria-hidden="true">
                  <Heart size={28} strokeWidth={1.5} />
                </div>
                <div className="about-stat-number">{t(a.stat2n, lang)}</div>
                <div className="about-stat-label">{t(a.stat2l, lang)}</div>
              </div>

              <div className="about-stat-card">
                <div className="about-stat-icon" aria-hidden="true">
                  <Award size={28} strokeWidth={1.5} />
                </div>
                <div className="about-stat-number">{t(a.stat3n, lang)}</div>
                <div className="about-stat-label">{t(a.stat3l, lang)}</div>
              </div>

              <div className="about-stat-card">
                <div className="about-stat-icon" aria-hidden="true">
                  <Leaf size={28} strokeWidth={1.5} />
                </div>
                <div className="about-stat-number">{t(a.stat4n, lang)}</div>
                <div className="about-stat-label">{t(a.stat4l, lang)}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
