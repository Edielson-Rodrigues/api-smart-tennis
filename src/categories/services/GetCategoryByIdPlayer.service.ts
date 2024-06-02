import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../interfaces/category.interface";
import { Model } from "mongoose";
import { AppError } from "src/utils/errors/app.error";

@Injectable()
export class GetCategoryByIdPlayerService {
  private readonly logger = new Logger(GetCategoryByIdPlayerService.name);

  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<Category>
  ) {}

  async execute(_id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findOne().where('players').in([_id]).exec();
      return category;
    } catch (error) {
      this.logger.error(`Failed to get category by _id player: ${error}`);
      throw new AppError(error.message ?? `Failed to get category by _id player`, GetCategoryByIdPlayerService.name, this.execute.name, error.response?.statusCode ?? 400);
    }
  }
}