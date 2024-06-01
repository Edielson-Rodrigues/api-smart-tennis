import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { PlayersService } from '../services/players.service';
import { ObjectIdPipe } from 'src/utils/pipes/objectId.pipe';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createPlayer(@Body() player: CreatePlayerDto) {
    const result = await this.playersService.createPlayer(player);
    return result;
  }

  @Get('/getForAttributes')
  @UseFilters(new HttpExceptionFilter())
  async getPlayerByAttributes(@Query() queryParams: any) {
    const result = await this.playersService.getPlayerByAttributes(queryParams);
    return result;
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllPlayers() {
    const result = await this.playersService.getAllPlayers();
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async updatePlayer(
    @Body() player: UpdatePlayerDto,
    @Param('_id', ObjectIdPipe) _id: string)
  {
    const result = await this.playersService.updatePlayer(_id, player);
    return result;
  }

  @Delete('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async deletePlayer(@Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.playersService.deletePlayer(_id);
    return result;
  }
}
