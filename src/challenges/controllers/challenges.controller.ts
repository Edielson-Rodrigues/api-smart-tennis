import { Body, Controller, Get, Param, Post, Put, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { CreateChallengeDto } from '../dtos/challenger.create';
import { CreateChallengeService } from '../services/CreateChallenge.service';
import { ObjectIdPipe } from 'src/utils/pipes/objectId.pipe';
import { GetChallengesByChallengedService } from '../services/GetChallengesByChallenged.service';
import { GetChallengesByChallengerService } from '../services/GetChallengesByChallenger.service';
import { UpdateStatusChallengeService } from '../services/UpdateStatusChallenge.service';

@Controller('challenges')
export class ChallengesController {
  constructor(
    private readonly createChallengeService: CreateChallengeService,
    private readonly getChallengesByChallengedService: GetChallengesByChallengedService,
    private readonly getChallengesByChallengerService: GetChallengesByChallengerService,
    private readonly updateStatusChallengeService: UpdateStatusChallengeService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createChallenge(@Body() challenge: CreateChallengeDto) {
    const result = await this.createChallengeService.execute(challenge);
    return result;
  }

  @Get("/get-challenges-by-challenged/:_id")
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter)
  async getChallengesByChallenged(@Param("_id", ObjectIdPipe) _id: string) {
    const result = await this.getChallengesByChallengedService.execute(_id);
    return result;
  }

  @Get("/get-challenges-by-challenger/:_id")
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter)
  async getChallengesByChallenger(@Param("_id", ObjectIdPipe) _id: string) {
    const result = await this.getChallengesByChallengerService.execute(_id);
    return result;
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter)
  async updateStatusChallenge(@Query("_id", ObjectIdPipe) _id: string, @Query("status") newStatus: string) {
    const result = await this.updateStatusChallengeService.execute(_id, newStatus);
    return result;
  }
  // response -> put
  // getAll -> put
  // getByID -> challenge | chellenger | challenged
}
