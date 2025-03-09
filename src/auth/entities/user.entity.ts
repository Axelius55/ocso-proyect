import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    userID: string;
    @Column('text', {
        unique: true,

    })
    userEmail: string;
    @Column('text')
    userPassword: string;
    @Column('simple-array', {
        default: "Employee"
    })
    userRoles: string[];

    @OneToOne(() => Manager)
    managaer: Manager;

    @OneToOne(() => Employee)
    employee: Employee;
}