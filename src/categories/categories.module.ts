import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorieSchema } from './interfaces/categorie.schema';
import { PlayerModule } from 'src/players/players.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categorie', schema: CategorieSchema }]), PlayerModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
