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
exports.UserInventoryController = void 0;
const common_1 = require("@nestjs/common");
const user_inventory_service_1 = require("./user-inventory.service");
const create_user_inventory_dto_1 = require("./dto/create-user-inventory.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_dto_1 = require("../user/dto/user.dto");
let UserInventoryController = class UserInventoryController {
    constructor(userInventoryService) {
        this.userInventoryService = userInventoryService;
    }
    create(createUserInventoryDto) {
        return this.userInventoryService.create(createUserInventoryDto);
    }
    findAll() {
        return this.userInventoryService.findAll();
    }
    remove(id) {
        return this.userInventoryService.remove(+id);
    }
};
exports.UserInventoryController = UserInventoryController;
__decorate([
    (0, roles_decorator_1.Roles)(user_dto_1.Role.SUPERADMIN, user_dto_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_inventory_dto_1.CreateUserInventoryDto]),
    __metadata("design:returntype", void 0)
], UserInventoryController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_dto_1.Role.SUPERADMIN, user_dto_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserInventoryController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_dto_1.Role.SUPERADMIN, user_dto_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserInventoryController.prototype, "remove", null);
exports.UserInventoryController = UserInventoryController = __decorate([
    (0, common_1.Controller)("user-inventory"),
    __metadata("design:paramtypes", [user_inventory_service_1.UserInventoryService])
], UserInventoryController);
//# sourceMappingURL=user-inventory.controller.js.map