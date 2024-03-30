import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

interface CustomResponse extends Response {
  handleError: (error: Error) => void;
}

@Injectable()
export class HandleRequestMiddleware implements NestMiddleware {
  use(req: Request, res: CustomResponse, next: NextFunction) {
    console.log('Request...');
    next();
  }
}