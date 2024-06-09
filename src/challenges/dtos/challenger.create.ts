import { IsDateString, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { ObjectIdValidator } from "src/utils/validations/ObjectId.validator";
import { STATUS_CHALLENGE } from "../types/challenge.status.type";
import { LaterDateValidator } from "src/utils/validations/LaterDate.validator";

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
  @Validate(LaterDateValidator)
  dateTimeChallenge: string;

  @IsEmpty()
  status: STATUS_CHALLENGE;
}
