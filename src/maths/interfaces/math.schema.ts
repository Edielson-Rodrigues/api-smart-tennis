import { Schema } from 'mongoose';

export const MathShema = new Schema({
  challenger: { 
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
  }],
  result: [{
    set: String,
  }],
}, { timestamps: true, collection: 'maths' })
