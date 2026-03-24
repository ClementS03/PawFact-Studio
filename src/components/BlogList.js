'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { PawPrint, Clock, ArrowRight, CalendarDays } from 'lucide-react'

export default function BlogList() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const b = tr.blog

  useEffect(() => {
    let ctx
    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          gsap.set('.blog-hero-content', { opacity: 0, y: 32 })
          gsap.to('.blog-hero-content', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })

          const cards = sectionRef.current?.querySelectorAll('.blog-card')
          if (cards) {
            gsap.set(cards, { opacity: 0, y: 28 })
            gsap.to(cards, {
              opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            })
          }
        }, sectionRef)
      } catch {
        sectionRef.current?.querySelectorAll('.blog-hero-content, .blog-card').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }
    animate()
    return () => ctx?.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="blog-hero">
        <div className="container-site">
          <div className="blog-hero-content">
            <span className="section-eyebrow">
              <PawPrint size={14} />
              {t(b.eyebrow, lang)}
            </span>
            <h1 className="blog-hero-title">{t(b.title, lang)}</h1>
            <p className="blog-hero-desc">{t(b.desc, lang)}</p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="blog-list-section">
        <div className="container-site">
          <div className="blog-grid">
            {b.articles.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="blog-card"
              >
                <div className="blog-card-thumb" style={{ '--thumb-color': article.body[lang]?.[0] ? '#' : undefined }}>
                  <div className="blog-card-thumb-inner" aria-hidden="true">
                    <PawPrint size={48} strokeWidth={1} />
                  </div>
                  <span className="blog-card-category">{t(article.category, lang)}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-meta-item">
                      <CalendarDays size={13} strokeWidth={1.75} />
                      {article.date}
                    </span>
                    <span className="blog-card-meta-item">
                      <Clock size={13} strokeWidth={1.75} />
                      {article.readTime} {t(b.readTime, lang)}
                    </span>
                  </div>
                  <h2 className="blog-card-title">{t(article.title, lang)}</h2>
                  <p className="blog-card-excerpt">{t(article.excerpt, lang)}</p>
                  <div className="blog-card-cta">
                    <span>{lang === 'fr' ? 'Lire l\'article' : 'Read article'}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
