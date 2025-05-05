import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { ManagersModule } from 'src/managers/managers.module';
import { Manager } from 'src/managers/entities/manager.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Manager, Employee]),
    ManagersModule,
    EmployeesModule,
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
