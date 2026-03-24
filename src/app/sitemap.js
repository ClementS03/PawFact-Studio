import { translations as tr } from '@/lib/i18n'

export default function sitemap() {
  const base = 'https://pawfect-studio.com'
  const blogEntries = tr.blog.articles.map(a => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: base,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/blog`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/equipe`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/galerie`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...blogEntries,
  ]
}
