'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { PawPrint, X } from 'lucide-react'

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Verrouille le scroll body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const n = tr.nav

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container-site">
          <div className="navbar-inner">

            {/* Logo */}
            <a href="/" className="nav-logo">
              <div className="nav-logo-icon" aria-hidden="true">
                <PawPrint size={20} strokeWidth={2.5} />
              </div>
              PawFect Studio
            </a>

            {/* Liens desktop */}
            <ul className="nav-links">
              <li><a href="/#services" className="nav-link">{t(n.services, lang)}</a></li>
              <li><a href="/a-propos"  className="nav-link">{t(n.about, lang)}</a></li>
              <li><a href="/equipe"    className="nav-link">{t(n.team, lang)}</a></li>
              <li><a href="/blog"      className="nav-link">{t(n.blog, lang)}</a></li>
              <li><a href="/#contact"  className="nav-link">{t(n.contact, lang)}</a></li>
            </ul>

            {/* Droite desktop */}
            <div className="nav-right">
              <div className="lang-switcher" aria-label="Choisir la langue">
                <button
                  className={`lang-btn${lang === 'fr' ? ' active' : ''}`}
                  onClick={() => setLang('fr')}
                >
                  FR
                </button>
                <button
                  className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
              </div>

              <a href="/#cta" className="btn-primary nav-cta">{t(n.book, lang)}</a>

              <button
                className="nav-burger"
                onClick={() => setMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
              >
                <span className="nav-burger-line" />
                <span className="nav-burger-line" />
                <span className="nav-burger-line" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-mobile-overlay${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer mobile */}
      <div
        className={`nav-mobile-drawer${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="nav-mobile-header">
          <a href="/" className="nav-logo" onClick={closeMenu}>
            <div className="nav-logo-icon" aria-hidden="true">
              <PawPrint size={18} strokeWidth={2.5} />
            </div>
            PawFect Studio
          </a>
          <button
            className="nav-mobile-close"
            onClick={closeMenu}
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nav-mobile-links">
          <a href="/#services" className="nav-mobile-link" onClick={closeMenu}>{t(n.services, lang)}</a>
          <a href="/a-propos"  className="nav-mobile-link" onClick={closeMenu}>{t(n.about, lang)}</a>
          <a href="/equipe"    className="nav-mobile-link" onClick={closeMenu}>{t(n.team, lang)}</a>
          <a href="/blog"      className="nav-mobile-link" onClick={closeMenu}>{t(n.blog, lang)}</a>
          <a href="/#contact"  className="nav-mobile-link" onClick={closeMenu}>{t(n.contact, lang)}</a>
        </nav>

        <a href="/#cta" className="btn-primary nav-mobile-cta" onClick={closeMenu}>
          {t(n.book, lang)}
        </a>

        <div className="lang-switcher nav-mobile-lang">
          <button
            className={`lang-btn${lang === 'fr' ? ' active' : ''}`}
            onClick={() => setLang('fr')}
          >
            FR
          </button>
          <button
            className={`lang-btn${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
      </div>
    </>
  )
}
