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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BookService = class BookService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(id) {
        const book = await this.prisma.book.findUnique({ where: { id } });
        return book;
    }
    async findAll(query) {
        const take = parseInt(query.limit) || 10;
        const search = query.search;
        const where = {};
        if (search) {
            where.OR = [
                {
                    title: { contains: search },
                },
                {
                    description: { contains: search }
                }
            ];
        }
        return this.prisma.book.findMany({
            take,
            where,
        });
    }
    async create(data) {
        const book = await this.prisma.book.create({ data });
        return { message: 'Libro Creado' };
    }
    async delete(id) {
        return { book: await this.prisma.book.delete({ where: { id } }), message: 'Libro Eliminado' };
    }
    async edit(id, data) {
        return { book: await this.prisma.book.update({ where: { id }, data: data }), message: 'Libro editado' };
    }
    async saveToUser(userId, bookId) {
        const book = await this.prisma.book.findUnique({ where: { id: bookId } });
        if (!book)
            throw new common_1.NotFoundException('El libro no existe');
        try {
            return await this.prisma.savedBook.create({
                data: {
                    userId,
                    bookId,
                },
            });
        }
        catch (error) {
            throw new common_1.ConflictException('Ya tienes este libro guardado');
        }
    }
    async getSavedBook(userId) {
        const userLibrary = await this.prisma.savedBook.findMany({
            where: { userId },
            include: {
                book: true,
            },
        });
        return userLibrary.map((item) => item.book);
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookService);
//# sourceMappingURL=books.service.js.map