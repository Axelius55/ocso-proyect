import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {

    @IsUUID('4')
    @IsOptional()
    product_id:string;
    @IsString()
    @MaxLength(40)
    product_name: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsUUID('4')
    @IsString()
    @IsOptional()
    provider: string;

}
