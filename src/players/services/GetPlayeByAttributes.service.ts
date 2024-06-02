import { Injectable, Logger } from "@nestjs/common";
import { Player } from "../interfaces/player.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";

@Injectable()
export class GetPlayerByAttributesService {
  private readonly logger = new Logger(GetPlayerByAttributesService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>
  ) {}

  async execute(where: any): Promise<{ status: number, data: Array<Player> }> {
    try {
      const players = await this.playerModel.find(where).exec();
      return { status: 1, data: players };
    } catch (error) {
      this.logger.error(`Failed to get players: ${error}`);
      throw new AppError(error.message || 'Failed to get players', GetPlayerByAttributesService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}