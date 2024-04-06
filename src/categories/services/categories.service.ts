import { Injectable, BadRequestException, NotFoundException,  HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categorie } from '../interfaces/categorie.interface';
import { Model } from 'mongoose';
import { CreateCategorieDto } from '../dtos/create-categorie.dto';
import { UpdateCategorieDto } from '../dtos/update-categorie.dto';
import { ObjectId } from 'mongodb';
import { AppError } from '../../utils/errors/app.error';
import { PlayersService } from 'src/players/services/players.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  
  constructor(
    @InjectModel('Categorie') private readonly categorieModel: Model<Categorie>,
    private readonly playersService: PlayersService
  ) { }

  async createCategorie(categorie: CreateCategorieDto): Promise<{ status: number, data: Categorie}> {
    try {
        if (await this.validationCategorieExists(categorie.name)) {
          throw new BadRequestException('Category already exists');
        }
       const categorieCreated = new this.categorieModel(categorie);
       await categorieCreated.save();
       return { status: 1, data: categorieCreated};
    } catch(error) {
      this.logger.error(`Failed to create categorie: ${error}`);
      throw new AppError(error.message || 'Failed to create categorie', CategoriesService.name, this.createCategorie.name, error.statusCode ?? 400);
    }
  }

  async updateCategorie(_id: string, categorie: UpdateCategorieDto): Promise<{ status: number, data: Categorie}> { 
    try {
      if (!await this.validationCategorieExists(_id)) {
        throw new NotFoundException('Categorie not found');
      }
      const categorieUpdated = await this.categorieModel.findOneAndUpdate(
        { _id },
        categorie, { new: true }
      ).exec();
      return { status: 1, data: categorieUpdated };
    } catch(error) {
      this.logger.error(`Failed to update categorie: ${error}`);
      throw new AppError(error.message || 'Failed to update categorie', CategoriesService.name, this.updateCategorie.name, error.statusCode ?? 400);
    }
  }

  async deleteCategorie(_id: string): Promise<{ status: number, data: Categorie }> {
    try {
      if (!await this.validationCategorieExists(_id)) {
        throw new BadRequestException('Categorie not found');
      }
      const categorieDeleted = await this.categorieModel.findOneAndDelete({ _id }).exec();
      return { status: 1, data: categorieDeleted };
    } catch(error) {
      this.logger.error(`Failed to delete categorie: ${error}`);
      throw new AppError(error.message || 'Failed to delete categorie', CategoriesService.name, this.deleteCategorie.name, error.statusCode ?? 400);
    }
  }

  async getAllCategories(): Promise<Categorie[]> {
    try {
      return await this.categorieModel.find().populate('players').exec();
    } catch(error) {
      this.logger.error(`Failed to get all categories: ${error}`);
      throw new AppError(error.message || 'Failed to get all categories', CategoriesService.name, this.getAllCategories.name, error.statusCode ?? 400);
    }
  }

  async getCategorieById(_id: string): Promise<Categorie[]> {
    try {
      return this.categorieModel.find({ _id }).populate("players").exec();
    } catch(error) {
      this.logger.error(`Failed to get categorie by id: ${error}`);
      throw new AppError(error.message || 'Failed to get categorie by id', CategoriesService.name, this.getCategorieById.name, error.statusCode ?? 400);
    }
  }

  async assignPlayerInCategorie(_idCategorie: string, _idJogador: string): Promise<{ status: number }> {
    try {
      const [ verifyCategorie, verifyPlayer, verifyassignCategoriePlayer ] = await Promise.all([
        this.validationCategorieExists(_idCategorie),
        this.playersService.validationPlayerExists(_idJogador),
        this.categorieModel.findOne().where('players').in([_idJogador]).exec()
      ]);
      
      if (!verifyCategorie) throw new NotFoundException('Categorie not found');
      if (!verifyPlayer) throw new NotFoundException('Player not found');
      if (verifyassignCategoriePlayer) throw new BadRequestException('Player already assigned to a category');

      await this.categorieModel.findOneAndUpdate(
        { _id: _idCategorie },
        { $addToSet: { players: _idJogador } },
        { new: true }, 
      ).exec();

      return { status: 1 };
    } catch (error) {
      this.logger.error(`Failed to assign player in categorie: ${error}`);
      throw new AppError(error.message || 'Failed to assign player in categorie', CategoriesService.name, this.assignPlayerInCategorie.name, error.statusCode ?? 400);
    }
  }

  async validationCategorieExists(chave: string): Promise<boolean> {
    try {
      const queryParams = this.getQueryParams(ObjectId.isValid(chave), chave);
      const categorieFound = await this.categorieModel.findOne(queryParams).exec();
      return Boolean(categorieFound);
    } catch(error) {
      this.logger.error(`Failed to validate categorie exists: ${error}`);
      throw new AppError(error.message || 'Failed to validate categorie exists', CategoriesService.name, this.validationCategorieExists.name, error.statusCode ?? 400);
    }
  }

  private getQueryParams(isObjectIdValid: boolean, chave: string): { _id: string } | { name: string } {
    return isObjectIdValid ? { _id: chave } : { name: chave };
  }
}
