"use client";

export default function ProfileSection() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="First Name"
          className="w-full rounded-xl border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#C8745F]/30"
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full rounded-xl border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#C8745F]/30"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#C8745F]/30"
      />

      <input
        type="tel"
        placeholder="Phone"
        className="w-full rounded-xl border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#C8745F]/30"
      />

      <textarea
        placeholder="Address"
        rows={3}
        className="w-full rounded-xl border px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#C8745F]/30"
      />

      <div className="pt-4">
        <button className="bg-[#D8B8A6] hover:opacity-90 transition text-white px-10 py-3 rounded-xl font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
}
