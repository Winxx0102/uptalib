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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthorService = class AuthorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAuthorDto) {
        const author = await this.prisma.author.create({
            data: {
                name: createAuthorDto.name
            }
        });
        if (!author)
            return new common_1.HttpException('error al crear autor', common_1.HttpStatus.BAD_REQUEST);
        return { status: 'success', data: author };
    }
    findAll() {
        return `This action returns all author`;
    }
    findOne(id) {
        return `This action returns a #${id} author`;
    }
    async update(id, updateAuthorDto) {
        const author = await this.prisma.author.update({
            where: { id: id.toString() }, data: {
                name: updateAuthorDto.name
            }
        });
        return { status: 'success', message: `Se ha actualizado a${updateAuthorDto.name}`, data: author };
    }
    async remove(id) {
        const author = await this.prisma.author.delete({
            where: { id: id.toString() }
        });
        return { status: 'success', message: `Se ha eliminado al autor`, data: author };
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthorService);
//# sourceMappingURL=author.service.js.map