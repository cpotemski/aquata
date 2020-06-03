import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildOrderEntity } from './build-order.entity';
import { Repository } from 'typeorm';
import { CreateBuildOrderDto, Resources } from '@aquata/api-interfaces';
import { ResourceService } from '../station/resource.service';
import { multiplyResources } from '@aquata/helper';
import { MyLoggerService } from '../logger/logger.service';


@Injectable()
export class BuildService {
  constructor(
    @InjectRepository(BuildOrderEntity)
    private readonly buildOrderRepository: Repository<BuildOrderEntity>,
    private readonly resourceService: ResourceService,
    private readonly logger: MyLoggerService,
  ) {
  }

  findByUserIdAndType(userId: string, type: string): Promise<BuildOrderEntity[] | undefined> {
    return this.buildOrderRepository.find({ user: { id: userId }, type });
  }

  getBuildOrders(): Promise<BuildOrderEntity[]> {
    return this.buildOrderRepository.find();
  }

  async create(userId: string, data: CreateBuildOrderDto): Promise<BuildOrderEntity> {
    //TODO: lookup costs
    const costs: Resources = {
      aluminium: 1000,
      steel: 125,
      plutonium: 0,
      energy: 0
    };

    //TODO: lookup build duration
    const duration = 10;

    if (await this.resourceService.hasEnoughResources(userId, multiplyResources(costs, data.amount))) {
      await this.resourceService.updateResources(userId, multiplyResources(costs, data.amount * -1));
      const buildOrder = this.buildOrderRepository.create({
        ...data,
        user: { id: userId },
        remainingTime: duration
      });

      return this.buildOrderRepository.save(buildOrder);
    } else {
      this.logger.log('Not enough resources to create buildOrder', userId, data)
    }
  }

  async delete(buildOrders: BuildOrderEntity[]) {
    return this.buildOrderRepository.remove(buildOrders);
  }

  async deleteAll() {
    return this.buildOrderRepository.delete({});
  }

  async save(buildOrders: BuildOrderEntity[]) {
    return this.buildOrderRepository.save(buildOrders);
  }
}
