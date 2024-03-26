import { Schema } from "mongoose";

const Events = {
  name: { type: String },
  operation: { type: String },
  value: { type: Number }
}

export const CategorieSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  events: [Events],
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, { timestamps: true, collection: 'categories' }); 