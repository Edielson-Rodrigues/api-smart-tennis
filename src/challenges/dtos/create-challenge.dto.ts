import { ArrayMaxSize, ArrayMinSize, IsDateString, IsNotEmpty, Validate } from 'class-validator';
import { ObjectIdValidator } from 'src/utils/validations/objectid.validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  category: string;

  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  challenger: string;

  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  challenged: string;

  @IsDateString()
  dateTimeChallenge: string;
}