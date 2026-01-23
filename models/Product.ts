import mongoose, { Schema, models, model } from 'mongoose'

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  style: { type: String, required: true },
  isFlashSale: { type: Boolean, default: false },
  flashPrice: { type: Number, default: null },
  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 }
}, { timestamps: true })

export default models.Product || model('Product', ProductSchema)
