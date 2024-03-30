import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategorieDto } from '../dtos/create-categorie.dto';
import { ObjectIdValidationPipe } from 'src/helpers/pipes/objectid.pipe';
import { UpdateCategorieDto } from '../dtos/update-categorie.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategorie(@Body() categorie: CreateCategorieDto) {
    const result = await this.categoriesService.createCategorie(categorie);
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateCategorie(
    @Body() categorie: UpdateCategorieDto,
    @Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.categoriesService.updateCategorie(_id, categorie);
    return result;
  }

  @Get()
  async getAllCategories() {
    const result = await this.categoriesService.getAllCategories();
    return result;
  }

  @Get('/:_id')
  async getCategorieById(@Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.categoriesService.getCategorieById(_id);
    return result;
  }

  @Delete('/:_id')
  async deleteCategorie(@Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.categoriesService.deleteCategorie(_id);
    return result;
  }
}
