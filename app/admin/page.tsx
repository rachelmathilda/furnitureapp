'use client'

import AdminGuard from '@/components/AdminGuard'
import AdminProducts from '@/components/AdminProducts'

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminProducts />
    </AdminGuard>
  )
}
