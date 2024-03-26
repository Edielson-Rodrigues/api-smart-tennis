import { 
  IsEmail, 
  IsNumber, 
  MaxLength, 
  MinLength, 
  IsUrl, 
  IsNotEmpty
} from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

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