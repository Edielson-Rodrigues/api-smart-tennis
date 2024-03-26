import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { PlayersService } from '../services/players.service';
import { PlayersValidation } from '../pipes/players-validation';

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

  @Put('/:email')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() player: UpdatePlayerDto,
    @Param('email', PlayersValidation) email: string)
  {
    const result = await this.playersService.updatePlayer(email, player);
    return result;
  }

  @Delete()
  async deletePlayer(@Query('email', PlayersValidation) email: string) {
    const result = await this.playersService.deletePlayer(email);
    return result;
  }
}
