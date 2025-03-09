import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerID: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text', {
        unique: true,
    })
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;
    
    @OneToOne(() => Location)
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: "userID",
    })
    user: User;
    
}
