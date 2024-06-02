import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";

@Injectable()
export class GetAllCategoriesService {
  private readonly logger = new Logger(GetAllCategoriesService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async execute(): Promise<{ status: number, data: Array<Category> }> {
    try {
      const categories = await this.categoryModel.find().populate('players').exec();
      return { status: 1, data: categories };
    } catch (error) {
      this.logger.error(`Failed to get all categories: ${error}`);
      throw new AppError(error.message || 'Failed to get all categories', GetAllCategoriesService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}