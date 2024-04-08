import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { ObjectIdPipe } from 'src/utils/pipes/objectid.pipe';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { HttpExceptionFilter } from '../../utils/filters/http-exception.filter';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createCategory(@Body() category: CreateCategoryDto) {
    const result = await this.categoriesService.createCategory(category);
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async updateCategory(
    @Body() category: UpdateCategoryDto,
    @Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.categoriesService.updateCategory(_id, category);
    return result;
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllCategories() {
    const result = await this.categoriesService.getAllCategories();
    return result;
  }

  @Get('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async getCategoryById(@Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.categoriesService.getCategoryById(_id);
    return result;
  }

  @Delete('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async deleteCategory(@Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.categoriesService.deleteCategory(_id);
    return result;
  }

  @Post('/assign-player/:_idCategoria/:_idJogador')
  @UseFilters(new HttpExceptionFilter())
  async assignPlayerInCategory(
    @Param('_idCategoria', ObjectIdPipe) _idCategoria: string,
    @Param('_idJogador', ObjectIdPipe) _idJogador: string) {
      const result = await this.categoriesService.assignPlayerInCategory(_idCategoria, _idJogador);
      return result;
  }
}
