import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categorie } from '../interfaces/categorie.interface';
import { Model } from 'mongoose';
import { CreateCategorieDto } from '../dtos/create-categorie.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(@InjectModel('Categorie') private readonly categorieModel: Model<Categorie>) { }

  async createCategorie(categorie: CreateCategorieDto): Promise<{ status: number, data: Categorie}> {
    try {
       return { status: 1, data: null};
    } catch(error) {
      this.logger.error(`Failed to create categorie: ${error}`);
    }
  }
}
