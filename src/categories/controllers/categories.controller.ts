import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategorieDto } from '../dtos/create-categorie.dto';
import { ObjectIdValidationPipe } from 'src/utils/pipes/objectid.pipe';
import { UpdateCategorieDto } from '../dtos/update-categorie.dto';
import { HttpExceptionFilter } from '../../utils/filters/http-exception.filter';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createCategorie(@Body() categorie: CreateCategorieDto) {
    const result = await this.categoriesService.createCategorie(categorie);
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async updateCategorie(
    @Body() categorie: UpdateCategorieDto,
    @Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.categoriesService.updateCategorie(_id, categorie);
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
  async getCategorieById(@Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.categoriesService.getCategorieById(_id);
    return result;
  }

  @Delete('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async deleteCategorie(@Param('_id', ObjectIdValidationPipe) _id: string) {
    const result = await this.categoriesService.deleteCategorie(_id);
    return result;
  }

  @Post('/assign-player/:_idCategoria/:_idJogador')
  @UseFilters(new HttpExceptionFilter())
  async assignPlayerInCategorie(
    @Param('_idCategoria', ObjectIdValidationPipe) _idCategoria: string,
    @Param('_idJogador', ObjectIdValidationPipe) _idJogador: string) {
      const result = await this.categoriesService.assignPlayerInCategorie(_idCategoria, _idJogador);
      return result;
  }
}
