import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/products start')

    await dbConnect()
    console.log('Mongo connected')

    const products = await Product.find().sort({ createdAt: -1 })
    console.log('Products count:', products.length)

    return NextResponse.json(products)
  } catch (err: any) {
    console.error('GET /api/products FAILED:', err?.message || err)
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/products start')

    await dbConnect()
    const body = await request.json()
    console.log('Body:', body)

    const product = await Product.create(body)
    console.log('Created product:', product._id)

    return NextResponse.json(product)
  } catch (err: any) {
    console.error('POST /api/products FAILED:', err?.message || err)
    return NextResponse.json(
      { error: err?.message || 'Create failed' },
      { status: 500 }
    )
  }
}
