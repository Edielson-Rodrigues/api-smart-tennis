import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { ObjectIdPipe } from 'src/utils/pipes/objectId.pipe';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { CreatePlayerService } from '../services/CreatePlayer.service';
import { GetPlayerByAttributesService } from '../services/GetPlayeByAttributes.service';
import { GetAllPlayersService } from '../services/GetAllPlayers.service';
import { UpdatePlayerService } from '../services/UpdatePlayer.service';
import { DeletePlayerService } from '../services/DeletePlayer.service';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly createPlayerService: CreatePlayerService,
    private readonly getPlayerByAttributesService: GetPlayerByAttributesService,
    private readonly getAllPlayersService: GetAllPlayersService,
    private readonly updatePlayerService: UpdatePlayerService,
    private readonly deletePlayerService: DeletePlayerService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createPlayer(@Body() player: CreatePlayerDto) {
    const result = await this.createPlayerService.execute(player);
    return result;
  }

  @Get('/getForAttributes')
  @UseFilters(new HttpExceptionFilter())
  async getPlayerByAttributes(@Query() queryParams: any) {
    const result = await this.getPlayerByAttributesService.execute(queryParams);
    return result;
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllPlayers() {
    const result = await this.getAllPlayersService.execute();
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async updatePlayer(@Body() player: UpdatePlayerDto, @Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.updatePlayerService.execute(_id, player);
    return result;
  }

  @Delete('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async deletePlayer(@Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.deletePlayerService.execute(_id);
    return result;
  }
}
