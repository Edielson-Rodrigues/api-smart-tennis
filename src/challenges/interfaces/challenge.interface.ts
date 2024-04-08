import { Document } from "mongoose";
import { ObjectId } from "mongoose";

enum ChallengeStatus {
  DONE = 'DONE',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  CANCELED = 'CANCELED',
}


export interface Challenge extends Document {
  readonly categorie: ObjectId;
  readonly challenger: ObjectId;
  readonly challenged: ObjectId;
  readonly dateTimeRequest: Date;
  readonly dateTimeReply: Date;
  dateTimeChallenge: Date;
  status: ChallengeStatus;
  match: ObjectId;
}
