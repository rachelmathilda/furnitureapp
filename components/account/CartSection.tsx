import { Trash2, Package } from "lucide-react";

export default function CartSection() {
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
              <Package size={16} />
              <span>Custom Figure</span>
            </div>

            <div className="text-sm text-gray-500">Qty: 2</div>
          </div>

          <div className="text-right space-y-3">
            <div className="font-semibold text-lg">Rp 650.000</div>

            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-6 border-t">
        <div className="text-right space-y-2">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-semibold">Rp 1.300.000</p>

          <button className="mt-3 bg-[#C8745F] text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
