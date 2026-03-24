'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { initGSAP } from '@/lib/gsap'
import { PawPrint, Clock, CalendarDays, ArrowLeft, User } from 'lucide-react'

export default function BlogPost({ slug }) {
  const { lang } = useLanguage()
  const contentRef = useRef(null)
  const b = tr.blog
  const article = b.articles.find(a => a.slug === slug)

  useEffect(() => {
    let ctx
    async function animate() {
      try {
        const { gsap } = await initGSAP()
        ctx = gsap.context(() => {
          gsap.set('.post-hero-content', { opacity: 0, y: 24 })
          gsap.to('.post-hero-content', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          gsap.set('.post-body', { opacity: 0, y: 20 })
          gsap.to('.post-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 })
        }, contentRef)
      } catch {
        contentRef.current?.querySelectorAll('.post-hero-content, .post-body').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    }
    animate()
    return () => ctx?.revert()
  }, [])

  if (!article) {
    return (
      <div className="post-not-found">
        <div className="container-site">
          <p>{lang === 'fr' ? 'Article introuvable.' : 'Article not found.'}</p>
          <a href="/blog" className="btn-outline">
            <ArrowLeft size={16} />
            {t(b.backLink, lang)}
          </a>
        </div>
      </div>
    )
  }

  const body = article.body[lang] ?? article.body['fr']

  return (
    <div ref={contentRef}>
      {/* Hero */}
      <section className="post-hero">
        <div className="container-site">
          <div className="post-hero-content">
            <a href="/blog" className="post-back-link">
              <ArrowLeft size={16} />
              {t(b.backLink, lang)}
            </a>
            <span className="blog-card-category">{t(article.category, lang)}</span>
            <h1 className="post-title">{t(article.title, lang)}</h1>
            <div className="post-meta">
              <span className="post-meta-item">
                <CalendarDays size={15} strokeWidth={1.75} />
                {article.date}
              </span>
              <span className="post-meta-item">
                <Clock size={15} strokeWidth={1.75} />
                {article.readTime} {t(b.readTime, lang)}
              </span>
              <span className="post-meta-item">
                <User size={15} strokeWidth={1.75} />
                {article.author.name}
              </span>
            </div>
          </div>
        </div>

        {/* Illustration hero */}
        <div className="post-hero-visual" aria-hidden="true">
          <PawPrint size={120} strokeWidth={0.75} />
        </div>
      </section>

      {/* Body */}
      <section className="post-section">
        <div className="container-site">
          <div className="post-layout">
            <article className="post-body">
              {body.map((block, i) => {
                if (block.type === 'h2') return <h2 key={i} className="post-h2">{block.text}</h2>
                if (block.type === 'p')  return <p  key={i} className="post-p">{block.text}</p>
                return null
              })}
            </article>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="post-author-card">
                <div className="post-author-avatar">
                  {article.author.name.charAt(0)}
                </div>
                <div className="post-author-name">{article.author.name}</div>
                <div className="post-author-role">{t(article.author.role, lang)}</div>
              </div>

              <div className="post-sidebar-nav">
                <div className="post-sidebar-nav-title">
                  {lang === 'fr' ? 'Autres articles' : 'Other articles'}
                </div>
                {b.articles
                  .filter(a => a.slug !== slug)
                  .map(a => (
                    <a key={a.slug} href={`/blog/${a.slug}`} className="post-sidebar-link">
                      <span className="blog-card-category">{t(a.category, lang)}</span>
                      <span className="post-sidebar-link-title">{t(a.title, lang)}</span>
                    </a>
                  ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
