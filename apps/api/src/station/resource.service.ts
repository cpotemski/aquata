import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StationEntity } from './station.entity';
import { Repository } from 'typeorm';
import { Resources, Station } from '@aquata/api-interfaces';
import { MyLoggerService } from '../logger/logger.service';
import { addResources, enoughResources, multiplyResources } from '@aquata/helper';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: Repository<StationEntity>,
    private readonly logger: MyLoggerService
  ) {
  }

  async removeResources(userId: string, resources: Partial<Resources>): Promise<Station> {
    if (this.hasEnoughResources(userId, resources)) {
      return this.addResources(userId, multiplyResources(resources, -1));
    }
  }

  async addResources(userId: string, resources: Partial<Resources>): Promise<Station> {
    const station = await this.stationRepository.findOne({ user: { id: userId } });
    station.resources = addResources(station.resources, resources);

    return this.stationRepository.save(station);
  }

  async hasEnoughResources(userId: string, resources: Partial<Resources>): Promise<boolean> {
    const station = await this.stationRepository.findOne({ user: { id: userId } });

    return station && enoughResources(station.resources, resources);
  }


}
