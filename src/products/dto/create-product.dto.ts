import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto{
    @IsUUID('4')
    @IsOptional()
    product_id: string;

    @IsString()
    @MaxLength(40)
    product_name: string;

    @IsNumber()
    price: number;

    @IsInt()
    countSeal: number;

    @IsObject()
    provider: Provider; 
}
