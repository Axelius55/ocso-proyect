import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/managers/entities/manager.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    @InjectRepository(Employee) // 👈 Inyecta el repositorio de Employee
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationID: id,
    });
    if (!location) throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    // 1. Eliminar la relación location del manager
    await this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: null })
      .where('locationID = :id', { id })
      .execute();

    // 2. Buscar y actualizar la locación
    const location = await this.locationRepository.preload({
      locationID: id,
      ...updateLocationDto,
    });

    if (!location) throw new NotFoundException();

    const savedLocation = await this.locationRepository.save(location);

    const updated = await this.managerRepository.preload({
      managerID: updateLocationDto.manager,
      location: location,
    });
    if (!updated) throw new NotFoundException();
    this.managerRepository.save(updated);

    return savedLocation;
  }

  async remove(id: number) {
    return this.locationRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // 1. Desvincula a los Managers (ya existente)
        await transactionalEntityManager
          .createQueryBuilder()
          .update(Manager)
          .set({ location: null })
          .where('locationID = :id', { id })
          .execute();

        // 2. Desvincula a los Employees (nuevo)
        await transactionalEntityManager
          .createQueryBuilder()
          .update(Employee)
          .set({ location: null }) // Pone locationID = NULL en Employee
          .where('locationID = :id', { id })
          .execute();

        // 3. Borra la Location
        const result = await transactionalEntityManager.delete(Location, {
          locationID: id,
        });

        if (result.affected === 0) {
          throw new NotFoundException(`Location with ID ${id} not found`);
        }

        return result;
      },
    );
  }
}
