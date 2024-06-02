import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Player } from "../interfaces/player.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { ValidationPlayerExistsService } from "./ValidationPlayerExists.service";
import { UpdatePlayerDto } from "../dtos/update-player.dto";

@Injectable()
export class UpdatePlayerService {
  private readonly logger = new Logger(UpdatePlayerService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
    private readonly validationPlayerExistsService: ValidationPlayerExistsService
  ) {}

  async execute(_id: string, player: UpdatePlayerDto): Promise<{ status: number, data: Player }> {
    try {
      if (!(await this.validationPlayerExistsService.execute(_id))) {
        throw new BadRequestException(`Player already exists`); 
      }
      const playerUpdated = await this.playerModel.findOneAndUpdate(
        {_id},
        player,
        { new: true }
      ).exec();

      return { status: 1, data: playerUpdated };
    } catch (error) {
      this.logger.error(`Failed to update player: ${error}`);
      throw new AppError(error.message || 'Failed to update player', UpdatePlayerService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}