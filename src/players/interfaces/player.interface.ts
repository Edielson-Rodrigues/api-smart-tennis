import { Document } from 'mongoose';

export interface Player extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  age: number;
  nationality: string;
  urlPhotoPlayer: string;
  ranking: string;
  positionRank: number;
  scoreRank: number;
}