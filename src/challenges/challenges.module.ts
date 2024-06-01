import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { ChallengesController } from './controllers/challenges.controller';
import { ChallengesService } from './services/challenges.service';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Challenge", schema: ChallengeSchema }]), PlayersModule, CategoriesModule],
  controllers: [ChallengesController],
  providers: [ChallengesService]
})
export class ChallengesModule {}
