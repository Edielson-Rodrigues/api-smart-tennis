import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from '../services/challenges.service';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';

@Controller('challenges')
export class ChallengesController {

  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() challenge: CreateChallengeDto) {
    const result = await this.challengesService.createChallenge(challenge);
    return result;
  }
}
