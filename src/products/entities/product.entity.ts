import { Provider } from 'src/providers/entities/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, IsNull, ManyToOne } from 'typeorm';
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
    @ManyToOne(()=> Provider, (provider) => provider.products,{
        //eager: true,
    })
    provider: Provider;


}
