import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  message: string;
  module: string;
  method: string;
  field: string;
  statusCode: number;

  constructor(message: string, module: string, method: string, statusCode = 400) {
    super(message, statusCode);
    this.message = message;
    this.module = module;
    this.method = method;
  }
}