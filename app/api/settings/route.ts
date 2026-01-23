import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Setting from '@/models/Setting'

export async function GET() {
  await dbConnect()
  const setting = await Setting.findOne()
  return NextResponse.json(setting)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()

  let setting = await Setting.findOne()
  if (!setting) {
    setting = await Setting.create(body)
  } else {
    setting.flashSaleEndsAt = body.flashSaleEndsAt
    setting.flashSaleActive = body.flashSaleActive
    await setting.save()
  }

  return NextResponse.json(setting)
}
