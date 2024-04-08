import { NotFoundException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../interfaces/player.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { ObjectId } from 'mongodb';
import { PlayerFindWithEmailType, PlayerFindWithIdType } from '../types/player.find.type';
import { AppError } from 'src/utils/errors/app.error';


@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

  async createPlayer(player: CreatePlayerDto): Promise<{ status: number, data: Player }> {
    try {
      if (await this.validationPlayerExists(player.email, player.phoneNumber)) {
        throw new BadRequestException('Player already exists');
      }
      const playerCreated = new this.playerModel(player);
      await playerCreated.save();
      return { status: 1, data: playerCreated }
    } catch (error) {
      this.logger.error(`Failed to create player: ${error}`);
      throw new AppError(error.message || 'Failed to create player', PlayersService.name, this.createPlayer.name, error.statusCode ?? 400);
    }
  }

  async getPlayerByAttributes(where: any): Promise<Player[]> {
    try {
      return await this.playerModel.find(where).exec();
    } catch (error) {
      this.logger.error(`Failed to get players: ${error}`);
      throw new AppError(error.message || 'Failed to get players', PlayersService.name, this.getPlayerByAttributes.name, error.statusCode ?? 400);
    }
  }

  async updatePlayer(_id: string, player: UpdatePlayerDto): Promise<{ status: number, data: Player, message?: string }> {
    try {
      if (!await this.validationPlayerExists(_id)) {
        throw new NotFoundException('Player does not exists');
      }
      const playerUpdated = await this.playerModel.findOneAndUpdate(
        { _id },
        player, { new: true }
      ).exec();
      return { status: 1, data: playerUpdated }
    } catch (error) {
      this.logger.error(`Failed to update player: ${error}`);
      throw new AppError(error.message || 'Failed to update player', PlayersService.name, this.updatePlayer.name, error.statusCode ?? 400);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    try {
      return await this.playerModel.find().exec();
    } catch (error) {
      this.logger.error(`Failed to get players: ${error}`);
      throw new AppError(error.message || 'Failed to get players', PlayersService.name, this.getAllPlayers.name, error.statusCode ?? 400);
    }
  }

  async deletePlayer(_id: string): Promise<{ status: number, data: Player }> {
    try {
      if (!await this.validationPlayerExists(_id)) {
        throw new NotFoundException('Player does not exists');
      }
      const playerDeleted = await this.playerModel.findOneAndDelete({ _id }).exec();
      return { status: 1, data: playerDeleted }
    } catch (error) {
      this.logger.error(`Failed to delete player: ${error}`);
      throw new AppError(error.message || 'Failed to delete player', PlayersService.name, this.deletePlayer.name, error.statusCode ?? 400);
    }
  }

  async validationPlayerExists(emailOrId: string | string[], phoneNumber?: string): Promise<boolean> {
    try {
      const findMany = Array.isArray(emailOrId);
      const queryParams = findMany ? { _id: { $in: emailOrId } } : this.getQueryParams(ObjectId.isValid(emailOrId), emailOrId, phoneNumber);     
      const foundPlayer = await this.playerModel.find(queryParams).exec();
      const result = findMany ? foundPlayer.length === emailOrId.length : Boolean(foundPlayer.length);
      return result;
    } catch (error) {
      this.logger.error(`Failed to validate player: ${error}`);
      throw new AppError(error.message || 'Failed to validate player', PlayersService.name, this.validationPlayerExists.name, error.statusCode ?? 400);
    }
  }

  private getQueryParams(isObjectIdValid: boolean, emailOrId: string, phoneNumber: string): PlayerFindWithEmailType | PlayerFindWithIdType {
    if (isObjectIdValid) {
      return {
        $or: [
          { _id: emailOrId },
          { phoneNumber },
        ]
      }
    } else {
      return {
        $or: [
          { email: emailOrId },
          { phoneNumber },
        ]
      }
    }
  }
}
