import { IsDateString, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { ObjectIdValidator } from "src/utils/validations/objectId.validator";
import { STATUS_CHALLENGE } from "../types/challenge.status.type";

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  description: string;
  
  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  category: string

  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  challenger: string

  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  challenged: string

  @IsEmpty()
  dateTimeSent: Date;

  @IsNotEmpty()
  @IsDateString()
  dateTimeChallenge: string;

  @IsEmpty()
  status: STATUS_CHALLENGE;
}
