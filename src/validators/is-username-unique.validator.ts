import UserService from '@modules/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(username: string, args: ValidationArguments) {
    try {
      const user = await this.userService.findByUsernameWithDeleted(username);
      return !user;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Tên người dùng đã được sử dụng!';
  }
}

function IsUsernameUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameUniqueConstraint
    });
  };
}

export default IsUsernameUnique;
