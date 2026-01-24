import { NextRequest,NextResponse } from "next/server"

export async function POST(req:NextRequest){
 const {input,context}=await req.json()
 const t=input.toLowerCase()
 const s:any={}

 if(t.includes("bigger")){s.width=context.width+50;s.depth=context.depth+30}
 if(t.includes("smaller")){s.width=context.width-50;s.depth=context.depth-30}
 if(t.includes("taller")) s.height=context.height+20
 if(t.includes("shorter")) s.height=context.height-20

 if(t.includes("wood")) s.material="Wood"
 if(t.includes("metal")) s.material="Metal"
 if(t.includes("fabric")) s.material="Fabric"
 if(t.includes("leather")) s.material="Leather"

 if(t.includes("dark")) s.color="#3b2b26"
 if(t.includes("light")) s.color="#f1dfd1"
 if(t.includes("green")) s.color="#5b7c5a"
 if(t.includes("black")) s.color="#222222"

 const reply=Object.keys(s).length?"Updated your sofa":"Try: make it bigger, taller, darker, wood style"

 return NextResponse.json({reply,suggestions:s})
}
