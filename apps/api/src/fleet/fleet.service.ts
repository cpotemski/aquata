import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MyLoggerService } from '../logger/logger.service';
import { FleetEntity } from './fleet.entity';
import { FleetActionEnum, MoveShipsDto, Ships } from '@aquata/api-interfaces';
import { StationService } from '../station/station.service';
import { add, GenericService, getMapDistance, isNegative, substract, userIsOwner } from '@aquata/helper';
import { ResourceService } from '../station/resource.service';


@Injectable()
export class FleetService extends GenericService<FleetEntity> {
  constructor(
    @InjectRepository(FleetEntity)
    private readonly fleetRepository: Repository<FleetEntity>,
    private readonly stationService: StationService,
    private readonly resourceService: ResourceService,
    logger: MyLoggerService
  ) {
    super(fleetRepository, logger);
  }

  async create(userId: string, data?: DeepPartial<FleetEntity>, baseFleet: boolean = false): Promise<FleetEntity> {
    const fleet = this.fleetRepository.create({ user: { id: userId }, ...data, baseFleet });
    return this.fleetRepository.save(fleet);
  }

  async startFleet(userId: string, fleetId: string, targetId: string, type: FleetActionEnum, duration: number) {
    const station = await this.stationService.findByUserId(userId);
    const fleet = await this.fleetRepository.findOne({ id: fleetId, user: { id: userId } });
    const targetStation = await this.stationService.findByUserId(targetId);

    //TODO: if attack, check if it is allowed to attack this station
    if (fleet && targetStation && fleet.baseFleet === false) {
      const distance = getMapDistance(station.coordinates, targetStation.coordinates);

      //TODO: calculate speed of fleet
      const speed = 3;

      let travelTime = Math.ceil(distance / speed);
      if (fleet.action === FleetActionEnum.ATTACK) {
        //TODO: attack malus?
        travelTime += 1;
      }

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

  async moveShips(userId: string, moveShipsDto: MoveShipsDto): Promise<FleetEntity[]> {
    const { fromId, toId, ships } = moveShipsDto;
    const fromFleet = await this.fleetRepository.findOne(fromId);
    const toFleet = await this.fleetRepository.findOne(toId);

    fromFleet.ships = substract(fromFleet.ships, ships);
    if (userIsOwner(userId, fromFleet) && userIsOwner(userId, toFleet) && !(isNegative(fromFleet.ships) || fromFleet.action || toFleet.action)) {
      toFleet.ships = add(toFleet.ships, ships);
      return this.fleetRepository.save([fromFleet, toFleet]);
    }
  }

  async addShips(fleetId: string, ships: Ships) {
    const fleet = await this.fleetRepository.findOne(fleetId);
    if (!fleet.action) {
      fleet.ships = add(fleet.ships, ships);
      return this.fleetRepository.save(fleet);
    }
  }
}
