import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Math } from '../interfaces/math.interface';
import { Model } from 'mongoose';

@Injectable()
export class MathsService {
  constructor(
    @InjectModel('Math') private readonly mathModel: Model<Math>
  ) {}

  async createMath(): Promise<{status: number, data: Math }> {
    return {} as { status: number; data: Math };
  }
}
