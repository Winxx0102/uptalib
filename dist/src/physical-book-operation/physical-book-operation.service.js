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
exports.PhysicalBookOperationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PhysicalBookOperationService = class PhysicalBookOperationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllLoans(query) {
        const QUERY = {};
        if (query.search) {
            QUERY.where = { OR: [{ book: { title: { contains: query.search } } }, { type: 'PRESTAMO' }] };
        }
        QUERY.take = parseInt(query.limit) || 10;
        return (await this.prisma.bookOperation.findMany({
            ...QUERY, include: {
                book: {
                    select: {
                        title: true
                    }
                }
            }
        }));
    }
    async settle(id) {
        const existingLoan = await this.prisma.bookOperation.findUnique({ where: { id } });
        console.log(existingLoan);
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
        });
        return { state: 'success', message: 'El libro ha sido devuelto' };
    }
    async loan(makeLoanDto) {
        return await this.prisma.$transaction(async (tx) => {
            const loan = await tx.bookOperation.create({ data: { ...makeLoanDto, type: 'PRESTAMO' } });
            const physicalBook = await tx.physicalBook.findUnique({ where: { id: loan.bookId } });
            if (physicalBook.availableStock - loan.quantity < 0) {
                throw new common_1.HttpException('La cantidad sobrepasa el stock disponible', common_1.HttpStatus.BAD_REQUEST);
            }
            await tx.physicalBook.update({ where: { id: loan.bookId }, data: { availableStock: { decrement: loan.quantity } } });
            return { state: 'success', message: 'Prestamo hecho', loan: loan };
        });
    }
    create(createPhysicalBookOperationDto) {
        return 'This action adds a new physicalBookOperation';
    }
    findAll() {
        return `This action returns all physicalBookOperation`;
    }
    findOne(id) {
        return `This action returns a #${id} physicalBookOperation`;
    }
    update(id, updatePhysicalBookOperationDto) {
        return `This action updates a #${id} physicalBookOperation`;
    }
    remove(id) {
        return `This action removes a #${id} physicalBookOperation`;
    }
};
exports.PhysicalBookOperationService = PhysicalBookOperationService;
exports.PhysicalBookOperationService = PhysicalBookOperationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhysicalBookOperationService);
//# sourceMappingURL=physical-book-operation.service.js.map