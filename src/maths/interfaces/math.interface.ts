import { Document, ObjectId } from "mongoose";

export interface Math extends Document {
  readonly challenger: ObjectId;
  readonly players: Array<ObjectId>;
  result: Array<ResultMath>;
}

interface ResultMath {
  set: string;
}