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
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(id: string, args: ValidationArguments) {
    try {
      const user = await this.userService.findById(id);
      return !!user;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Người dùng không tồn tại!';
  }
}

function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint
    });
  };
}

export default IsUserExist;
