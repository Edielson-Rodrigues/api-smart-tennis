import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { ChallengesController } from './controllers/challenges.controller';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CreateChallengeService } from './services/CreateChallenge.service';
import { GetChallengesByChallengedService } from './services/GetChallengesByChallenged.service';
import { GetChallengesByChallengerService } from './services/GetChallengesByChallenger.service';
import { UpdateStatusChallengeService } from './services/UpdateStatusChallenge.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Challenge", schema: ChallengeSchema }]), PlayersModule, CategoriesModule],
  controllers: [ChallengesController],
  providers: [
    CreateChallengeService,
    GetChallengesByChallengedService,
    GetChallengesByChallengerService,
    UpdateStatusChallengeService
  ]
})
export class ChallengesModule {}
