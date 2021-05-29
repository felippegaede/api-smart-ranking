import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dto/atualizar-jogador.dto';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interface/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  private jogadores: Jogador[] = [];

  constructor(@InjectModel('Jogador') private jogadorModel: Model<Jogador>) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado)
      throw new BadRequestException(`O email ${email} já está cadastrado`);

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(
        `Não foi possível localizar o jogador com o id ${_id}`,
      );

    return await this.jogadorModel
      .findByIdAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(
        `Não foi possível localizar o jogador com o id ${_id}`,
      );

    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(
        `Não foi possível localizar o jogador com o _id ${_id}`,
      );

    return await this.jogadorModel.remove({ _id }).exec();
  }
}
