import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationID: id,
      },
    });
  }

  findAll() {
    return this.employeeRepository.find({
      relations: {
        location: true,
      },
    });
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      where: {
        employee_id: id,
      },
      relations: {
        location: true,
      },
    });
    return employee;
  }
  /*const employee= this.employees.filter((employee) => employee.id === id)[0];
    return employee;
  }
    */
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employee_id: id,
      ...updateEmployeeDto,
    });
    if (!employeeToUpdate) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return await this.employeeRepository.save(employeeToUpdate);
  }
  remove(id: string) {
    this.employeeRepository.delete({
      employee_id: id,
    });
    return {
      message: 'Empleado eliminado',
    };
  }
}
