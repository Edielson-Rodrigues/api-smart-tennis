import { Module } from '@nestjs/common';
import { PlayersController } from './controllers/players.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';
import { CreatePlayerService } from './services/CreatePlayer.service';
import { DeletePlayerService } from './services/DeletePlayer.service';
import { GetAllPlayersService } from './services/GetAllPlayers.service';
import { GetPlayerByAttributesService } from './services/GetPlayeByAttributes.service';
import { UpdatePlayerService } from './services/UpdatePlayer.service';
import { ValidationPlayerExistsService } from './services/ValidationPlayerExists.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }])],
  controllers: [PlayersController],
  providers: [
    CreatePlayerService,
    DeletePlayerService,
    GetAllPlayersService,
    GetPlayerByAttributesService,
    UpdatePlayerService,
    ValidationPlayerExistsService
  ],
  exports: [ValidationPlayerExistsService]
})
export class PlayersModule {}
