import Link from 'next/link'
import { Wordmark } from '@/components/brand/wordmark'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'

const cols = [
  {
    heading: 'Tools',
    links: [
      { href: '/compress-pdf', label: 'PDF Compressor' },
      { href: '/compress-image', label: 'Image Compressor' },
      { href: '/photo-signature', label: 'Photo & Signature' },
      { href: '/signature', label: 'Signature Tool' },
      { href: '/image-to-pdf', label: 'Image to PDF' },
      { href: '/pdf-to-image', label: 'PDF to Image' },
      { href: '/crop-rotate', label: 'Crop & Rotate' },
    ],
  },
  {
    heading: 'Popular guides',
    links: [
      { href: '/ssc-cgl-photo-size', label: 'SSC CGL' },
      { href: '/upsc-cse-photo-size', label: 'UPSC CSE' },
      { href: '/neet-ug-photo-size', label: 'NEET UG' },
      { href: '/us-visa-photo-size', label: 'US Visa' },
      { href: '/uk-visa-photo-size', label: 'UK Visa' },
      { href: '/compress-pdf-under-100kb', label: 'PDF < 100 KB' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/privacy/verify', label: 'Privacy Verify' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms' },
      { href: '/dpdp', label: 'DPDP Compliance' },
      { href: '/cookies', label: 'Cookie Policy' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="container-wide grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Wordmark size="md" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/70">
            Privacy-first PDF and image compression for Indian forms, exams, and visa applications.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.heading}>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-background/50">
              {col.heading}
            </h5>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as never}
                    className="text-sm text-background/80 transition-colors duration-fast hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <PrivacyLockup variant="footer" className="text-background/70" />
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} Compress4 · Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
