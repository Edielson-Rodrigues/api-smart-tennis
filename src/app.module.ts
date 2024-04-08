import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ConfigModule } from '@nestjs/config'; // TODO: tentar usar na conexão com o banco
import { CategoriesModule } from './categories/categories.module';
import { ChallengesModule } from './challenges/challenges.module';
import { MathsModule } from './maths/maths.module';

import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@smart-tennis.mucqipz.mongodb.net/smart-tennis?retryWrites=true&w=majority`),
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
    MathsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}