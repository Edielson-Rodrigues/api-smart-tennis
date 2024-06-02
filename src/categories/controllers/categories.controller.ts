import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { ObjectIdPipe } from 'src/utils/pipes/objectId.pipe';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { HttpExceptionFilter } from '../../utils/filters/http-exception.filter';
import { CreateCategoryService } from '../services/CreateCategory.service';
import { UpdateCategoryService } from '../services/UpdateCategory.service';
import { GetAllCategoriesService } from '../services/GetAllCategories.service';
import { GetCategoryByIdService } from '../services/GetCategoryById.service';
import { DeleteCategoryService } from '../services/DeleteCategory.service';
import { AssignPlayerInCategoryService } from '../services/AssignPlayerInCategory.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly uptateCategoryService: UpdateCategoryService,
    private readonly getAllCategoriesService: GetAllCategoriesService,
    private readonly getCategoryService: GetCategoryByIdService,
    private readonly deleteCategoryService: DeleteCategoryService,
    private readonly assignPlayerInCategoryService: AssignPlayerInCategoryService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async createCategory(@Body() category: CreateCategoryDto) {
    const result = await this.createCategoryService.execute(category);
    return result;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter())
  async updateCategory(
    @Body() category: UpdateCategoryDto,
    @Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.uptateCategoryService.execute(_id, category);
    return result;
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllCategories() {
    const result = await this.getAllCategoriesService.execute();
    return result;
  }

  @Get('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async getCategoryById(@Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.getCategoryService.execute(_id);
    return result;
  }

  @Delete('/:_id')
  @UseFilters(new HttpExceptionFilter())
  async deleteCategory(@Param('_id', ObjectIdPipe) _id: string) {
    const result = await this.deleteCategoryService.execute(_id);
    return result;
  }

  @Post('/assign-player/:_idCategoria/:_idJogador')
  @UseFilters(new HttpExceptionFilter())
  async assignPlayerInCategory(
    @Param('_idCategoria', ObjectIdPipe) _idCategoria: string,
    @Param('_idJogador', ObjectIdPipe) _idJogador: string) {
      const result = await this.assignPlayerInCategoryService.execute(_idCategoria, _idJogador);
      return result;
  }
}
