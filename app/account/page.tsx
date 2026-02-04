"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProfileSection from "@/components/account/ProfileSection";
import CartSection from "@/components/account/CartSection";
import OnTheWaySection from "@/components/account/OnTheWaySection";
import HistorySection from "@/components/account/HistorySection";

type Tab = "profile" | "cart" | "on_the_way" | "history";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const titleMap: Record<Tab, string> = {
    profile: "Profile",
    cart: "Cart",
    on_the_way: "On The Way",
    history: "Past Transactions",
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />

      <div className="bg-gray-100 py-10 border-t shrink-0">
        <h1 className="text-3xl font-semibold text-center">
          {titleMap[activeTab]}
        </h1>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 h-full">
          <aside className="space-y-4 self-start">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full rounded-lg py-3 text-center font-medium border transition ${
                activeTab === "profile"
                  ? "bg-[#C8745F] text-white border-[#C8745F]"
                  : "hover:bg-gray-100"
              }`}
            >
              Profile
            </button>

            <button
              onClick={() => setActiveTab("cart")}
              className={`w-full rounded-lg py-3 text-center font-medium border transition ${
                activeTab === "cart"
                  ? "bg-[#C8745F] text-white border-[#C8745F]"
                  : "hover:bg-gray-100"
              }`}
            >
              Cart
            </button>

            <button
              onClick={() => setActiveTab("on_the_way")}
              className={`w-full rounded-lg py-3 text-center font-medium border transition ${
                activeTab === "on_the_way"
                  ? "bg-[#C8745F] text-white border-[#C8745F]"
                  : "hover:bg-gray-100"
              }`}
            >
              On The Way
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`w-full rounded-lg py-3 text-center font-medium border transition ${
                activeTab === "history"
                  ? "bg-[#C8745F] text-white border-[#C8745F]"
                  : "hover:bg-gray-100"
              }`}
            >
              History
            </button>

            <button className="w-full rounded-lg border py-3 hover:bg-red-50 text-red-500">
              Log Out
            </button>
          </aside>

          <section className="bg-[#FAFAFA] rounded-2xl p-10 overflow-y-auto h-full">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "cart" && <CartSection />}
            {activeTab === "on_the_way" && <OnTheWaySection />}
            {activeTab === "history" && <HistorySection />}
          </section>
        </div>
      </div>
    </div>
  );
}
