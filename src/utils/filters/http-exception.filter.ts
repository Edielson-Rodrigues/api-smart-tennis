import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express';
import { AppError } from "../errors/app.error";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log('exception', exception)
    return response
      .status(status)
      .json(this.getPersonalizedResponse(exception));
  }

  private getPersonalizedResponse(error: any) {
    if (error instanceof AppError) {
      return {
        message: error.message,
        timestamp: new Date().toISOString(),
        path: {
          module: error.module,
          method: error.method,
        }
      }
    } 
    
    const response = error.getResponse();
    return {
      message: response['message'] ?? 'Internal server error',
      error: response['error'] ?? 'Internal server error',
      timestamp: new Date().toISOString(),
    }
  }
}
