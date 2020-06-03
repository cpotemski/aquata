import { Injectable } from '@nestjs/common';
import { CreateStationDto } from '@aquata/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StationEntity } from './station.entity';
import { MapCoordinatesEntity } from '../helper/map-coordinates.entity';
import { COORDINATES_MAX_X, COORDINATES_MAX_Y } from '@aquata/constants';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: Repository<StationEntity>,
  ) {}

  findByUserId(userId: string): Promise<StationEntity | undefined> {
    return this.stationRepository.findOne({ user: { id: userId }});
  }

  findByCoordinates(coordinates: MapCoordinatesEntity): Promise<StationEntity | undefined> {
    return this.stationRepository.findOne({ coordinates });
  }

  async create(data: CreateStationDto): Promise<StationEntity> {
    let coordinates;

    //TODO: create map with used coordinates to avoid unnecessary database access
    //TODO: implement algorithm to increase map radius as user count increases (max x% of map filled with players)
    do {
      coordinates = {
        x: Math.ceil(Math.random() * COORDINATES_MAX_X),
        y: Math.ceil(Math.random() * COORDINATES_MAX_Y)
      }
    } while (await this.findByCoordinates(coordinates));

    const station = this.stationRepository.create({
      ...data,
      coordinates
    });

    return this.stationRepository.save(station);
  }

  async getStationList(): Promise<StationEntity[]> {
    return this.stationRepository.find({ relations: ['user']});
  }

  async deleteAll() {
    return this.stationRepository.delete({});
  }

  async save(stations: StationEntity[]) {
    return this.stationRepository.save(stations);
  }
}
