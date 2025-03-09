import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employee_id: string;
    @Column('text')
    employeeName: string
    @Column('text')
    employeeLastname: string;
    @Column('text')
    employeePhoneNumber: string;
    @Column('text', {
        unique: true,
    })
    employeeEmail: string;
    @Column({
        type: 'text',
        nullable: true,
    })
    employeePhoto: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: "locationID",
    })
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: "userID",
    })
    user: User;

}
