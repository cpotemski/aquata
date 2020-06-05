import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MyLoggerService } from '../logger/logger.service';
import { FleetEntity } from './fleet.entity';
import { FleetActionEnum } from '@aquata/api-interfaces';
import { StationService } from '../station/station.service';
import { getMapDistance } from '@aquata/helper';
import { ResourceService } from '../station/resource.service';


@Injectable()
export class FleetService {
  constructor(
    @InjectRepository(FleetEntity)
    private readonly fleetRepository: Repository<FleetEntity>,
    private readonly stationService: StationService,
    private readonly resourceService: ResourceService,
    private readonly logger: MyLoggerService
  ) {
  }

  async create(userId: string, data?: DeepPartial<FleetEntity>) {
    const fleet = this.fleetRepository.create({ user: { id: userId }, ...data });
    return this.fleetRepository.save(fleet);
  }

  async startFleet(userId: string, fleetId: string, targetId: string, type: FleetActionEnum, duration: number) {
    const station = await this.stationService.findByUserId(userId);
    const fleet = await this.fleetRepository.findOne({ id: fleetId, user: { id: userId } });
    const targetStation = await this.stationService.findByUserId(targetId);

    //TODO: if attack, check if it is allowed to attack this station
    if (fleet && targetStation) {
      const distance = getMapDistance(station.coordinates, targetStation.coordinates);

      //TODO: calculate speed of fleet
      const speed = 3;

      const travelTime = Math.ceil(distance / speed);

      //TODO: calculate costs to start fleet
      const flightCosts = 100;

      if (station.resources.plutonium >= flightCosts) {
        await this.resourceService.removeResources(userId, { plutonium: flightCosts });

        return this.fleetRepository.update(fleetId, {
          action: type,
          actionTicks: duration,
          target: { id: targetId },
          remainingTime: travelTime,
          travelTime,
          returning: false
        });
      }

    }

  }

  async getFleets() {
    return this.fleetRepository.find();
  }

  async deleteAll() {
    return this.fleetRepository.delete({});
  }

  async save(fleets: FleetEntity[]) {
    return this.fleetRepository.save(fleets);
  }
}
