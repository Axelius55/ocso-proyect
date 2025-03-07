import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employee_id: string;
    @Column('text')
    name: string
    @Column('text')
    lastname: string;
    @Column('text')
    phoneNumber: string;
    @Column('text')
    email: string;
    @Column({
        type: 'text',
        nullable: true,
    })
    photoUrl: string;

}
