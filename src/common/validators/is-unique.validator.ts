import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { EntityManager, ObjectLiteral } from 'typeorm';

type TIsUnique = {
  table: string;
  column: string;
};

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const { table, column } = args.constraints[0] as TIsUnique;
    const id = args.object['id'] as string;

    const query = this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .withDeleted()
      .where({ [column]: value });

    if (id) {
      query.andWhere(`${table}.id != :id`, { id });
    }

    const exists = await query.getExists();
    return !exists;
  }

  defaultMessage(args: ValidationArguments): string {
    const field: string = args.property;
    return `${field} is already exist`;
  }
}

function IsUnique(options: TIsUnique, validationOptions?: ValidationOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint
    });
  };
}

export default IsUnique;
