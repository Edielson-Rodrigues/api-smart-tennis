import { Module } from '@nestjs/common';
import { ChallengesController } from './controllers/challenges.controller';
import { ChallengesService } from './services/challenges.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]), PlayersModule, CategoriesModule],
  controllers: [ChallengesController],
  providers: [ChallengesService]
})
export class ChallengesModule {}
