"use client"
import { useEffect, useRef, useState } from "react"
import { Move3D, Maximize2, Droplet, Layers, Download, Save, Eye, RotateCw, Scale3D } from "lucide-react"
import { Plus, Minus } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function CustomPage(){
 const iframeRef=useRef<HTMLIFrameElement>(null)

 const handleParts=()=>{
  iframeRef.current?.contentWindow?.postMessage({type:"parts"},"*")
 }

 const handleExport=()=>{
  iframeRef.current?.contentWindow?.postMessage({type:"export"},"*")
 }

 const handleSave=()=>{
  iframeRef.current?.contentWindow?.postMessage({type:"save"},"*")
 }

 const [w,setW]=useState(200)
 const [h,setH]=useState(90)
 const [d,setD]=useState(90)
 const [color,setColor]=useState("#c5705d")
 const [mode,setMode]=useState<"move"|"resize"|"sculpt"|"rotate"|"scale">("move")

 const [brushRadius,setBrushRadius]=useState(0.6)
 const [brushStrength,setBrushStrength]=useState(0.15)

 const [prompt,setPrompt]=useState("")

 const rebuild=()=>{
  iframeRef.current?.contentWindow?.postMessage({
   type:"rebuild",
   value:{w,h,d}
  },"*")
 }

 useEffect(()=>{ rebuild() },[w,h,d])

 useEffect(()=>{
  iframeRef.current?.contentWindow?.postMessage({
   type:"color",
   value:color
  },"*")
 },[color])

 useEffect(()=>{
  iframeRef.current?.contentWindow?.postMessage({
   type:"mode",
   value:mode
  },"*")
 },[mode])

 useEffect(()=>{
  iframeRef.current?.contentWindow?.postMessage({
   type:"brush",
   value:{radius:brushRadius,strength:brushStrength}
  },"*")
 },[brushRadius,brushStrength])

 const sendCopilot=()=>{
  const text = prompt.toLowerCase()

  if(text.includes("bigger")) setW(w+50)
  if(text.includes("smaller")) setW(w-50)
  if(text.includes("taller")) setH(h+20)
  if(text.includes("shorter")) setH(h-20)
  if(text.includes("deeper")) setD(d+20)
  if(text.includes("lighter")) setColor("#e0a58a")
  if(text.includes("darker")) setColor("#8a3f2f")

  if(text.includes("sculpt")) setMode("sculpt")
  if(text.includes("move")) setMode("move")
  if(text.includes("resize")) setMode("resize")
  if(text.includes("rotate")) setMode("rotate")
  if(text.includes("scale")) setMode("scale")

  iframeRef.current?.contentWindow?.postMessage({
   type:"copilot",
   value:text
  },"*")

  setPrompt("")
 }

 return(
<>
<Navbar/>
  <div className="relative h-screen w-screen overflow-hidden bg-[#f5f2ef]">
   <iframe ref={iframeRef} src="/viewer.html" className="absolute inset-0 w-full h-full border-0"/>

   <div className="absolute left-6 top-24 bg-white rounded-2xl shadow p-3 flex flex-col gap-4">
    <button onClick={()=>setMode("move")} title="Move"><Move3D/></button>
    <button onClick={()=>setMode("resize")} title="Resize"><Maximize2/></button>
    <button onClick={()=>setMode("sculpt")} title="Sculpt"><Droplet/></button>
    <button onClick={()=>setMode("rotate")} title="Rotate"><RotateCw/></button>
    <button onClick={()=>setMode("scale")} title="Scale"><Scale3D/></button>
    <button onClick={handleParts} title="Parts"><Layers/></button>
    <button onClick={handleExport} title="Export"><Download/></button>
    <button onClick={handleSave} title="Save"><Save/></button>
    <button onClick={()=>iframeRef.current?.contentWindow?.postMessage({type:"zoom",value:1},"*")} title="Zoom In">
     <Plus/>
    </button>
    <button onClick={()=>iframeRef.current?.contentWindow?.postMessage({type:"zoom",value:-1},"*")} title="Zoom Out">
     <Minus/>
    </button>
   </div>

   <div className="absolute right-6 top-24 bg-white rounded-2xl shadow p-4 w-64">
    <h3 className="font-semibold mb-2">Details</h3>

    <div className="text-sm mb-2">Width {w}</div>
    <input type="range" min="100" max="400" value={w} onChange={e=>setW(+e.target.value)} className="w-full"/>

    <div className="text-sm mb-2 mt-3">Height {h}</div>
    <input type="range" min="50" max="200" value={h} onChange={e=>setH(+e.target.value)} className="w-full"/>

    <div className="text-sm mb-2 mt-3">Depth {d}</div>
    <input type="range" min="50" max="200" value={d} onChange={e=>setD(+e.target.value)} className="w-full"/>

    <div className="text-sm mb-2 mt-3">Color</div>
    <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-full h-10"/>

    {mode==="sculpt" && (
     <>
      <div className="text-sm mb-2 mt-4">Brush Radius {brushRadius.toFixed(2)}</div>
      <input type="range" min="0.2" max="2" step="0.1" value={brushRadius} onChange={e=>setBrushRadius(+e.target.value)} className="w-full"/>

      <div className="text-sm mb-2 mt-3">Brush Strength {brushStrength.toFixed(2)}</div>
      <input type="range" min="0.05" max="1" step="0.05" value={brushStrength} onChange={e=>setBrushStrength(+e.target.value)} className="w-full"/>
     </>
    )}
   </div>

   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow p-4 flex items-center gap-3 w-[500px]">
    <input 
     className="flex-1 border rounded-lg px-3 py-2" 
     placeholder="Ask co-pilot..."
     value={prompt}
     onChange={e=>setPrompt(e.target.value)}
     onKeyDown={e=>{ if(e.key==="Enter") sendCopilot() }}
    />
    <button onClick={sendCopilot} className="bg-black text-white px-4 py-2 rounded-lg">
     <Eye/>
    </button>
   </div>
  </div>
  </>
 )
}
