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
    async findAll(query) {
        const take = parseInt(query.limit) || 10;
        const page = parseInt(query.page) || 1;
        const skip = (page - 1) * take;
        const search = query.search;
        const where = {};
        query.pnf = query.pnf == 'undefined' || query.pnf == '' ? 'todos' : query.pnf;
        query.genre = query.genre == 'undefined' ? '' : query.genre;
        if (search) {
            where.AND = [
                {
                    title: { contains: search },
                },
            ];
        }
        if (query.genre) {
            if (where.AND) {
                where.AND.push({
                    category: {
                        name: { contains: query.genre || '' }
                    }
                });
            }
            else {
                where.AND = [
                    {
                        category: { name: query.genre || '' },
                    },
                ];
            }
        }
        if (query.pnf != 'todos') {
            if (where.AND) {
                where.AND.push({
                    pnf: query.pnf
                });
            }
            else if (!where.AND) {
                where.AND = [
                    { pnf: query.pnf }
                ];
            }
        }
        const totalPages = await this.prisma.physicalBook.count({ where });
        const data = await this.prisma.physicalBook.findMany({
            where, take, skip, include: {
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
        return { data, totalPages };
    }
    findOne(id) {
        return `This action returns a #${id} physicalBook`;
    }
    async update(id, updatePhysicalBookDto) {
        return await this.prisma.$transaction(async (tx) => {
            const currentBook = await tx.physicalBook.findUnique({
                where: { id }
            });
            if (!currentBook) {
                throw new Error('Libro físico no encontrado');
            }
            const currentDifference = currentBook.totalStock - currentBook.availableStock;
            const newAvailableStock = updatePhysicalBookDto.totalStock - currentDifference;
            if (newAvailableStock < 0) {
                throw new common_1.HttpException('Cantidad incorrecta, resuelve los prestamos del libro primero', common_1.HttpStatus.BAD_REQUEST);
            }
            const physicalBook = await tx.physicalBook.update({
                where: { id },
                data: {
                    ...updatePhysicalBookDto,
                    availableStock: newAvailableStock
                }
            });
            return {
                status: 'success',
                message: 'Libro físico actualizado exitosamente',
                data: {
                    ...physicalBook,
                    difference: currentDifference
                }
            };
        });
    }
    async remove(id) {
        await this.prisma.bookOperation.deleteMany({
            where: {
                bookId: id
            }
        });
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