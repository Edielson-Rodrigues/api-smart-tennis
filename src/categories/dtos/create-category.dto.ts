import { Type } from 'class-transformer';
import { ArrayMinSize, IsAlphanumeric, IsArray, IsNotEmpty, IsNumber, MaxLength, MinLength, ValidateNested } from 'class-validator';

class Event {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  operation: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  description: string;

  @ValidateNested({ each: true })
  @Type(() => Event)
  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}