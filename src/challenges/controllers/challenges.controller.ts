import { Body, Controller, HttpException, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
// import { ChallengesService } from '../services/challenges.service';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { CreateChallengeDto } from '../dtos/challenger.create';

@Controller('challenges')
export class ChallengesController {
  constructor(
    // private readonly challengesService: ChallengesService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createChallenge(@Body() challenge: CreateChallengeDto) {
    // const result = await this.challengesService.createChallenge(challenge);
    return {status: 1};
  }

  // response -> put
  // getAll -> put
  // getByID -> challenge | chellenger | challenged
}
