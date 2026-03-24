'use client'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { PawPrint } from 'lucide-react'

export default function Gallery() {
  const { lang } = useLanguage()
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const g = tr.gallery

  const filtered = activeFilter === 'all'
    ? g.photos
    : g.photos.filter(p => p.category === activeFilter)

  useEffect(() => {
    let ctx
    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          gsap.set('.gallery-hero-content', { opacity: 0, y: 28 })
          gsap.to('.gallery-hero-content', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        }, sectionRef)
      } catch {
        sectionRef.current?.querySelector('.gallery-hero-content')?.style && (sectionRef.current.querySelector('.gallery-hero-content').style.opacity = '1')
      }
    }
    animate()
    return () => ctx?.revert()
  }, [])

  // Animate grid items on filter change
  useEffect(() => {
    if (!gridRef.current) return
    let ctx
    async function animateGrid() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          const items = gridRef.current.querySelectorAll('.gallery-item')
          gsap.fromTo(items,
            { opacity: 0, scale: 0.95, y: 16 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
          )
        }, gridRef)
      } catch {
        gridRef.current?.querySelectorAll('.gallery-item').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }
    animateGrid()
    return () => ctx?.revert()
  }, [activeFilter])

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="gallery-hero">
        <div className="container-site">
          <div className="gallery-hero-content">
            <span className="section-eyebrow">
              <PawPrint size={14} />
              {t(g.eyebrow, lang)}
            </span>
            <h1 className="gallery-hero-title">{t(g.title, lang)}</h1>
            <p className="gallery-hero-desc">{t(g.desc, lang)}</p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="gallery-section">
        <div className="container-site">
          {/* Filters */}
          <div className="gallery-filters" role="group" aria-label={lang === 'fr' ? 'Filtrer par catégorie' : 'Filter by category'}>
            {g.filters.map(filter => (
              <button
                key={filter.key}
                className={`gallery-filter-btn${activeFilter === filter.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {t(filter.label, lang)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid" ref={gridRef}>
            {filtered.map((photo) => (
              <div key={photo.id} className="gallery-item">
                <div
                  className="gallery-item-inner"
                  style={{ '--gallery-color': photo.color }}
                  role="img"
                  aria-label={t(photo.alt, lang)}
                >
                  <div className="gallery-item-bg" aria-hidden="true">
                    <PawPrint size={64} strokeWidth={0.75} />
                  </div>
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-caption">{t(photo.caption, lang)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="gallery-empty">
              <PawPrint size={40} strokeWidth={1} />
              <p>{lang === 'fr' ? 'Aucune photo dans cette catégorie.' : 'No photos in this category.'}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
