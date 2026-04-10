import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) { }
  async create(createAuthorDto: CreateAuthorDto) {

    const author = await this.prisma.author.create({
      data: {
        name: createAuthorDto.name
      }
    })
    if (!author) return new HttpException('error al crear autor', HttpStatus.BAD_REQUEST)

    return { status: 'success', data: author };
  }

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.prisma.author.update({
      where: { id: id.toString() }, data: {
        name: updateAuthorDto.name
      }
    })
    return { status: 'success', message: `Se ha actualizado a${updateAuthorDto.name}`, data: author };
  }

  async remove(id: number) {
    const author = await this.prisma.author.delete({
      where: { id: id.toString() }
    })
    return { status: 'success', message: `Se ha eliminado al autor`, data: author };
  }
}
