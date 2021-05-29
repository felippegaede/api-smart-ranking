import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultaTodasCategoria(): Promise<Categoria | Categoria[]> {
    return await this.categoriasService.consultaTodasCategorias();
  }

  @Get('/:_id')
  async consultarCategoria(@Param('_id') _id: string): Promise<Categoria> {
    return await this.categoriasService.consultarCategoriaPeloId(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Param('_id') _id: string,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriasService.atualizarCategoria(
      _id,
      atualizarCategoriaDto,
    );
  }

  @Delete('/:_id')
  async deletarCategoria(@Param('_id') _id: string): Promise<void>{
      return await this.categoriasService.deletarCategoria(_id);
  }

  @Post('/:id_categoria/jogadores/:id_jogador')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<Categoria>{
      return await this.categoriasService.atribuirCategoriaJogador(params);
  }
}
