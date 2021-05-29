import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') 
    private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada)
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`);

    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);

    return await categoriaCriada.save();
  }

  async consultaTodasCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async consultarCategoriaPeloId(_id: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ _id })
      .exec();

    if (!categoriaEncontrada)
      throw new BadRequestException(
        `Não foi possível localizar a categoria com o id informado ${_id}`,
      );

    return categoriaEncontrada;
  }

  async atualizarCategoria(
    _id: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ _id })
      .exec();

    if (!categoriaEncontrada)
      throw new NotFoundException(
        `Não foi possível localizar a categoria com o id informado ${_id}`,
      );

    return await this.categoriaModel
      .findByIdAndUpdate({ _id }, { set: atualizarCategoriaDto })
      .exec();
  }

  async deletarCategoria(_id: string): Promise<void>{
    const categoriaEncontrada = await this.categoriaModel
    .findOne({ _id })
    .exec();

  if (!categoriaEncontrada)
    throw new NotFoundException(
      `Não foi possível localizar a categoria com o id informado ${_id}`,
    );

    return await this.categoriaModel.remove({_id}).exec();
  }


  async atribuirCategoriaJogador(params: string[]): Promise<Categoria> {
    const id_categoria = params['id_categoria'];
    const id_jogador = params['id_jogador'];

    await this.jogadoresService.consultarJogadoresPeloId(id_jogador);

    const categoriaEncontrada = await this.categoriaModel.findOne({ _id: id_categoria }).exec();
    if (!categoriaEncontrada)
        throw new NotFoundException(`Não foi possível localizar a categoria com o id informado ${id_categoria}`);

    const jogadorJaCadastradoNaCategoria = await this.categoriaModel.find({ _id: id_categoria }).where('jogadores').in(id_jogador).exec();
    if (jogadorJaCadastradoNaCategoria)
        throw new BadRequestException(`Jogador já cadastrado na categoria`);

    categoriaEncontrada.jogadores.push(id_jogador);
    return await this.categoriaModel.findByIdAndUpdate({_id: id_categoria}, {$set: categoriaEncontrada}).exec();
  }
}
