"use client"
import { useEffect, useRef, useState } from "react"
import { Move3D, Maximize2, Droplet, Layers, Download, Save, Eye, Plus, Minus } from "lucide-react"

export default function CustomPage(){
 const iframeRef = useRef<HTMLIFrameElement>(null)
 const post = (msg:any)=> iframeRef.current?.contentWindow?.postMessage(msg,"*")

 const [w,setW]=useState(220)
 const [h,setH]=useState(90)
 const [d,setD]=useState(140)
 const [color,setColor]=useState("#c5705d")
 const [mode,setMode]=useState<"move"|"resize"|"sculpt"|"export"|"save"|"plus"|"minus">("move")

 useEffect(()=>{ post({type:"rebuild",value:{w,h,d}}) },[w,h,d])
 useEffect(()=>{ post({type:"color",value:color}) },[color])
 useEffect(()=>{ post({type:"mode",value:mode}) },[mode])

 return(
  <div className="relative h-screen w-screen overflow-hidden bg-black">
   <iframe ref={iframeRef} src="/viewer.html" className="absolute inset-0 w-full h-full border-0"/>

   <div className="absolute left-6 top-2 bg-white text-black rounded-2xl shadow p-3 flex flex-col gap-4">
    <button
    onClick={()=>setMode("move")}
    className={`p-2 rounded ${mode==="move"?"bg-black text-white":"bg-white text-black"}`}
    ><Move3D/></button>

    <button
    onClick={()=>setMode("resize")}
    className={`p-2 rounded ${mode==="resize"?"bg-black text-white":"bg-white text-black"}`}
    ><Maximize2/></button>

    <button
    onClick={()=>setMode("sculpt")}
    className={`p-2 rounded ${mode==="sculpt"?"bg-black text-white":"bg-white text-black"}`}
    ><Droplet/></button>
    <button onClick={()=>post({type:"parts",value:"seat"})} title="Seat"><Layers/></button>
    <button onClick={()=>post({type:"parts",value:"back"})} title="Back"><Layers/></button>
    <button onClick={()=>post({type:"parts",value:"arm"})} title="Arm"><Layers/></button> 
    <button onClick={()=>post({type:"export"})} className={`p-2 rounded ${mode==="export"?"bg-black text-white":"bg-white text-black"}`} title="Export"><Download/></button>
    <button onClick={()=>post({type:"save"})} className={`p-2 rounded ${mode==="save"?"bg-black text-white":"bg-white text-black"}`} title="Save"><Save/></button>
    <button onClick={()=>post({type:"zoom",value:1})} className={`p-2 rounded ${mode==="plus"?"bg-black text-white":"bg-white text-black"}`} title="Zoom In"><Plus/></button>
    <button onClick={()=>post({type:"zoom",value:-1})} className={`p-2 rounded ${mode==="minus"?"bg-black text-white":"bg-white text-black"}`} title="Zoom Out"><Minus/></button>
   </div>

   <div className="absolute right-6 top-24 bg-white text-black rounded-2xl shadow p-4 w-64">
    <h3 className="font-semibold mb-2">Sofa</h3>
    <div className="text-sm mb-2">Width {w}</div>
    <input type="range" min="160" max="360" value={w} onChange={e=>setW(+e.target.value)} className="w-full"/>
    <div className="text-sm mb-2 mt-3">Height {h}</div>
    <input type="range" min="70" max="160" value={h} onChange={e=>setH(+e.target.value)} className="w-full"/>
    <div className="text-sm mb-2 mt-3">Depth {d}</div>
    <input type="range" min="100" max="260" value={d} onChange={e=>setD(+e.target.value)} className="w-full"/>
    <div className="text-sm mb-2 mt-3">Color</div>
    <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-full h-10"/>
   </div>

   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black rounded-2xl shadow p-4 flex items-center gap-3 w-[500px]">
    <input
      className="flex-1 border rounded-lg px-3 py-2"
      placeholder="Ask co-pilot..."
      onKeyDown={e=>{
        if(e.key==="Enter"){
        post({type:"copilot",value:(e.target as HTMLInputElement).value.toLowerCase()})
        ;(e.target as HTMLInputElement).value=""
        }
      }}
    />
    <button className="bg-black text-white px-4 py-2 rounded-lg"><Eye/></button>
   </div>
  </div>
 )
}
