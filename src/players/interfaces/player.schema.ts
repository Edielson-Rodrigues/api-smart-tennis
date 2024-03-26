import { Schema } from "mongoose";

export const PlayerSchema = new Schema({
  phoneNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true},
  name: { type: String, required: true },
  age: Number,
  nationality: String,
  urlPhotoPlayer: String,
  ranking: String,
  positionRank: Number,
  scoreRank: Number
}, { timestamps: true, collection: 'players' });
