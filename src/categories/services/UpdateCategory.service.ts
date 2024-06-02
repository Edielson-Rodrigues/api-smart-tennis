import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { AppError } from "src/utils/errors/app.error";
import { ValidationCategoryExistsService } from "./ValidationCategoryExists.service";

@Injectable()
export class UpdateCategoryService {
  private readonly logger = new Logger(UpdateCategoryService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly validationCategoryExistsService: ValidationCategoryExistsService
  ) {}

  async execute(_id: string, category: UpdateCategoryDto): Promise<{ status: number, data: Category }> {
    try {
      if (await this.validationCategoryExistsService.execute(_id)) {
        throw new NotFoundException('Category not found');
      }
      const categoryUpdated = await this.categoryModel.findOneAndUpdate(
        { _id },
        category,
        { new: true }
      ).exec();

      return { status: 1, data: categoryUpdated };
    } catch (error) {
      this.logger.error(`Failed to update category: ${error}`);
      throw new AppError(error.message || 'Failed to update category', UpdateCategoryService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}