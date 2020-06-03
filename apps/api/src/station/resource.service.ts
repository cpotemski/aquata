import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StationEntity } from './station.entity';
import { Repository } from 'typeorm';
import { Resources, Station } from '@aquata/api-interfaces';
import { MyLoggerService } from '../logger/logger.service';
import { addResources, resourcesNegative } from '@aquata/helper';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: Repository<StationEntity>,
    private readonly logger: MyLoggerService
  ) {
  }

  async updateResources(userId: string, resources: Resources): Promise<Station> {
    const station = await this.stationRepository.findOne({ user: { id: userId } });

    station.resources = addResources(station.resources, resources);

    if (resourcesNegative(station.resources)) {
      this.logger.warn('negative resources', station, resources);
      return;
    }

    return this.stationRepository.save(station)
  }

  async hasEnoughResources(userId: string, resources: Resources): Promise<boolean> {
    const station = await this.stationRepository.findOne({ user: { id: userId } });

    return station && !resourcesNegative(addResources(station.resources, resources));
  }


}
