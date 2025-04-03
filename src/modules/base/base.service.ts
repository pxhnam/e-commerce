import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  ObjectLiteral,
  Repository
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

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findOneBy({
      id
    } as unknown as FindOptionsWhere<T>);
    if (!entity) throw new NotFoundException();
    return entity;
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

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.findById(id);
    delete data['id'];
    Object.assign(entity, data);
    return await this.repository.save(entity);
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore({
      id
    } as unknown as FindOptionsWhere<T>);
    return result.affected !== undefined && result.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return this.statusDelete(result);
  }

  async deleteMany(ids: string[]): Promise<boolean> {
    const result = await this.repository.delete(ids);
    return this.statusDelete(result);
  }

  async deleteBy(where: FindOptionsWhere<T>): Promise<boolean> {
    const result = await this.repository.delete(where);
    return this.statusDelete(result);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return this.statusDelete(result);
  }

  async softDeleteMany(ids: string[]): Promise<boolean> {
    const result = await this.repository.softDelete(ids);
    return this.statusDelete(result);
  }

  async softDeleteBy(where: FindOptionsWhere<T>): Promise<boolean> {
    const result = await this.repository.softDelete(where);
    return this.statusDelete(result);
  }

  private statusDelete(result: DeleteResult): boolean {
    return !!(result?.affected && result.affected > 0);
  }
}

export default BaseService;
