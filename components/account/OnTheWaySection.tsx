import { Truck, Calendar, MapPin } from "lucide-react";

export default function OnTheWaySection() {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border flex items-center gap-6"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-xl" />

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg">Product Name #{i}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Truck size={16} />
              <span>On Delivery</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>Estimation: 14 Feb 2026</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              <span>Destination: Jakarta</span>
            </div>
          </div>

          <div className="text-right space-y-2">
            <div className="font-semibold text-lg">Rp 850.000</div>
            <div className="text-sm text-gray-500">2 items</div>
          </div>
        </div>
      ))}
    </div>
  );
}
