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

export class UpdateCategorieDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  description: string;
  
 @IsArray()
 @ArrayMinSize(1)
 events: Array<Event>;
}
