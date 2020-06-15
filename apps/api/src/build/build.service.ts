import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildOrderEntity } from './build-order.entity';
import { Repository } from 'typeorm';
import { BuildOrderType, Ships } from '@aquata/api-interfaces';
import { ResourceService } from '../station/resource.service';
import { MyLoggerService } from '../logger/logger.service';
import { Ship, shipData } from '@aquata/ship-data';
import { GenericService, multiply } from '@aquata/helper';


@Injectable()
export class BuildService extends GenericService<BuildOrderEntity> {
  constructor(
    @InjectRepository(BuildOrderEntity)
    private readonly buildOrderRepository: Repository<BuildOrderEntity>,
    private readonly resourceService: ResourceService,
    logger: MyLoggerService
  ) {
    super(buildOrderRepository, logger);
  }

  findByUserIdAndType(userId: string, type: string): Promise<BuildOrderEntity[] | undefined> {
    return this.buildOrderRepository.find({ user: { id: userId }, type });
  }

  async create(userId: string, order: Ships): Promise<BuildOrderEntity[]> {
    const orderPromises = Object.keys(order).map(async ship => {
      const amount = order[ship];
      const shipToBuild: Ship = shipData.find(s => s.name === ship);
      if (shipToBuild) {
        const costs = multiply(shipToBuild.costs, amount);
        const buildTime = shipToBuild.buildTime;

        if (await this.resourceService.hasEnoughResources(userId, costs)) {
          await this.resourceService.removeResources(userId, costs);
          return this.buildOrderRepository.create({
            type: BuildOrderType.SHIP,
            what: ship,
            amount,
            user: { id: userId },
            remainingTime: buildTime
          });
        } else {
          this.logger.log('Not enough resources to create buildOrder', userId, order, costs);
        }
      }
    });

    const orderEntities = await Promise.all(orderPromises.filter(promise => promise !== undefined));

    return this.buildOrderRepository.save(orderEntities);
  }
}
