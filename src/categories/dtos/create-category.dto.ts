import { ArrayMinSize, IsAlphanumeric, IsArray, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

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
  @IsAlphanumeric()
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

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}