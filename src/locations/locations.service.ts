import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    private locationRepository: Repository<Location>
  ){}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationID: id,
    });
    if(!location) throw new NotFoundException();
    return location;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationRepository.preload({
      locationID: id,
      ...updateLocationDto,
    });
    return location;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationID: id,
    });
  }
}
