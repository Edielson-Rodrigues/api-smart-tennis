import { Module } from '@nestjs/common';
import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayerModule {}
