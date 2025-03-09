import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MaxLength } from "class-validator";


export class CreateRegionDto {
    @ApiProperty({
        default: "Querétaro"
    })
    @IsString()
    @MaxLength(100)
    regionName: string;

    @ApiProperty({
        default: ["Juriquilla", "San Miguel de Allende", "Santiago de Querétaro"]
    })
    @IsArray()
    regionStates: string[];
}
