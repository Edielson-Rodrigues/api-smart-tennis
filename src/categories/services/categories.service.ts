import { Injectable, BadRequestException, NotFoundException,  HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../interfaces/category.interface';
import { Model } from 'mongoose';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ObjectId } from 'mongodb';
import { AppError } from '../../utils/errors/app.error';
import { PlayersService } from 'src/players/services/players.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService
  ) { }

  async createCategory(category: CreateCategoryDto): Promise<{ status: number, data: Category}> {
    try {
        if (await this.validationCategoryExists(category.name)) {
          throw new BadRequestException('Category already exists');
        }
       const categorieCreated = new this.categoryModel(category);
       await categorieCreated.save();
       return { status: 1, data: categorieCreated };
    } catch(error) {
      this.logger.error(`Failed to create category: ${error}`);
      throw new AppError(error.message || 'Failed to create category', CategoriesService.name, this.createCategory.name, error.statusCode ?? 400);
    }
  }

  async updateCategory(_id: string, category: UpdateCategoryDto): Promise<{ status: number, data: Category}> { 
    try {
      if (!await this.validationCategoryExists(_id)) {
        throw new NotFoundException('Category not found');
      }
      const categorieUpdated = await this.categoryModel.findOneAndUpdate(
        { _id },
        category, { new: true }
      ).exec();
      return { status: 1, data: categorieUpdated };
    } catch(error) {
      this.logger.error(`Failed to update category: ${error}`);
      throw new AppError(error.message || 'Failed to update category', CategoriesService.name, this.updateCategory.name, error.statusCode ?? 400);
    }
  }

  async deleteCategory(_id: string): Promise<{ status: number, data: Category }> {
    try {
      if (!await this.validationCategoryExists(_id)) {
        throw new BadRequestException('Category not found');
      }
      const categorieDeleted = await this.categoryModel.findOneAndDelete({ _id }).exec();
      return { status: 1, data: categorieDeleted };
    } catch(error) {
      this.logger.error(`Failed to delete category: ${error}`);
      throw new AppError(error.message || 'Failed to delete category', CategoriesService.name, this.deleteCategory.name, error.statusCode ?? 400);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().populate('players').exec();
    } catch(error) {
      this.logger.error(`Failed to get all categories: ${error}`);
      throw new AppError(error.message || 'Failed to get all categories', CategoriesService.name, this.getAllCategories.name, error.statusCode ?? 400);
    }
  }

  async getCategoryById(_id: string): Promise<Category[]> {
    try {
      return this.categoryModel.find({ _id }).populate("players").exec();
    } catch(error) {
      this.logger.error(`Failed to get category by id: ${error}`);
      throw new AppError(error.message || 'Failed to get category by id', CategoriesService.name, this.getCategoryById.name, error.statusCode ?? 400);
    }
  }

  async assignPlayerInCategory(_idCategorie: string, _idJogador: string): Promise<{ status: number }> {
    try {
      const [ verifyCategorie, verifyPlayer,  verifyassignCategoriePlayer ] = await Promise.all([
        this.validationCategoryExists(_idCategorie),
        this.playersService.validationPlayerExists(_idJogador),
        this.categoryModel.findOne().where('players').in([_idJogador]).exec()
      ]);
      
      if (!verifyCategorie) throw new NotFoundException('Category not found');
      if (!verifyPlayer) throw new NotFoundException('Player not found');
      if (verifyassignCategoriePlayer) throw new BadRequestException('Player already assigned to a category');

      await this.categoryModel.findOneAndUpdate(
        { _id: _idCategorie },
        { $addToSet: { players: _idJogador } },
        { new: true }, 
      ).exec();

      return { status: 1 };
    } catch (error) {
      this.logger.error(`Failed to assign player in category: ${error}`);
      throw new AppError(error.message || 'Failed to assign player in category', CategoriesService.name, this.assignPlayerInCategory.name, error.statusCode ?? 400);
    }
  }

  async validationCategoryExists(key: string): Promise<boolean> {
    try {
      const queryParams = this.getQueryParams(ObjectId.isValid(key), key);
      const categorieFound = await this.categoryModel.findOne(queryParams).exec();
      return Boolean(categorieFound);
    } catch(error) {
      this.logger.error(`Failed to validate category exists: ${error}`);
      throw new AppError(error.message || 'Failed to validate category exists', CategoriesService.name, this.validationCategoryExists.name, error.statusCode ?? 400);
    }
  }

  private getQueryParams(isObjectIdValid: boolean, key: string): { _id: string } | { name: string } {
    return isObjectIdValid ? { _id: key } : { name: key };
  }
}
