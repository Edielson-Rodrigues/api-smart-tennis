import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";

@Injectable()
export class GetCategoryByIdService {
  private readonly logger = new Logger(GetCategoryByIdService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async execute(_id: string): Promise<{ status: number, data: Category }> {
    try {
      const category = await this.categoryModel.findOne({_id}).populate('players').exec();
      return { status: 1, data: category };
    } catch (error) {
      this.logger.error(`Failed to get category by id: ${error}`);
      throw new AppError(error.message || 'Failed to get category by id', GetCategoryByIdService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}