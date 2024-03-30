import { Injectable, BadRequestException, NotFoundException,  HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categorie } from '../interfaces/categorie.interface';
import { Model } from 'mongoose';
import { CreateCategorieDto } from '../dtos/create-categorie.dto';
import { UpdateCategorieDto } from '../dtos/update-categorie.dto';
import { ObjectId } from 'mongodb';
import { AppError } from '../../helpers/errors/app.error';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Categorie') private readonly categorieModel: Model<Categorie>) { }

  async createCategorie(categorie: CreateCategorieDto): Promise<{ status: number, data: Categorie}> {
    try {
        if (await this.validationCategorieExists(categorie.name)) {
          throw new BadRequestException(categorie, 'Category already exists');
        }
       const categorieCreated = new this.categorieModel(categorie);
       await categorieCreated.save();
       return { status: 1, data: categorieCreated};
    } catch(error) {
      if (error instanceof HttpException) throw error;
      throw new AppError(error.message || 'Failed to create categorie', this.createCategorie.name, error.statusCode ?? 400);
    }
  }

  async updateCategorie(_id: string, categorie: UpdateCategorieDto): Promise<{ status: number, data: Categorie}> { 
    try {
      if (!await this.validationCategorieExists(_id)) {
        throw new NotFoundException(_id, 'Categorie not found');
      }
      const categorieUpdated = await this.categorieModel.findOneAndUpdate(
        { _id },
        categorie, { new: true }
      ).exec();
      return { status: 1, data: categorieUpdated };
    } catch(error) {
      if (error instanceof HttpException) throw error;
      throw new AppError(error.message || 'Failed to update categorie', this.updateCategorie.name, error.statusCode ?? 400);
    }
  }

  async deleteCategorie(_id: string): Promise<{ status: number, data: Categorie }> {
    try {
      if (!await this.validationCategorieExists(_id)) {
        throw new BadRequestException(_id, 'Categorie not found');
      }
      const categorieDeleted = await this.categorieModel.findOneAndDelete({ _id }).exec();
      return { status: 1, data: categorieDeleted };
    } catch(error) {
      if (error instanceof HttpException) throw error;
      throw new AppError(error.message || 'Failed to delete categorie', this.deleteCategorie.name, error.statusCode ?? 400);
    }
  }

  async getAllCategories(): Promise<Categorie[]> {
    try {
      return await this.categorieModel.find().exec();
    } catch(error) {
      if (error instanceof HttpException) throw error;
      throw new AppError(error.message || 'Failed to get categories', this.getAllCategories.name, error.statusCode ?? 400);
    }
  }

  async getCategorieById(_id: string): Promise<Categorie[]> {
    try {
      return this.categorieModel.find({ _id }).exec();
    } catch(error) {
      if (error instanceof HttpException) throw error;      
      throw new AppError(error.message || 'Failed to get categorie by id', this.getCategorieById.name, error.statusCode ?? 400);
    }
  }

  async validationCategorieExists(chave: string): Promise<boolean> {
    try {
      const queryParams = this.getQueryParams(ObjectId.isValid(chave), chave);
      const categorieFound = await this.categorieModel.findOne(queryParams).exec();
      return Boolean(categorieFound);
    } catch(error) {
      if (error instanceof HttpException) throw error;
      throw new AppError(error.message || 'Failed to validate categorie', this.validationCategorieExists.name, error.statusCode ?? 400);
    }
  }

  private getQueryParams(isObjectIdValid: boolean, chave: string): { _id: string } | { name: string } {
    return isObjectIdValid ? { _id: chave } : { name: chave };
  }
}
