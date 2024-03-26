import { 
  IsNumber, 
  MaxLength, 
  MinLength, 
  IsUrl, 
  IsNotEmpty
} from 'class-validator';

export class UpdatePlayerDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  readonly nationality: string;

  @IsUrl()
  readonly urlPhotoPlayer: string;
 }