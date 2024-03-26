import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../interfaces/player.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePlayerDto } from '../dtos/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

  async createPlayer(player: CreatePlayerDto): Promise<{ status: number, data: Player }> {
    try {
      if (await this.validationPlayerExists(player.email, player.phoneNumber)) {
        throw new BadRequestException(player, 'Player already exists');
      }
      const playerCreated = new this.playerModel(player);
      await playerCreated.save();
      return { status: 1, data: playerCreated }
    } catch (error) {
      this.logger.error(`Failed to create player: ${error}`);
    }
  }

  async getPlayerByAttributes(where: any): Promise<Player[]> {
    try {
      return await this.playerModel.find(where).exec();
    } catch (error) {
      this.logger.error(`Failed to get players: ${error}`);
    }
  }

  async updatePlayer(email: string, player: UpdatePlayerDto): Promise<{ status: number, data: Player, message?: string }> {
    try {
      if (!await this.validationPlayerExists(email)) {
        throw new BadRequestException(player, 'Player does not exists');
      }
      const playerUpdated = await this.playerModel.findOneAndUpdate(
        { email },
        player, { new: true }
      ).exec();
      return { status: 1, data: playerUpdated }
    } catch (error) {
      this.logger.error(`Failed to update player: ${error}`);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    try {
      return await this.playerModel.find().exec();
    } catch (error) {
      this.logger.error(`Failed to get players: ${error}`);
    }
  }

  async deletePlayer(email: string): Promise<{ status: number, data: Player }> {
    try {
      if (!await this.validationPlayerExists(email)) {
        throw new BadRequestException({ email }, 'Player does not exists');
      }
      const playerDeleted = await this.playerModel.findOneAndDelete({ email }).exec();
      return { status: 1, data: playerDeleted }
    } catch (error) {
      this.logger.error(`Failed to delete player: ${error}`);
    }
  }

  private async validationPlayerExists(email: string, phoneNumber?: string): Promise<boolean> {
    try {
      const foundPlayer = await this.playerModel.findOne({
        $or: [
          { email },
          { phoneNumber }
        ]
      }).exec();
      return Boolean(foundPlayer);
    } catch (error) {
      this.logger.error(`Failed to validate player: ${error}`);
    }
  }
}
