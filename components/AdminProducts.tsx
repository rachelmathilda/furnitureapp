'use client'

import { useEffect, useState } from 'react'

type Product = {
  _id?: string
  name: string
  price: number
  flashPrice?: number
  style: string
  image: string
  isFlashSale: boolean
  flashEnd?: string
}

const emptyProduct: Product = {
  name: '',
  price: 0,
  flashPrice: 0,
  style: 'Classic',
  image: '',
  isFlashSale: false,
  flashEnd: '',
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<Product>(emptyProduct)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const loadProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const submit = async () => {
    setLoading(true)

    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/products?id=${editingId}` : '/api/products'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setForm(emptyProduct)
    setEditingId(null)
    setLoading(false)
    loadProducts()
  }

  const edit = (p: Product) => {
    setForm({
      name: p.name,
      price: p.price,
      flashPrice: p.flashPrice || 0,
      style: p.style,
      image: p.image,
      isFlashSale: p.isFlashSale,
      flashEnd: p.flashEnd || '',
    })
    setEditingId(p._id!)
  }

  const del = async (id: string) => {
    if (!confirm('Delete product?')) return
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    loadProducts()
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Products</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-10 grid grid-cols-2 gap-4">
        <input
          className="border rounded px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          type="number"
          className="border rounded px-3 py-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />

        <select
          className="border rounded px-3 py-2"
          value={form.style}
          onChange={(e) => setForm({ ...form, style: e.target.value })}
        >
          <option>Classic</option>
          <option>Japandi</option>
          <option>Minimalist</option>
          <option>Modern</option>
          <option>Scandinavian</option>
        </select>

        <div className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            checked={form.isFlashSale}
            onChange={(e) =>
              setForm({ ...form, isFlashSale: e.target.checked })
            }
          />
          <span>Flash Sale</span>
        </div>

        {form.isFlashSale && (
          <>
            <input
              type="number"
              className="border rounded px-3 py-2"
              placeholder="Flash Price"
              value={form.flashPrice}
              onChange={(e) =>
                setForm({
                  ...form,
                  flashPrice: Number(e.target.value),
                })
              }
            />

            <input
              type="datetime-local"
              className="border rounded px-3 py-2"
              value={form.flashEnd}
              onChange={(e) =>
                setForm({ ...form, flashEnd: e.target.value })
              }
            />
          </>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="col-span-2 bg-black text-white rounded-lg py-3 hover:bg-gray-800 transition"
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <img
              src={p.image}
              className="h-40 object-cover rounded mb-3"
            />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.style}</p>

            <div className="mt-2">
              {p.isFlashSale ? (
                <>
                  <p className="line-through text-gray-400">
                    Rp {p.price.toLocaleString()}
                  </p>
                  <p className="text-red-600 font-bold">
                    Rp {p.flashPrice?.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="font-bold">
                  Rp {p.price.toLocaleString()}
                </p>
              )}
            </div>

            {p.isFlashSale && p.flashEnd && (
              <p className="text-xs text-red-500 mt-1">
                Ends: {new Date(p.flashEnd).toLocaleString()}
              </p>
            )}

            <div className="mt-auto flex gap-2 pt-4">
              <button
                onClick={() => edit(p)}
                className="flex-1 border rounded py-1 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => del(p._id!)}
                className="flex-1 border border-red-400 text-red-600 rounded py-1 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
