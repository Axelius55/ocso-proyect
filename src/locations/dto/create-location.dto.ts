import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";

export class CreateLocationDto {
    @IsString()
    @MaxLength(40)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAdress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
}
