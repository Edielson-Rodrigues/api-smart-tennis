import { ArrayMinSize, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCategorieDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  description: string;

  @ArrayMinSize(1)
  events: Array<Event>;
}

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
  value: number;
}