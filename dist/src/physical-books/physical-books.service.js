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
exports.PhysicalBooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PhysicalBooksService = class PhysicalBooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPhysicalBookDto) {
        return this.prisma.$transaction(async (tx) => {
            const physicalBook = await tx.physicalBook.create({
                data: { ...createPhysicalBookDto, availableStock: createPhysicalBookDto.totalStock }
            });
            return {
                status: 'success',
                message: 'Libro físico creados exitosamente',
                data: { ...physicalBook }
            };
        });
    }
    findAll(query) {
        const take = parseInt(query.limit) || 10;
        const search = query.search;
        const where = {};
        if (search) {
            where.OR = [
                {
                    title: { contains: search },
                },
            ];
        }
        return this.prisma.physicalBook.findMany({
            where, take, include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
        });
    }
    findOne(id) {
        return `This action returns a #${id} physicalBook`;
    }
    async update(id, updatePhysicalBookDto) {
        return await this.prisma.$transaction(async (tx) => {
            const physicalBook = await tx.physicalBook.update({
                where: { id: id },
                data: updatePhysicalBookDto
            });
            return {
                status: 'success',
                message: 'Libro físico actualizado exitosamente',
                data: { ...physicalBook }
            };
        });
    }
    async remove(id) {
        const removedBook = await this.prisma.physicalBook.delete({
            where: { id }
        });
        return { status: 'success', message: 'Libro fisico eliminado' };
    }
};
exports.PhysicalBooksService = PhysicalBooksService;
exports.PhysicalBooksService = PhysicalBooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhysicalBooksService);
//# sourceMappingURL=physical-books.service.js.map