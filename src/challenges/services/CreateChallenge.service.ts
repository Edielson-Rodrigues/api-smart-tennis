import { Logger, NotFoundException, Injectable, BadRequestException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AppError } from "src/utils/errors/app.error";
import { Challenge } from "../interfaces/challenge.interface";
import { CreateChallengeDto } from "../dtos/challenger.create";
import { ValidationCategoryExistsService } from "src/categories/services/ValidationCategoryExists.service";
import { ValidationPlayerExistsService } from "src/players/services/ValidationPlayerExists.service";
import { GetCategoryByIdPlayerService } from "src/categories/services/GetCategoryByIdPlayer.service";

@Injectable()
export class CreateChallengeService {
  private readonly logger = new Logger(CreateChallengeService.name);

  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>,
    private readonly validationCategoryExistsService: ValidationCategoryExistsService,
    private readonly validationPlayerExistsService: ValidationPlayerExistsService,
    private readonly getCategoryByIdPlayerServiceService: GetCategoryByIdPlayerService
  ) {}

  async execute(challenge: CreateChallengeDto): Promise<{ status: number, data: Challenge }> {
    try {
      const [ categoryExists, challengerExists, challengedExists, categoryChallenger, categoryChallenged ] = await Promise.all([
        this.validationCategoryExistsService.execute(challenge.category),
        this.validationPlayerExistsService.execute(challenge.challenger),
        this.validationPlayerExistsService.execute(challenge.challenged),
        this.getCategoryByIdPlayerServiceService.execute(challenge.challenger),
        this.getCategoryByIdPlayerServiceService.execute(challenge.challenged)
      ]);
      
      if (!categoryExists) throw new NotFoundException("Category not found");
      if (!challengerExists) throw new NotFoundException("Challenger not found");
      if (!challengedExists) throw new NotFoundException("Challenged not found");
      if (JSON.stringify(categoryChallenger._id) !== JSON.stringify(categoryChallenged._id)) {
        throw new BadRequestException(`Challenger and Challenged must be part of the same category`)
      }

      const challendeCreated = new this.challengeModel({
        ...challenge,
        status: "SENT",
        dateTimeSent: new Date()
      });
      await challendeCreated.save();

      return { status: 1, data: challendeCreated };
    } catch (error) {
      this.logger.error(`Failed to create challenge: ${error}`)
      throw new AppError(error.message || "Failed to create challenge", CreateChallengeService.name, this.execute.name, error.response.statusCode ?? 400);
    }
  }
}