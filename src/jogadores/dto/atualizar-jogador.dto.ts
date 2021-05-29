import { Allow } from 'class-validator';

export class AtualizarJogadorDto {
  @Allow()
  readonly telefoneCelular: string;

  @Allow()
  nome: string;
}
