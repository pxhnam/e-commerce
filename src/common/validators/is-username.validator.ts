import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    return /^[a-zA-Z0-9]+$/.test(username);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username không hợp lệ!';
  }
}

function IsUsername(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameConstraint
    });
  };
}

export default IsUsername;
