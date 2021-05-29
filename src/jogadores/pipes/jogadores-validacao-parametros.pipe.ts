import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value)
      throw new BadRequestException(`O ${metadata.data} deve ser informado`);

    return value;
  }
}
