import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Player } from "../interfaces/player.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { ValidationPlayerExistsService } from "./ValidationPlayerExists.service";

@Injectable()
export class DeletePlayerService {
  private readonly logger = new Logger(DeletePlayerService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
    private readonly validationPlayerExistsService: ValidationPlayerExistsService
  ) {}

  async execute(_id: string): Promise<{ status: number, data: Player }> {
    try {
      if (!(await this.validationPlayerExistsService.execute(_id))) {
        throw new NotFoundException('Player does not exists');
      }
      const playerDeleted = await this.playerModel.findOneAndDelete({_id}).exec();
      return { status: 1, data: playerDeleted };
    } catch (error) {
      this.logger.error(`Failed to delete player: ${error}`);
      throw new AppError(error.message || 'Failed to delete player', DeletePlayerService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}