'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    console.log('AdminGuard mounted')

    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user)

      if (!user) {
        console.log('No user, redirect to /login')
        router.replace('/login')
        return
      }

      try {
        console.log('Checking Firestore for UID:', user.uid)

        const ref = doc(db, 'users', user.uid)
        const snap = await getDoc(ref)

        console.log('Firestore snap exists:', snap.exists())

        if (!snap.exists()) {
          console.log('No user doc, redirect to /login')
          router.replace('/login')
          return
        }

        const data = snap.data()
        console.log('User data:', data)

        if (data?.role === 'admin') {
          console.log('ADMIN ACCESS GRANTED')
          setAllowed(true)
        } else {
          console.log('Not admin, redirect to /home')
          router.replace('/home')
        }
      } catch (err) {
        console.error('AdminGuard Firestore error:', err)
        router.replace('/login')
      } finally {
        setChecking(false)
      }
    })

    return () => unsub()
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Checking access...
      </div>
    )
  }

  if (!allowed) return null

  return <>{children}</>
}
