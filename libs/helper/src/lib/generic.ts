import { Repository } from 'typeorm';
import { MyLoggerService } from '../../../../apps/api/src/logger/logger.service';

export class GenericService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly logger: MyLoggerService
  ) {
  }

  findById(id: string): Promise<T | undefined> {
    return this.repository.findOne(id);
  }

  getAll(relations: string[] = []): Promise<T[]> {
    return this.repository.find({ relations });
  }

  async delete(entities: T[]) {
    return this.repository.remove(entities);
  }

  async deleteAll() {
    return this.repository.delete({});
  }

  async save(entities: T[]) {
    return this.repository.save(entities);
  }
}
