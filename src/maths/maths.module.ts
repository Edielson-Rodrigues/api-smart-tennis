import { Module } from '@nestjs/common';
import { MathsController } from './controllers/maths.controller';
import { MathsService } from './services/maths.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MathShema } from './interfaces/math.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Math', schema: MathShema }])],
  controllers: [MathsController],
  providers: [MathsService]
})
export class MathsModule {}
