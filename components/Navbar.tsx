'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `relative px-1 transition ${
      pathname === path
        ? 'text-[#c46a57] font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#c46a57]'
        : 'text-gray-700 hover:text-[#c46a57]'
    }`

  return (
    <header className="sticky top-0 z-50 bg-[#f8f4f0]/90 backdrop-blur border-b border-black/5">
      <div className="flex items-center justify-between px-10 py-5">
        <Link href="/" className="text-2xl font-bold text-[#c46a57]">
          Morphara
        </Link>

        <nav className="flex gap-8 text-sm">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
          <Link href="/catalog" className={linkClass('/catalog')}>
            Catalog
          </Link>
          <Link href="/custom" className={linkClass('/custom')}>
            Custom
          </Link>
          <Link href="/account" className={linkClass('/account')}>
            Account
          </Link>
        </nav>
      </div>
    </header>
  )
}
