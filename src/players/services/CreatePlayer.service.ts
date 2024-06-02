import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Player } from "../interfaces/player.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { ValidationPlayerExistsService } from "./ValidationPlayerExists.service";
import { CreatePlayerDto } from "../dtos/create-player.dto";

@Injectable()
export class CreatePlayerService {
  private readonly logger = new Logger(CreatePlayerService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
    private readonly validationPlayerExistsService: ValidationPlayerExistsService
  ) {}

  async execute(player: CreatePlayerDto): Promise<{ status: number, data: Player }> {
    try {
      if (await this.validationPlayerExistsService.execute(player.email, player.phoneNumber)) {
        throw new BadRequestException(`Player already exists`); 
      }
      const playerCreated = new this.playerModel(player);
      await playerCreated.save();
      return { status: 1, data: playerCreated };
    } catch (error) {
      this.logger.error(`Failed to create player: ${error}`);
      throw new AppError(error.message || 'Failed to create player', CreatePlayerService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}