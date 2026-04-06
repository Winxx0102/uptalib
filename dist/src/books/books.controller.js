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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path_1 = require("path");
const storage_1 = require("./utils/storage");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    findAll(query) {
        return this.bookService.findAll(query);
    }
    findOne(id) {
        return this.bookService.findOne(id);
    }
    create(data, file) {
        const filePath = `/public/uploads/pdf/${file.filename}`;
        return this.bookService.create({ ...data, routepdf: filePath });
    }
    async delete(id) {
        const book = await this.bookService.findOne(id);
        if (!book) {
            throw new common_1.NotFoundException('El libro no existe');
        }
        const filePaths = [book.routepdf, book.routeimg];
        filePaths.forEach((path) => {
            if (path) {
                const fullPath = (0, path_1.join)(process.cwd(), path);
                if ((0, fs_1.existsSync)(fullPath)) {
                    (0, fs_1.unlinkSync)(fullPath);
                }
            }
        });
        return this.bookService.delete(id);
    }
    async edit(id, data, pdfFile) {
        const existingBook = await this.bookService.findOne(id);
        if (!existingBook) {
            throw new common_1.NotFoundException('El libro no existe');
        }
        let updateData = data;
        if (pdfFile) {
            const filePaths = [existingBook.routepdf];
            filePaths.forEach((path) => {
                if (path) {
                    const fullPath = (0, path_1.join)(process.cwd(), path);
                    if ((0, fs_1.existsSync)(fullPath)) {
                        (0, fs_1.unlinkSync)(fullPath);
                    }
                }
            });
            updateData = { ...data, routepdf: `/public/uploads/pdf/${pdfFile.filename}` };
        }
        return this.bookService.edit(id, updateData);
    }
    save(req, bookId) {
        return this.bookService.saveToUser(req.user.userId, bookId);
    }
    getMyLibrary(req) {
        return this.bookService.getSavedBook(req.user.userId);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPERADMIN, client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('pdf', storage_1.storageFor1File)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPERADMIN, client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPERADMIN, client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('pdf', storage_1.storageFor1File)),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)('save/:bookId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('bookId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "save", null);
__decorate([
    (0, common_1.Get)('my-library'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getMyLibrary", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [books_service_1.BookService])
], BookController);
//# sourceMappingURL=books.controller.js.map