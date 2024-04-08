import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from '../interfaces/challenge.interface';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { CategoriesService } from 'src/categories/services/categories.service';
import { PlayersService } from 'src/players/services/players.service';
import { AppError } from 'src/utils/errors/app.error';


@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService
  ) {}

  async createChallenge(challenge: CreateChallengeDto): Promise<{ status: number, data: Challenge}> {
    try { 
      const [ verifyCategory, verifyPlayers ] = await Promise.all([
        this.categoriesService.validationCategoryExists(challenge.category),
        this.playersService.validationPlayerExists([challenge.challenger, challenge.challenged])
      ]);
      if (!verifyCategory) throw new NotFoundException('Category does not exists');
      if (!verifyPlayers) throw new NotFoundException('One or more players does not exists');
      
      const challengedCreated = new this.challengeModel(challenge);
      await challengedCreated.save();

      return { status: 1, data: challengedCreated } 
    } catch (error) {
      this.logger.error(error.message || `Failed to create challenge: ${error}`);
      throw new AppError(error.message || 'Failed to create challenge', ChallengesService.name, this.createChallenge.name, error.statusCode ?? 400);
    }
  }
}
