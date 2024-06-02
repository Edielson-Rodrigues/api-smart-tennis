import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { ChallengesController } from './controllers/challenges.controller';
// import { ChallengesService } from './services/challenges.service';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Challenge", schema: ChallengeSchema }]), PlayersModule],
  controllers: [ChallengesController],
  providers: []
})
export class ChallengesModule {}
