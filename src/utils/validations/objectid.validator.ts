import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ObjectId } from "mongodb";

@ValidatorConstraint({ name: ObjectIdValidator.name, async: false })
export class ObjectIdValidator implements ValidatorConstraintInterface {
  validate(value: string, validationArguments: ValidationArguments): boolean {
    return ObjectId.isValid(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} should be a valid ObjectId`;
  }
}
