// import { Injectable, Logger, NotFoundException } from '@nestjs/common';
// import { Challenge } from '../interfaces/challenge.interface';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { CategoriesService } from 'src/categories/services/categories.service';
// import { PlayersService } from 'src/players/services/players.service';
// import { CreateChallengeDto } from '../dtos/challenger.create';
// import { AppError } from 'src/utils/errors/app.error';

// @Injectable()
// export class ChallengesService {
//   private readonly logger = new Logger(ChallengesService.name);

//   constructor(
//     @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
//     private readonly categoriesService: CategoriesService,
//     private readonly playersService: PlayersService
//   ) {}

//   async createChallenge(challenge: CreateChallengeDto): Promise<{ status: number, data: Challenge }> {
//     try {
//       const [ categorieExists, challengerExists, challengedExists ] = await Promise.all([
//         this.categoriesService.validationCategoryExists(challenge.category),
//         this.playersService.validationPlayerExists(challenge.challenger),
//         this.playersService.validationPlayerExists(challenge.challenged)
//       ]);

//       if (!categorieExists) throw new NotFoundException('Category not found');
//       if (!challengerExists) throw new NotFoundException('Challenger not found');
//       if (!challengedExists) throw new NotFoundException('Challenged not found');

//       challenge.status = 'SENT';
//       challenge.dateTimeSent = new Date();

//       const challengeCreated = new this.challengeModel(challenge);
//       await challengeCreated.save();

//       return { status: 1, data: challengeCreated };
//     } catch (error) {
//       this.logger.error(`Falied to create challenge: ${error}`)
//       throw new AppError(error.message || 'Failed to create challenge', ChallengesService.name, this.createChallenge.name, error.statusCode ?? 400);
//     }
//   }
// }
