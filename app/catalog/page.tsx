"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";

const CATEGORIES = [
  "All","Sofa","Chair","Table","Bed","Wardrobe","Cabinet",
  "Desk","Shelf","Dining Set","Coffee Table","TV Stand",
];

const STYLES = [
  "Classic","Modern","Minimalist","Scandinavian","Industrial",
  "Bohemian","Vintage","Rustic","Contemporary","Japandi",
  "Mid-Century","Luxury",
];

const ROOMS = [
  "Living Room","Bedroom","Dining Room","Office",
  "Kitchen","Outdoor","Kids Room",
];

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  style: string;
  room: string;
};

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [style, setStyle] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (style) {
      result = result.filter((p) => p.style === style);
    }

    if (room) {
      result = result.filter((p) => p.room === room);
    }

    result = result.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    setFiltered(result);
  }, [search, category, style, room, minPrice, maxPrice, products]);

  return (
    <>
    <Navbar/>
    <div className="px-8 py-6">
      {/* Search + Filter Toggle */}
      <div className="bg-white rounded-2xl p-4 shadow mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border-b outline-none text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`p-2 rounded-lg border transition ${
            showFilter ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Collapsible Filter Panel */}
      {showFilter && (
        <div className="bg-white rounded-2xl p-6 shadow mb-8 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg border ${
                    category === cat ? "bg-black text-white" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Style</h3>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(style === s ? null : s)}
                  className={`px-4 py-2 rounded-lg border ${
                    style === s ? "bg-black text-white" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Room</h3>
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoom(room === r ? null : r)}
                  className={`px-4 py-2 rounded-lg border ${
                    room === r ? "bg-black text-white" : ""
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border rounded-lg p-2 w-32"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border rounded-lg p-2 w-32"
              />
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filtered.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4">
            <div className="relative w-full h-40 bg-[#d9c2ae] rounded-lg">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-contain"
              />
            </div>
            <h4 className="font-semibold mt-2">{p.name}</h4>
            <p className="text-sm text-gray-500">
              {p.category} • {p.style}
            </p>
            <p className="font-bold mt-1">${p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
