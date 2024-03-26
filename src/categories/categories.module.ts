import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorieSchema } from './interfaces/categorie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categorie', schema: CategorieSchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
