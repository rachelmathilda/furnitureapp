'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Paytone_One } from 'next/font/google'

const paytoneOne = Paytone_One({
  subsets: ['latin'],
  weight: '400',
})

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Password does not match')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/login')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#C3705D] relative flex items-center justify-center overflow-hidden">
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

      <div className="flex items-center justify-between w-full max-w-6xl px-12">
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

        <div className="bg-white w-[520px] h-[90vh] rounded-2xl shadow-xl px-12 flex items-center justify-center">
          <div className="w-full h-[90%] flex flex-col justify-start mt-2">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-light text-gray-700">
                    Make an Account
                </h1>

                <button
                    onClick={() => router.push('/login')}
                    className="text-[#C5705D] font-bold text-sm hover:opacity-80 transition"
                >
                    Login
                </button>
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">
                E-mail
              </label>
              <input
                className="w-full border-b border-gray-400 focus:outline-none py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border-b border-gray-400 focus:outline-none py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border-b border-gray-400 focus:outline-none py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="text-center text-sm text-gray-500 mb-2">
              Or sign up with
            </div>

            <div className="flex justify-center gap-6 mb-4">
              <button className="w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.6 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.6 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.6-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6 6.9l6.2 5.2C39.4 36.4 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
                  />
                </svg>
              </button>

              <button className="w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-[#C3705D] hover:opacity-90 transition text-white py-4 rounded-xl text-lg mt-1"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
