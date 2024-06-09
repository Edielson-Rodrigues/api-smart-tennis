import { Schema } from "mongoose";

export const ChallengeSchema = new Schema({
  status: { 
    type: String, 
    enum: ["SENT", "REALIZED", "REJECT_FOR_THE_CHALLENGER", "CANCELED_FOR_THE_CHALLENGED", "ACCEPTED"],
    requerid: true,
    default: "SENT"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  challenger: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
  challenged: {
    type: Schema.Types.ObjectId,
    ref: "Player"
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  dateTimeSent: {
    type: Schema.Types.Date,
  },
  dateTimeResponse: {
    type: Schema.Types.Date,
    default: null
  },
  dateTimeChallenge: {
    type: Schema.Types.Date,
    required: true
  }
}, { timestamps: true, collection: "challenges" });