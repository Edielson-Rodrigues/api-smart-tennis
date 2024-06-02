import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Challenge } from "../interfaces/challenge.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";

@Injectable()
export class GetChallengesByIdPlayerService {
  private readonly logger = new Logger(GetChallengesByIdPlayerService.name);

  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>
  ) {}

  async execute(): Promise<{ status: number, data: Array<Challenge>}> {
    try {
      // In progress
      return { status: 1, data: [] };
    } catch (error) {
      this.logger.error(`Failed to get challenges by _id player: ${error}`);
      throw new AppError(error.message ?? `Failed to get challenges by _id player`, GetChallengesByIdPlayerService.name, this.execute.name, error?.response.statusCode);
    }
  }
}