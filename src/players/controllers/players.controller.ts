import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { PlayersService } from '../services/players.service';
import { ObjectIdValidationPipe } from 'src/helpers/pipes/objectid.pipe';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() player: CreatePlayerDto) {
    const result = await this.playersService.createPlayer(player);
    return result;
  }

  @Get('/getForAttributes')
  async getPlayerByAttributes(@Query() queryParams: any) {
    const result = await this.playersService.getPlayerByAttributes(queryParams);
    return result;
  }

  @Get()
  async getAllPlayers() {
    const result = await this.playersService.getAllPlayers();
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() player: UpdatePlayerDto,
    @Param('_id', ObjectIdValidationPipe) _id: string)
  {
    const result = await this.playersService.updatePlayer(_id, player);
    return result;
  }

  @Delete('/:_id')
  async deletePlayer(@Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.playersService.deletePlayer(_id);
    return result;
  }
}
