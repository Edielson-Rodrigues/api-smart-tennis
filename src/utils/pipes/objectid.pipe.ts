import { PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export class ObjectIdPipe implements PipeTransform {
 transform(value: any, metadata: ArgumentMetadata) {
  if (!value) throw new BadRequestException(`The value of ${metadata.type} should not be empty`);
  if (!ObjectId.isValid(value)) throw new BadRequestException(`The value of ${metadata.data} should be a valid ObjectId`);
  return value;
 }
} 