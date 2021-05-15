import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interface/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado)
      return this.atualizar(jogadorEncontrado, criarJogadorDto);

    return this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
    if (!jogadorEncontrado)
      throw new NotFoundException(`Não foi possível localizar o jogador com o email ${email}`);

    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void>{
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
    if (!jogadorEncontrado)
      throw new NotFoundException(`Não foi possível localizar o jogador com o email ${email}`);

    this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      email,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 3,
      urlFotoJogador: 'https://google.com.br/foto123.jpeg',
    };

    this.jogadores.push(jogador);
    this.logger.log(`CriaJogadorDto ${JSON.stringify(jogador)}`);
  }

  private atualizar(jogadorEncontrado, criarJogadorDto): void {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }
}
