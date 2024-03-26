import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategorieDto } from '../dtos/create-categorie.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async createCategorie(@Body() categorie: CreateCategorieDto) {
    const result = await this.categoriesService.createCategorie(categorie);
    return result;
  }
}
