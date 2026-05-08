"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryOperationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InventoryOperationService = class InventoryOperationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createInventoryOperationDto) {
        return 'This action adds a new inventoryOperation';
    }
    async addDrops(entriesDto) {
        const book = await this.prisma.item.update({
            where: { id: entriesDto.itemId }, data: {
                availableStock: {
                    decrement: parseInt(entriesDto.quantity)
                },
                totalStock: {
                    decrement: parseInt(entriesDto.quantity)
                }
            }
        });
        await this.prisma.itemOperation.create({
            data: {
                itemId: entriesDto.itemId,
                quantity: parseInt(entriesDto.quantity),
                type: 'BAJA',
                personNames: entriesDto.personNames,
                personSurNames: entriesDto.personSurNames
            }
        });
        return { status: 'success', message: 'Bajas añadidas' };
    }
    async addEntries(entriesDto) {
        const book = await this.prisma.item.update({
            where: { id: entriesDto.itemId }, data: {
                availableStock: {
                    increment: parseInt(entriesDto.quantity)
                },
                totalStock: {
                    increment: parseInt(entriesDto.quantity)
                }
            }
        });
        await this.prisma.itemOperation.create({
            data: {
                itemId: entriesDto.itemId,
                quantity: parseInt(entriesDto.quantity),
                type: 'ENTRADA',
                personNames: entriesDto.personNames,
                personSurNames: entriesDto.personSurNames
            }
        });
        return { status: 'success', message: 'Entradas añadidas' };
    }
    async loan(itemLoan) {
        const loan = await this.prisma.itemOperation.create({
            data: {
                type: 'PRESTAMO',
                quantity: parseInt(itemLoan.quantity),
                itemId: itemLoan.itemId,
                personId: itemLoan.personId,
                personNames: itemLoan.personNames,
                personSurNames: itemLoan.personSurNames,
            }
        });
        await this.prisma.item.update({
            where: { id: itemLoan.itemId }, data: {
                availableStock: { decrement: parseInt(itemLoan.quantity) }
            }
        });
        return { status: 'success', message: 'Prestamo Registrado' };
    }
    async settle(id) {
        const existingLoan = await this.prisma.itemOperation.findUnique({ where: { id } });
        const loan = await this.prisma.itemOperation.create({
            data: {
                type: 'DEVOLUCION',
                quantity: existingLoan.quantity,
                itemId: existingLoan.itemId,
                personId: existingLoan.personId,
                personNames: existingLoan.personNames,
                personSurNames: existingLoan.personSurNames,
            }
        });
        await this.prisma.itemOperation.update({
            where: { id }, data: {
                wasSettled: true
            }
        });
        await this.prisma.item.update({
            where: { id: loan.itemId }, data: {
                availableStock: { increment: existingLoan.quantity }
            }
        });
        return { status: 'success', message: 'Item Devuelto' };
    }
    async findAllLoans(query) {
        const where = {};
        const limit = parseInt(query.limit) || 10;
        const page = parseInt(query.page) || 1;
        const skip = (page - 1) * limit;
        if (query.search) {
            where.OR = [
                { item: { name: { contains: query.search } } }
            ];
        }
        const data = await this.prisma.itemOperation.findMany({
            where: { ...where, type: 'PRESTAMO', wasSettled: false }, include: { item: true }, skip, take: limit
        });
        const totalPages = Math.ceil(await this.prisma.itemOperation.count({ where: { ...where, type: 'PRESTAMO', wasSettled: false }, orderBy: { createdAt: 'desc' } }) / limit);
        return { data, totalPages };
    }
    async findAll(query) {
        const where = {};
        const page = parseInt(query.page) || 1;
        const take = parseInt(query.limit) || 10;
        const skip = (page - 1) * take;
        if (query.search) {
            where.AND = [
                { item: { name: { contains: query.search } } }
            ];
        }
        const totalPages = await this.prisma.itemOperation.count({
            where
        });
        const data = await this.prisma.itemOperation.findMany({
            where, take, skip, orderBy: { createdAt: 'desc' }, include: {
                item: true
            }
        });
        return { data, totalPages };
    }
    findOne(id) {
        return `This action returns a #${id} inventoryOperation`;
    }
    update(id, updateInventoryOperationDto) {
        return `This action updates a #${id} inventoryOperation`;
    }
    remove(id) {
        return `This action removes a #${id} inventoryOperation`;
    }
};
exports.InventoryOperationService = InventoryOperationService;
exports.InventoryOperationService = InventoryOperationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryOperationService);
//# sourceMappingURL=inventory-operation.service.js.map