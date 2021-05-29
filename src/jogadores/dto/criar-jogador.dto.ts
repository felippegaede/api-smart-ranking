import { Allow, IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @Allow()
  readonly telefoneCelular: string;

  @Allow()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Allow()
  nome: string;
}
