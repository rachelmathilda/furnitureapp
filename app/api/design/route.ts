import { NextRequest, NextResponse } from "next/server"

let designs:any[] = []

export async function POST(req:NextRequest){
  const body = await req.json()
  const id = Date.now().toString()
  designs.push({id,...body})
  return NextResponse.json({success:true,id})
}

export async function GET(){
  return NextResponse.json(designs)
}
