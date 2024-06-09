import { Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Challenge } from "../interfaces/challenge.interface";
import { InjectModel } from "@nestjs/mongoose";
import { AppError } from "src/utils/errors/app.error";

@Injectable()
export class UpdateStatusChallengeService {
  private readonly logger = new Logger(UpdateStatusChallengeService.name);
  
  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>,
  ) {}

  async execute(_id: string, newStatus: string): Promise<{ status: number, data: Challenge }> {
    try {
      const challengeUpdated = await this.challengeModel.findOneAndUpdate(
        {_id},
        { 
          status: newStatus,
          dateTimeResponse: new Date()
        } as Challenge,
        { new: true }
      );

      return { status: 1, data: challengeUpdated };
    } catch (error) {
      this.logger.error(`Failed to get challenges by _id player: ${error}`);
      throw new AppError(error.message ?? `Failed to update challenges`, UpdateStatusChallengeService.name, this.execute.name, error?.response?.statusCode);
    }
  }
}