import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { ChallengesController } from './controllers/challenges.controller';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CreateChallengeService } from './services/CreateChallenge.service';
import { GetChallengesByIdPlayerService } from './services/GetChallengesByIdPlayer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Challenge", schema: ChallengeSchema }]), PlayersModule, CategoriesModule],
  controllers: [ChallengesController],
  providers: [
    CreateChallengeService,
    GetChallengesByIdPlayerService
  ]
})
export class ChallengesModule {}
