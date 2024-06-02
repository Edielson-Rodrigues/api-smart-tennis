import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";
import { ObjectId } from "mongodb";

@Injectable()
export class ValidationCategoryExistsService {
  private readonly logger = new Logger(ValidationCategoryExistsService.name);
  
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}

  async execute(key: string): Promise<boolean> {
    try {
      const queryFilter = ObjectId.isValid(key) ? { _id: key } : { name: key};
      const categoryFound = await this.categoryModel.exists(queryFilter);
      return Boolean(categoryFound);
    } catch(error) {
      this.logger.error(`Failed to validate category exists: ${error}`);
      throw new AppError(error.message || 'Failed to validate category exists', ValidationCategoryExistsService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}