import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Player } from "../interfaces/player.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { CreatePlayerDto } from "../dtos/create-player.dto";

@Injectable()
export class GetAllPlayersService {
  private readonly logger = new Logger(GetAllPlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>
  ) {}

  async execute(): Promise<{ status: number, data: Array<Player> }> {
    try {
      const players = await this.playerModel.find().exec();
      return { status: 1, data: players };
    } catch (error) {
      this.logger.error(`Failed to get players: ${error}`);
      throw new AppError(error.message || 'Failed to get players', GetAllPlayersService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}