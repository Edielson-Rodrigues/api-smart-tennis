import { Document } from "mongoose";
import { STATUS_CHALLENGE } from "../types/challenge.status.type";

export interface Challenge extends Document {
  name: string,
  description: string;
  status: STATUS_CHALLENGE;
  category: string;
  challenger: string;
  challenged: string;
  dateTimeSent: string;
  dateTimeResponse: string;
  dateTimeChallenge: string;
}