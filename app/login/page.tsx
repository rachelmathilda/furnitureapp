'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Paytone_One } from 'next/font/google'

const paytoneOne = Paytone_One({
  subsets: ['latin'],
  weight: '400',
})

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C8745F] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#EAD7C5] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[#E3C4AE] -translate-x-1/2 translate-y-1/2" />

      <div
        onClick={() => router.push('/home')}
        className={`absolute top-10 left-12 text-white text-3xl tracking-wide 
          cursor-pointer select-none
          transition-transform duration-200 ease-out
          hover:scale-[1.06]
          ${paytoneOne.className}`}
      >
        Morphara
      </div>

      <div className="relative z-10 flex items-center gap-16">
        <div className="rounded-[60px] p-10 w-[420px] h-[420px] flex items-center justify-center">
          <Image
            src="/lr-illustration.png"
            alt="illustration"
            width={360}
            height={360}
            priority
            className="scale-[1.4]"
          />
        </div>

        <div className="bg-white w-[520px] h-[85vh] rounded-2xl shadow-xl px-12 py-10 flex items-start justify-center overflow-hidden">
          <div className="w-full h-full flex flex-col mt-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-light text-gray-700">
              Welcome Back!
            </h1>

            <button
              onClick={() => router.push('/register')}
              className="text-[#C5705D] font-bold text-sm hover:opacity-80 transition"
            >
              Register
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Username/ E-mail</label>
              <input
                className="w-full border-b border-gray-400 focus:outline-none py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                className="w-full border-b border-gray-400 focus:outline-none py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}
          </div>

          <div className="mt-2">
            <div className="text-center text-sm text-gray-500 mb-3">Or log in with</div>

            <div className="flex items-center justify-center gap-8 mb-6">
              <button className="w-12 h-12 rounded-full flex items-center justify-center shadow-md shadow-black/10">
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.4c-.54 2.9-2.18 5.36-4.64 7.04l7.55 5.86C43.82 37.36 46.1 31.45 46.1 24.5z"/>
                  <path fill="#FBBC05" d="M10.54 28.41c-.48-1.44-.76-2.97-.76-4.41s.27-2.97.76-4.41l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.6l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.55-5.86c-2.1 1.41-4.78 2.24-8.35 2.24-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full flex items-center justify-center shadow-md shadow-black/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                </svg>
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#C3705D] hover:opacity-90 transition text-white py-4 rounded-xl text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
