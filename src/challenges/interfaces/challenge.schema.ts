import { Schema } from "mongoose";

// data hora de requisição: createdAt
// data hora de resposta: updatedAt
export const ChallengeSchema = new Schema({
  dateTimeChallenge: Date,
  status: String,
  categorie: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  challenger: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, { timestamps: true, collection: 'challenges' });

