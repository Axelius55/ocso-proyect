
import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationID: number;
    
    @Column('text')
    locationName: string;


    @Column('text')
    locationAddress: string;

    
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(() => Manager, {
        eager: true,
    })
    @JoinColumn({
        name: "managerID",
    })
    manager: Manager;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionID",
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];

}
