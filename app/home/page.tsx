'use client'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

const STYLES = [
  "Classic",
  "Modern",
  "Minimalist",
  "Scandinavian",
  "Industrial",
  "Bohemian",
  "Vintage",
  "Rustic",
  "Contemporary",
  "Japandi",
  "Mid-Century",
  "Luxury",
]

export default function HomePage() {
  const [hotItems, setHotItems] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [shuffled, setShuffled] = useState<any[]>([])
  const [style, setStyle] = useState('')
  const [flashType, setFlashType] = useState('')
  const [flashTypes, setFlashTypes] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const load = async () => {
      const baseHotQuery = query(collection(db, 'products'), where('hot', '==', true))
      const hotQuery = flashType
        ? query(collection(db, 'products'), where('hot', '==', true), where('type', '==', flashType))
        : baseHotQuery

      const styleQuery = style
        ? query(collection(db, 'products'), where('style', '==', style))
        : query(collection(db, 'products'))

      const [hotSnap, prodSnap, allSnap] = await Promise.all([
        getDocs(hotQuery),
        getDocs(styleQuery),
        getDocs(baseHotQuery)
      ])

      const hot = hotSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      const prod = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      const allHot = allSnap.docs.map(d => d.data())

      const types = Array.from(new Set(allHot.map((i:any) => i.type).filter(Boolean)))

      setHotItems(hot)
      setProducts(prod)
      setShuffled(prod)
      setFlashTypes(types)
    }

    load()
  }, [style, flashType])

  useEffect(() => {
    const end = new Date().setHours(23,59,59,999)
    const timer = setInterval(() => {
      const now = Date.now()
      const diff = end - now
      setTimeLeft(diff > 0 ? diff : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const shuffleProducts = () => {
    const arr = [...products]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setShuffled(arr)
  }

  const h = String(Math.floor(timeLeft / 3600000)).padStart(2,'0')
  const m = String(Math.floor((timeLeft % 3600000) / 60000)).padStart(2,'0')
  const s = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2,'0')

  return (
    <main className="min-h-screen bg-[#f8f4f0]">
      <Navbar />

      <section className="mx-10 my-6 rounded-[80px] bg-[#e4d8c8] h-[260px] flex items-center justify-end px-20">
        <div className="relative w-[340px] h-[200px]">
          <Image src="/hero-sofa.png" alt="sofa" fill className="object-contain" />
        </div>
      </section>

      <section className="px-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Hot Items!!</h2>
          <div className="flex gap-2 bg-black text-white px-4 py-1 rounded-lg text-sm">
            <span>{h}</span>:<span>{m}</span>:<span>{s}</span>
          </div>
        </div>

        <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setFlashType('')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${flashType===''?'bg-[#c46a57] text-white':'bg-[#f2e9df]'}`}
          >
            All
          </button>
          {flashTypes.map(t => (
            <button
              key={t}
              onClick={() => setFlashType(t)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${flashType===t?'bg-[#c46a57] text-white':'bg-[#f2e9df]'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-10 gap-4 mb-6">
          {hotItems.map(i => (
            <div key={i.id} className="bg-[#f2e9df] rounded-xl p-3 text-center text-sm">
              <Image src={i.image} alt={i.name} width={80} height={80} className="mx-auto" />
              <p>{i.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-6">
          {hotItems.map(i => (
            <div key={i.id} className="bg-[#d9c4b4] rounded-xl overflow-hidden">
              <div className="relative h-[180px]">
                <Image src={i.image} alt={i.name} fill className="object-contain" />
              </div>
              <div className="bg-black text-white px-4 py-2 flex justify-between text-sm">
                <span>$ {i.price}</span>
                <span>{i.sold} terjual</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 mt-10">
        <h2 className="text-lg font-semibold mb-4">We'll Find The Suitable Furniture for Your Room</h2>

        <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide">
          {STYLES.map(s => (
            <button
              key={s}
              onClick={()=>{setStyle(s); shuffleProducts()}}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${style===s?'bg-[#c46a57] text-white':'bg-[#f2e9df]'}`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={()=>{setStyle(''); shuffleProducts()}}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm whitespace-nowrap"
          >
            All
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 w-full">
            <select className="flex-1 border rounded-lg px-4 py-2">
              <option>Room</option>
            </select>
            <select className="flex-1 border rounded-lg px-4 py-2">
              <option>Wall Color</option>
            </select>
          </div>
          <button onClick={shuffleProducts} className="ml-4 flex items-center gap-2 text-sm">
            Shuffle ↻
          </button>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {shuffled.slice(0,5).map(p => (
            <div key={p.id} className="bg-[#d9c4b4] rounded-xl overflow-hidden">
              <div className="relative h-[180px]">
                <Image src={p.image} alt={p.name} fill className="object-contain" />
              </div>
              <div className="bg-black text-white px-4 py-2 text-sm">$ {p.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">You Can Build Your Dream Rooms!</h2>
          <button className="bg-[#c46a57] text-white px-6 py-2 rounded-lg">Custom your Furniture</button>
        </div>
        <div className="h-[200px] bg-cover bg-center rounded-xl" style={{ backgroundImage: 'url(/room.jpg)' }} />
      </section>

      <footer className="mt-16 bg-[#c46a57] text-white px-10 py-12">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-2">Morphara</h3>
            <p className="text-sm opacity-90">
              Morphara is a modern furniture brand focused on bringing comfort,
              aesthetics, and smart customization into your living space.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-sm opacity-80 text-center">
          © {new Date().getFullYear()} Morphara. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
