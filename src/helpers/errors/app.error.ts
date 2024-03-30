import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  message: string;
  module: string;
  field: string;
  statusCode: number;

  constructor(message: string, module: string, statusCode = 400, field?: string) {
    super(message, statusCode);
    this.message = message;
    this.module = module;
    this.field = field;
    this.statusCode = statusCode;
  }
}