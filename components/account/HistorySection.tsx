import { Package, Calendar, MapPin, CreditCard } from "lucide-react";

export default function HistorySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl p-5 border flex gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg" />

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg">Product Name #{i}</h3>

            <div className="flex items-center text-sm text-gray-500 gap-2">
              <Calendar size={16} /> 12 Jan 2026
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-2">
              <MapPin size={16} /> Jakarta, Indonesia
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-2">
              <Package size={16} /> 2 items
            </div>

            <div className="flex items-center text-sm font-medium gap-2">
              <CreditCard size={16} /> Rp 1.250.000
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
