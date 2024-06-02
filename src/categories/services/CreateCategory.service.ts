import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { AppError } from "src/utils/errors/app.error";
import { ValidationCategoryExistsService } from "./ValidationCategoryExists.service";

@Injectable()
export class CreateCategoryService {
  private readonly logger = new Logger(CreateCategoryService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly validationCategoryExistsService: ValidationCategoryExistsService
  ) {}

  async execute(category: CreateCategoryDto): Promise<{ status: number, data: Category }> {
    try {
      if (await this.validationCategoryExistsService.execute(category.name)) {
        throw new BadRequestException('Category already exists');
      }
      const categoryCreated = new this.categoryModel(category);
      await categoryCreated.save();
      return { status: 1, data: categoryCreated };
    } catch (error) {
      this.logger.error(`Failed to create category: ${error}`);
      throw new AppError(error.message || 'Failed to create category', CreateCategoryService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}