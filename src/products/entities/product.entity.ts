import { Entity, Column, PrimaryGeneratedColumn, IsNull } from 'typeorm';
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id:string;
    @Column({type: 'text'})
    product_name: string;
    @Column({type: 'float'})
    price: number;
    @Column({type: 'int'})
    countSeal: number;
    //@Column({type: 'uuid'})
    //provider: string;


}
