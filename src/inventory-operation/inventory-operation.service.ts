import { Injectable } from '@nestjs/common';
import { CreateInventoryOperationDto } from './dto/create-inventory-operation.dto';
import { UpdateInventoryOperationDto } from './dto/update-inventory-operation.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InventoryOperationService {
  constructor(private prisma: PrismaService) { }
  create(createInventoryOperationDto: CreateInventoryOperationDto) {
    return 'This action adds a new inventoryOperation';
  }

  async addDrops(entriesDto: any) {
    const book = await this.prisma.item.update({
      where: { id: entriesDto.itemId }, data: {
        availableStock: {
          decrement: parseInt(entriesDto.quantity)
        },
        totalStock: {
          decrement: parseInt(entriesDto.quantity)
        }
      }
    })

    await this.prisma.itemOperation.create({
      data: {
        itemId: entriesDto.itemId,
        quantity: parseInt(entriesDto.quantity),
        type: 'BAJA',
        personNames: entriesDto.personNames,
        personSurNames: entriesDto.personSurNames

      }
    })

    return { status: 'success', message: 'Bajas añadidas' }
  }

  async addEntries(entriesDto: any) {


    const book = await this.prisma.item.update({
      where: { id: entriesDto.itemId }, data: {
        availableStock: {
          increment: parseInt(entriesDto.quantity)
        },
        totalStock: {
          increment: parseInt(entriesDto.quantity)
        }
      }
    })

    await this.prisma.itemOperation.create({
      data: {
        itemId: entriesDto.itemId,
        quantity: parseInt(entriesDto.quantity),
        type: 'ENTRADA',
        personNames: entriesDto.personNames,
        personSurNames: entriesDto.personSurNames

      }
    })

    return { status: 'success', message: 'Entradas añadidas' }
  }


  async loan(itemLoan: any) {
    const loan = await this.prisma.itemOperation.create({
      data: {
        type: 'PRESTAMO',
        quantity: parseInt(itemLoan.quantity),
        itemId: itemLoan.itemId,
        personId: itemLoan.personId,
        personNames: itemLoan.personNames,
        personSurNames: itemLoan.personSurNames,
      }
    })


    await this.prisma.item.update({
      where: { id: itemLoan.itemId }, data: {
        availableStock: { decrement: parseInt(itemLoan.quantity) }
      }
    })

    return { status: 'success', message: 'Prestamo Registrado' }
  }

  async settle(id: string) {

    const existingLoan = await this.prisma.itemOperation.findUnique({ where: { id } })

    const loan = await this.prisma.itemOperation.create({
      data: {
        type: 'DEVOLUCION',
        quantity: existingLoan.quantity,
        itemId: existingLoan.itemId,
        personId: existingLoan.personId,
        personNames: existingLoan.personNames,
        personSurNames: existingLoan.personSurNames,
      }
    })

    await this.prisma.itemOperation.update({
      where: { id }, data: {
        wasSettled: true
      }
    })


    await this.prisma.item.update({
      where: { id: loan.itemId }, data: {
        availableStock: { increment: existingLoan.quantity }
      }
    })

    return { status: 'success', message: 'Item Devuelto' }
  }

  async findAllLoans(query: any) {
    const where: any = {}
    //pagination
    const limit = parseInt(query.limit) || 10
    const page = parseInt(query.page) || 1
    const skip = (page - 1) * limit

    if (query.search) {
      where.OR = [
        { item: { name: { contains: query.search } } }
      ]
    }

    const data = await this.prisma.itemOperation.findMany({
      where: { ...where, type: 'PRESTAMO', wasSettled: false }, include: { item: true }, skip, take: limit
    })
    const totalPages = Math.ceil(await this.prisma.itemOperation.count({ where: { ...where, type: 'PRESTAMO', wasSettled: false }, orderBy: { createdAt: 'desc' } }) / limit)
    return { data, totalPages }
  }

  async findAll(query: any) {
    const where: any = {}

    //pagination stuff
    const page = parseInt(query.page) || 1
    const take = parseInt(query.limit) || 10
    const skip = (page - 1) * take



    if (query.search) {
      where.AND = [
        { item: { name: { contains: query.search } } }
      ]
    }
    const totalPages = await this.prisma.itemOperation.count({
      where
    })
    const data = await this.prisma.itemOperation.findMany({
      where, take, skip, orderBy: { createdAt: 'desc' }, include: {
        item: true
      }
    })


    return { data, totalPages }
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryOperation`;
  }

  update(id: number, updateInventoryOperationDto: UpdateInventoryOperationDto) {
    return `This action updates a #${id} inventoryOperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryOperation`;
  }
}
