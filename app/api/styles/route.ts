import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Style from '@/models/Style'

export async function GET() {
  await dbConnect()
  const styles = await Style.find().sort({ order: 1 })
  return NextResponse.json(styles)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const style = await Style.create(body)
  return NextResponse.json(style)
}
