import { Injectable } from '@nestjs/common';
import { CreateStationDto } from '@aquata/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { MapCoordinates } from '../helper/map-coordinates.entity';
import { COORDINATES_MAX_X, COORDINATES_MAX_Y } from '@aquata/constants';
import { User } from '../user/user.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}

  findByUserId(userId: string): Promise<Station | undefined> {
    return this.stationRepository.findOne({ user: { id: userId }});
  }

  findByCoordinates(coordinates: MapCoordinates): Promise<Station | undefined> {
    return this.stationRepository.findOne({ coordinates });
  }

  async create(data: CreateStationDto): Promise<Station> {
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

  getStationList(): Promise<Station[]> {
    return this.stationRepository.find({ relations: ['user']});
  }

  async deleteAll() {
    return this.stationRepository.delete({});
  }
}
