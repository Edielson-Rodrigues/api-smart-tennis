import { Schema } from "mongoose";

const Events = {
  name: String,
  operation: String,
  value: Number
}

export const CategorySchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  events: [Events],
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, { timestamps: true, collection: 'categories' });