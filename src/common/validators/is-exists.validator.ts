import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { EntityManager, ObjectLiteral } from 'typeorm';

type TIsExists = {
  table: string;
  column?: string;
  withDeleted?: boolean;
};

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const {
      table,
      column = 'id',
      withDeleted = false
    } = args.constraints[0] as TIsExists;

    const queryBuilder = this.entityManager
      .getRepository(table)
      .createQueryBuilder(table);
    if (withDeleted) {
      queryBuilder.withDeleted();
    }
    return await queryBuilder.where({ [column]: value }).getExists();
  }

  defaultMessage(args: ValidationArguments): string {
    const field: string = args.property;
    return `${field} does not exist`;
  }
}

function IsExists(options: TIsExists, validationOptions?: ValidationOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistsConstraint
    });
  };
}

export default IsExists;
