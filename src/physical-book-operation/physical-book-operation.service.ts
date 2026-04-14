import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PhysicalBookOperationService {
  constructor(private prisma: PrismaService) { }



  async findAllLoans(query) {
    const QUERY: any = {}

    if (query.search) {
      QUERY.where = { OR: [{ book: { title: { contains: query.search } } }] }

    }
    QUERY.take = parseInt(query.limit) || 10

    console.log(QUERY)
    return (await this.prisma.bookOperation.findMany({
      ...QUERY, where: { ...QUERY.where, type: 'PRESTAMO' }, include: {
        book: {
          select: {
            title: true
          }
        }
      }
    }))
  }

  async settle(id) {
    const existingLoan = await this.prisma.bookOperation.findUnique({ where: { id } })
    console.log(existingLoan)
    const loan = await this.prisma.bookOperation.update({
      where: { id: id }, data: {
        type: 'DEVOLUCION',
        book: {
          update: {
            availableStock: {
              increment: existingLoan.quantity
            }
          }
        }
      }
    })

    return { state: 'success', message: 'El libro ha sido devuelto' }
  }

  async loan(makeLoanDto) {
    return await this.prisma.$transaction(async (tx) => {

      const loan = await tx.bookOperation.create({ data: { ...makeLoanDto, type: 'PRESTAMO' } })


      const physicalBook = await tx.physicalBook.findUnique({ where: { id: loan.bookId } })

      if (physicalBook.availableStock - loan.quantity < 0) {
        throw new BadRequestException('La cantidad supera el stock')
      }

      await tx.physicalBook.update({ where: { id: loan.bookId }, data: { availableStock: { decrement: loan.quantity } } })

      return { state: 'success', message: 'Prestamo hecho', loan: loan }


    })
  }

  create(createPhysicalBookOperationDto: CreatePhysicalBookOperationDto) {
    return 'This action adds a new physicalBookOperation';
  }

  findAll() {
    return `This action returns all physicalBookOperation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physicalBookOperation`;
  }

  update(id: number, updatePhysicalBookOperationDto: UpdatePhysicalBookOperationDto) {
    return `This action updates a #${id} physicalBookOperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} physicalBookOperation`;
  }
}
