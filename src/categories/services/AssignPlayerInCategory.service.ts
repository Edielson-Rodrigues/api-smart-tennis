import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { ValidationCategoryExistsService } from "./ValidationCategoryExists.service";
import { ValidationPlayerExistsService } from "src/players/services/ValidationPlayerExists.service";
import { GetCategoryByIdPlayerService } from "./GetCategoryByIdPlayer.service";

@Injectable()
export class AssignPlayerInCategoryService {
  private readonly logger = new Logger(AssignPlayerInCategoryService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly validationCategoryExistsService: ValidationCategoryExistsService,
    private readonly validationPlayerExistsService: ValidationPlayerExistsService,
    private readonly getCategoryByIdPlayerService: GetCategoryByIdPlayerService
  ) {}

  async execute(_idCategory: string, _idPlayer: string): Promise<{ status: number }> {
    try {
      const [ verifyCategorie, verifyPlayer,  verifyassignCategoriePlayer ] = await Promise.all([
        this.validationCategoryExistsService.execute(_idCategory),
        this.validationPlayerExistsService.execute(_idPlayer),
        this.getCategoryByIdPlayerService.execute(_idPlayer)
      ]);
      
      if (!verifyCategorie) throw new NotFoundException('Category not found');
      if (!verifyPlayer) throw new NotFoundException('Player not found');
      if (verifyassignCategoriePlayer) throw new BadRequestException('Player already assigned to a category');

      await this.categoryModel.findOneAndUpdate(
        { _id: _idCategory },
        { $addToSet: { players: _idPlayer } },
        { new: true }, 
      ).exec();

      return { status: 1 };
    } catch (error) {
      this.logger.error(`Failed to assign player in category: ${error}`);
      throw new AppError(error.message || 'Failed to assign player in category', AssignPlayerInCategoryService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}