import { Injectable, Logger } from "@nestjs/common";
import { Player } from "../interfaces/player.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { PlayerFindWithEmailType, PlayerFindWithIdType } from "../types/player.find.type";
import { ObjectId } from "mongodb";

@Injectable()
export class ValidationPlayerExistsService {
  private readonly logger = new Logger(ValidationPlayerExistsService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>
  ) {}

  async execute(emailOrId: string | string[], phoneNumber?: string): Promise<boolean> {
    try {
      const findMany = Array.isArray(emailOrId);
      const queryParams = findMany ? { _id: { $in: emailOrId } } : this.getQueryParams(ObjectId.isValid(emailOrId), emailOrId, phoneNumber);     
      const foundPlayer = await this.playerModel.find(queryParams).exec();
      const result = findMany ? foundPlayer.length === emailOrId.length : Boolean(foundPlayer.length);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create player: ${error}`);
      throw new AppError(error.message || 'Failed to create player', ValidationPlayerExistsService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }

  private getQueryParams(isObjectIdValid: boolean, emailOrId: string, phoneNumber: string): PlayerFindWithEmailType | PlayerFindWithIdType {
    if (isObjectIdValid) {
      return {
        $or: [
          { _id: emailOrId },
          { phoneNumber },
        ]
      }
    } else {
      return {
        $or: [
          { email: emailOrId },
          { phoneNumber },
        ]
      }
    }
  }
}