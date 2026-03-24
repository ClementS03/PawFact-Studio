'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { PawPrint, Star, ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const h = tr.hero

  useEffect(() => {
    let ctx
    const ALL_ANIM = [
      '.hero-badge', '.hero-subtitle', '.hero-title',
      '.hero-desc', '.hero-actions', '.hero-stats', '.hero-right',
    ]

    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          gsap.set(['.hero-badge', '.hero-subtitle', '.hero-title', '.hero-desc', '.hero-actions', '.hero-stats'], {
            opacity: 0, y: 28,
          })
          gsap.set('.hero-right',  { opacity: 0, x: 40, scale: 0.96 })
          gsap.set('.hero-blob',   { opacity: 0 })

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
          tl.to('.hero-blob',     { opacity: 1, duration: 1.6, stagger: 0.2 }, 0)
          tl.to('.hero-badge',    { opacity: 1, y: 0, duration: 0.55 }, 0.25)
          tl.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.5  }, 0.4)
          tl.to('.hero-title',    { opacity: 1, y: 0, duration: 0.75 }, 0.55)
          tl.to('.hero-desc',     { opacity: 1, y: 0, duration: 0.65 }, 0.8)
          tl.to('.hero-actions',  { opacity: 1, y: 0, duration: 0.55 }, 1.0)
          tl.to('.hero-stats',    { opacity: 1, y: 0, duration: 0.55 }, 1.1)
          tl.to('.hero-right',    { opacity: 1, x: 0, scale: 1, duration: 0.85 }, 0.45)
        }, sectionRef)
      } catch {
        // Fallback : GSAP indisponible → tout visible immédiatement
        const section = sectionRef.current
        if (!section) return
        ALL_ANIM.forEach(sel =>
          section.querySelectorAll(sel).forEach(el => {
            el.style.opacity = '1'
            el.style.transform = 'none'
          })
        )
        section.querySelectorAll('.hero-blob').forEach(el => {
          el.style.opacity = '0.8'
        })
      }
    }

    animate()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="container-site">
        <div className="hero-content">

          {/* Left — texte */}
          <div className="hero-left">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              {t(h.badge, lang)}
            </span>

            <p className="hero-subtitle">{t(h.subtitle, lang)}</p>

            <h1 className="hero-title">
              <span className="text-gradient">{t(h.title1, lang)}{t(h.title2, lang)}</span>
              <br />{t(h.title3, lang)}
            </h1>

            <p className="hero-desc">{t(h.desc, lang)}</p>

            <div className="hero-actions">
              <a href="#cta" className="btn-primary">
                {t(h.cta1, lang)}
                <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn-outline">{t(h.cta2, lang)}</a>
            </div>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-number">{t(h.stat1n, lang)}</div>
                <div className="hero-stat-label">{t(h.stat1l, lang)}</div>
              </div>
              <div>
                <div className="hero-stat-number">{t(h.stat2n, lang)}</div>
                <div className="hero-stat-label">{t(h.stat2l, lang)}</div>
              </div>
              <div>
                <div className="hero-stat-number">{t(h.stat3n, lang)}</div>
                <div className="hero-stat-label">{t(h.stat3l, lang)}</div>
              </div>
            </div>
          </div>

          {/* Right — visuel */}
          <div className="hero-right" aria-hidden="true">
            <div className="hero-visual-card">
              <div className="hero-visual-ring hero-visual-ring-1" />
              <div className="hero-visual-ring hero-visual-ring-2" />
              <div className="hero-visual-inner">
                <PawPrint size={140} strokeWidth={1.25} />
              </div>
            </div>

            <div className="hero-bubble hero-bubble-1">
              <span className="hero-bubble-icon"><Star size={14} fill="currentColor" /></span>
              {t(h.bubble1, lang)}
            </div>

            <div className="hero-bubble hero-bubble-2">
              <span className="hero-bubble-icon"><Sparkles size={14} /></span>
              {t(h.bubble2, lang)}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
