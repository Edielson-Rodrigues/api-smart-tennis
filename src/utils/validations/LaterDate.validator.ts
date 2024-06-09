import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import dayjs from "../../Config/Dayjs";

@ValidatorConstraint({ name: LaterDateValidator.name, async: false})
export class LaterDateValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    return dayjs(value).isAfter(dayjs());
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be less than the current data`;  
  }
}