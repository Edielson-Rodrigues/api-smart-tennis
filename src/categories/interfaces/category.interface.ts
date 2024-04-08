import { Document, ObjectId } from 'mongoose';

export interface Category extends Document {
  readonly name: string;
  description: string;
  events: Array<ObjectId>;
  players: Array<ObjectId>;
  math: ObjectId;
}