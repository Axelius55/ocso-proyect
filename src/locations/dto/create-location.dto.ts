import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto {
    
    @ApiProperty({
        default: "OCSO juriquilla"
    })
    @IsString()
    @MaxLength(40)
    locationName: string;

    @ApiProperty({
        default: "Avenida nose, S/N , 78902"
    })
    @IsString()
    @MaxLength(160)
    locationAddress: string;

    @ApiProperty({
        default: [12,12]
    })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    
    @IsObject()
    @IsOptional()
    region: Region;
}
