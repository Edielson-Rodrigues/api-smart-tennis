import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/category.schema';
import { PlayersModule } from 'src/players/players.module';
import { CreateCategoryService } from './services/CreateCategory.service';
import { DeleteCategoryService } from './services/DeleteCategory.service';
import { GetAllCategoriesService } from './services/GetAllCategories.service';
import { GetCategoryByIdService } from './services/GetCategoryById.service';
import { UpdateCategoryService } from './services/UpdateCategory.service';
import { ValidationCategoryExistsService } from './services/ValidationCategoryExists.service';
import { AssignPlayerInCategoryService } from './services/AssignPlayerInCategory.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]), PlayersModule],
  controllers: [CategoriesController],
  providers: [
    CreateCategoryService,
    DeleteCategoryService,
    GetAllCategoriesService,
    GetCategoryByIdService,
    UpdateCategoryService,
    ValidationCategoryExistsService,
    AssignPlayerInCategoryService
  ],
  exports: [],
})
export class CategoriesModule {}
