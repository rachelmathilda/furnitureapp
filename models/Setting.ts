import mongoose, { Schema, models, model } from 'mongoose'

const SettingSchema = new Schema({
  flashSaleEndsAt: { type: Date, required: true },
  flashSaleActive: { type: Boolean, default: false }
})

export default models.Setting || model('Setting', SettingSchema)
