import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Challenge } from "../interfaces/challenge.interface";
import { AppError } from "src/utils/errors/app.error";
import { ValidationPlayerExistsService } from "src/players/services/ValidationPlayerExists.service";

@Injectable()
export class GetChallengesByChallengerService {
  private readonly logger = new Logger(GetChallengesByChallengerService.name);

  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>,
    private readonly validationPlayerExistsService: ValidationPlayerExistsService
  ) {}

  async execute(_id: string): Promise<{ status: number, data: Array<Challenge> }> {
    try {
      if (!(await this.validationPlayerExistsService.execute(_id))) {
        throw new NotFoundException("The player does not exist");
      }

      const challenges = await this.challengeModel.find({
        challenger: _id
      });

      return { status: 1, data: challenges };
    } catch(error) {
      this.logger.error(`Failed to get challenges by _id player: ${error}`);
      throw new AppError(error.message ?? `Failed to get challenges by _id player`, GetChallengesByChallengerService.name, this.execute.name, error?.response?.statusCode);
    }
  }
}