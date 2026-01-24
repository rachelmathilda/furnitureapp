'use client'
import Navbar from "@/components/Navbar"
export default function LandingPage() {
  return (
    <main
      className="fixed inset-0 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <Navbar/>
      <div className="h-full w-full flex items-center justify-center">
        <h1
          className="text-[120px] font-paytone"
          style={{ color: "#C5705D" }}
        >
          Morphara
        </h1>
      </div>
    </main>
  )
}
