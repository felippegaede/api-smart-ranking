import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";

export class AtualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    eventos: Array<Evento>
}
