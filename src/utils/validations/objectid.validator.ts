import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ObjectId } from "mongodb";

@ValidatorConstraint({ name: 'ObjectId', async: false })
export class ObjectIdValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return ObjectId.isValid(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} should be a valid ObjectId`;
  }
}
