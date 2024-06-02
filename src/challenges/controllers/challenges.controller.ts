import { Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { CreateChallengeDto } from '../dtos/challenger.create';
import { CreateChallengeService } from '../services/CreateChallenge.service';

@Controller('challenges')
export class ChallengesController {
  constructor(
    private readonly createChallengeService: CreateChallengeService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createChallenge(@Body() challenge: CreateChallengeDto) {
    const result = await this.createChallengeService.execute(challenge);
    return result;
  }

  // response -> put
  // getAll -> put
  // getByID -> challenge | chellenger | challenged
}
