"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg ${
      pathname === path ? "bg-black text-white" : "hover:bg-gray-200"
    }`

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-paytone"
          style={{ color: "#C5705D" }}
        >
          Morphara
        </Link>

        <div className="flex gap-2 items-center font-inter">
          <Link href="/home" className={linkClass("/home")}>
            Home
          </Link>
          <Link href="/catalog" className={linkClass("/catalog")}>
            Catalog
          </Link>
          <Link href="/custom" className={linkClass("/custom")}>
            Custom
          </Link>
          <Link href="/account" className={linkClass("/account")}>
            Account
          </Link>
        </div>
      </div>
    </nav>
  )
}
