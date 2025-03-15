import { Injectable } from '@nestjs/common';
import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
  ObjectLiteral,
  FindOneOptions,
  FindManyOptions,
  In
} from 'typeorm';

@Injectable()
class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async paginate(
    options: {
      page?: number;
      limit?: number;
      where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
      order?: FindManyOptions<T>['order'];
      relations?: string[];
    } = {}
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, where, order, relations } = options;
    const [data, total] = await this.repository.findAndCount({
      where,
      order,
      skip: (page - 1) * limit,
      take: limit,
      relations
    });
    return { data, total, page, limit };
  }

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return this.repository.findBy({
      id: In(ids)
    } as unknown as FindOptionsWhere<T>);
  }

  findById(id: string): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  findOneBy(options: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneBy(options);
  }

  count(conditions: FindOptionsWhere<T>): Promise<number> {
    return this.repository.count({ where: conditions });
  }

  async exists(conditions: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.count(conditions);
    return count > 0;
  }

  insert(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async edit(id: string, data: Partial<T>): Promise<T | null> {
    delete data['id'];
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore({
      id
    } as unknown as FindOptionsWhere<T>);
    return result.affected !== undefined && result.affected > 0;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete({
      id
    } as unknown as FindOptionsWhere<T>);
    return result.affected !== undefined && result.affected > 0;
  }
}

export default BaseService;
