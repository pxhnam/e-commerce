import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsUsernameValidConstraint implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    return /^[a-zA-Z0-9]+$/.test(username);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username không hợp lệ!';
  }
}

function IsUsernameValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameValidConstraint
    });
  };
}

export default IsUsernameValid;
