'use client'
import { useLanguage } from '@/lib/LanguageContext'
import { translations as tr, t } from '@/lib/i18n'
import { PawPrint, MapPin, Phone, Mail, Clock, Instagram, Facebook, Music } from 'lucide-react'

export default function Footer() {
  const { lang } = useLanguage()
  const f = tr.footer

  return (
    <footer className="footer" id="contact">
      <div className="container-site">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div className="footer-brand-name">
              <div className="footer-brand-icon" aria-hidden="true">
                <PawPrint size={18} strokeWidth={2} />
              </div>
              PawFect Studio
            </div>
            <p className="footer-brand-desc">{t(f.desc, lang)}</p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.75} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <Facebook size={18} strokeWidth={1.75} />
              </a>
              <a href="#" className="footer-social-link" aria-label="TikTok">
                <Music size={18} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">{t(f.servicesTitle, lang)}</div>
            <ul className="footer-links-list">
              {f.services.map((s, i) => (
                <li key={i}>
                  <a href="#services" className="footer-link">{t(s, lang)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Salon */}
          <div>
            <div className="footer-col-title">{t(f.salonTitle, lang)}</div>
            <ul className="footer-links-list">
              {f.salon.map((s, i) => (
                <li key={i}>
                  <a href={['/a-propos', '/equipe', '/galerie', '/blog'][i]} className="footer-link">{t(s, lang)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">{t(f.contactTitle, lang)}</div>
            <div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <MapPin size={16} strokeWidth={1.75} />
                </span>
                <span>12 rue des Animaux, 75011 Paris</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <Phone size={16} strokeWidth={1.75} />
                </span>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <Mail size={16} strokeWidth={1.75} />
                </span>
                <span>hello@pawfect-studio.com</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <Clock size={16} strokeWidth={1.75} />
                </span>
                <span>Lun–Sam : 9h–19h</span>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{t(f.copy, lang)}</p>
          <div className="footer-badge">
            <PawPrint size={12} strokeWidth={2} aria-hidden="true" />
            <span className="footer-badge-dot" aria-hidden="true" />
            <span>{t(f.made, lang)}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
