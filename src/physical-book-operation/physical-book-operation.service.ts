import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PhysicalBookOperationService {
  constructor(private prisma: PrismaService) { }
  //operation global related
  async findAllOperations(query) {

    let QUERY: any = {
    }

    //pagination stuff
    const limit = parseInt(query.limit) || 10
    const page = parseInt(query.page) || 1
    const skip = (page - 1) * limit

    if (query.search != '') {
      QUERY.where = { OR: [{ book: { title: { contains: query.search } } }] }
    }

    const totalPages = await this.prisma.bookOperation.count({
      where: QUERY.where
    })

    const data = await this.prisma.bookOperation.findMany({
      ...QUERY, take: limit, skip, orderBy: {
        createdAt: 'desc'
      }, include: {
        book: {
          select: {
            title: true,
            isbn: true
          }

        }
      }
    })

    return { totalPages, data }


  }

  async addDrops(entriesDto: any) {
    const book = await this.prisma.physicalBook.update({
      where: { id: entriesDto.bookId }, data: {
        availableStock: {
          decrement: parseInt(entriesDto.quantity)
        },
        totalStock: {
          decrement: parseInt(entriesDto.quantity)
        }
      }
    })

    await this.prisma.bookOperation.create({
      data: {
        bookId: entriesDto.bookId,
        quantity: parseInt(entriesDto.quantity),
        type: 'BAJA',
        personNames: entriesDto.personNames,
        personSurNames: entriesDto.personSurNames

      }
    })

    return { status: 'success', message: 'Bajas añadidas' }
  }

  async addEntries(entriesDto: any) {
    console.log(entriesDto)

    const book = await this.prisma.physicalBook.update({
      where: { id: entriesDto.bookId }, data: {
        availableStock: {
          increment: parseInt(entriesDto.quantity)
        },
        totalStock: {
          increment: parseInt(entriesDto.quantity)
        }
      }
    })

    await this.prisma.bookOperation.create({
      data: {
        bookId: entriesDto.bookId,
        quantity: parseInt(entriesDto.quantity),
        type: 'ENTRADA',
        personNames: entriesDto.personNames,
        personSurNames: entriesDto.personSurNames

      }
    })

    return { status: 'success', message: 'Entradas añadidas' }
  }


  //loan related

  async findAllLoans(query) {
    const QUERY: any = {}


    //pagination stuff
    const page: any = query.page || 1
    const limit: any = query.limit || 10
    const skip: any = (page - 1) * limit


    if (query.search) {
      QUERY.where = { type: 'PRESTAMO', OR: [{ book: { title: { contains: query.search } } }] }
    }

    QUERY.take = parseInt(limit)
    QUERY.skip = parseInt(skip)


    const data = await this.prisma.bookOperation.findMany({
      ...QUERY, where: { ...QUERY.where, wasSettled: false, type: 'PRESTAMO' }, include: {
        book: {
          select: {
            title: true
          }
        },

      }
    })
    const totalPages = await this.prisma.bookOperation.count({
      where: { ...QUERY.where, type: 'PRESTAMO', wasSettled: false }
    })
    return { data, totalPages }
  }

  async settle(id) {
    const existingLoan = await this.prisma.bookOperation.findUnique({ where: { id } })

    await this.prisma.bookOperation.create({
      data: {
        bookId: existingLoan.bookId,
        quantity: existingLoan.quantity,
        observations: existingLoan.observations,
        personId: existingLoan.personId,
        personNames: existingLoan.personNames,
        personSurNames: existingLoan.personSurNames,
        type: 'DEVOLUCION',

      }
    })


    const loan = await this.prisma.bookOperation.update({
      where: { id }, data: {
        wasSettled: true,
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

      if (physicalBook.availableStock - loan.quantity == 0) {
        await tx.physicalBook.update({ where: { id: loan.bookId }, data: { status: 'AGOTADO' } })
      }

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
