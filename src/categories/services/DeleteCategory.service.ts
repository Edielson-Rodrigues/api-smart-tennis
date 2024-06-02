import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { ValidationCategoryExistsService } from "./ValidationCategoryExists.service";

@Injectable()
export class DeleteCategoryService {
  private readonly logger = new Logger(DeleteCategoryService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly validationCategoryExistsService: ValidationCategoryExistsService
  ) {}

  async execute(_id: string): Promise<{ status: number, data: Category }> {
    try {
      if (await this.validationCategoryExistsService.execute(_id)) {
        throw new NotFoundException('Category not found');
      }
      const categoryDeleted = await this.categoryModel.findOneAndDelete({ _id }).exec();
      return { status: 1, data: categoryDeleted };
    } catch (error) {
      this.logger.error(`Failed to delete category: ${error}`);
      throw new AppError(error.message || 'Failed to delete category', DeleteCategoryService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}