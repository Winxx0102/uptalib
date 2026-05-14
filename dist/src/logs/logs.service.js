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
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const getPagination_1 = require("../functions/pagination/getPagination");
const prisma_service_1 = require("../../prisma/prisma.service");
let LogsService = class LogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createLogDto) {
        return 'This action adds a new log';
    }
    async findAll(query) {
        const search = query.search;
        const where = {};
        const { take, page, skip } = (0, getPagination_1.getPagination)(query);
        if (search) {
            where.OR = [{ action: { contains: search } }];
        }
        const data = await this.prisma.operation.findMany({ where, take, skip, orderBy: { createdAt: 'desc' }, include: { user: true } });
        const totalPages = await this.prisma.operation.count({ where });
        return { data, totalPages };
    }
    findOne(id) {
        return `This action returns a #${id} log`;
    }
    update(id, updateLogDto) {
        return `This action updates a #${id} log`;
    }
    remove(id) {
        return `This action removes a #${id} log`;
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogsService);
//# sourceMappingURL=logs.service.js.map