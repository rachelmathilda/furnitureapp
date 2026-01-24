import "./globals.css"
import { Paytone_One, Inter } from "next/font/google"

const paytone = Paytone_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-paytone"
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${paytone.variable} ${inter.variable} h-full`}>
      <body className="h-full font-inter">
        {children}
      </body>
    </html>
  )
}
