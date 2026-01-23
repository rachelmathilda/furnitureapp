'use client'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const [hotItems, setHotItems] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [style, setStyle] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const load = async () => {
      const q1 = query(collection(db, 'products'), where('hot', '==', true))
      const q2 = style ? query(collection(db, 'products'), where('style', '==', style)) : query(collection(db, 'products'))
      const hotSnap = await getDocs(q1)
      const prodSnap = await getDocs(q2)
      setHotItems(hotSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    }
    load()
  }, [style])

  useEffect(() => {
    const end = new Date().setHours(23,59,59,999)
    const timer = setInterval(() => {
      const now = Date.now()
      const diff = end - now
      setTimeLeft(diff > 0 ? diff : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const h = String(Math.floor(timeLeft / 3600000)).padStart(2,'0')
  const m = String(Math.floor((timeLeft % 3600000) / 60000)).padStart(2,'0')
  const s = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2,'0')

  return (
    <main className="min-h-screen bg-[#f8f4f0]">
      <Navbar />

      <section className="mx-10 my-6 rounded-full bg-[#e4d8c8] h-[220px] flex items-center justify-end px-16">
        <div className="relative w-[260px] h-[160px]">
          <Image src="/hero-sofa.png" alt="sofa" fill className="object-contain" />
        </div>
      </section>

      <section className="px-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Hot Items!!</h2>
          <div className="flex gap-2 bg-black text-white px-4 py-1 rounded-lg text-sm">
            <span>{h}</span>:<span>{m}</span>:<span>{s}</span>
          </div>
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
        <div className="flex gap-3 mb-4">
          {['Classic','Vintage','Minimalist','Industrial','Japandi','Rustic','Bohemian'].map(s => (
            <button key={s} onClick={()=>setStyle(s)} className={`px-4 py-2 rounded-lg text-sm ${style===s?'bg-[#c46a57] text-white':'bg-[#f2e9df]'}`}>{s}</button>
          ))}
          <button onClick={()=>setStyle('')} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">All</button>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {products.slice(0,5).map(p => (
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

      <footer className="mt-16 h-[120px] bg-[#c46a57]" />
    </main>
  )
}
