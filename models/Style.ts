import mongoose, { Schema, models, model } from 'mongoose'

const StyleSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  order: { type: Number, default: 0 }
})

export default models.Style || model('Style', StyleSchema)
