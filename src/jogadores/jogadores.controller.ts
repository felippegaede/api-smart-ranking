import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AtualizarJogadorDto } from './dto/atualizar-jogador.dto';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interface/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  async atualizarJogador(
    @Param('_id') _id: string,
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.atualizarJogador(
      _id,
      atualizarJogadorDto,
    );
  }

  @Get()
  async consultarTodosJogadores(): Promise<Jogador | Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogador(
    @Param('_id') _id: string,
  ): Promise<Jogador | Jogador[]> {
    return await this.jogadoresService.consultarJogadoresPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id') _id: string): Promise<void> {
    return await this.jogadoresService.deletarJogador(_id);
  }
}
