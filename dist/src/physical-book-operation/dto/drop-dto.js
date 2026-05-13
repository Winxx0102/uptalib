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
exports.DropDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const entrie_dto_1 = require("./entrie-dto");
const class_validator_1 = require("class-validator");
class DropDto extends (0, swagger_1.PartialType)(entrie_dto_1.EntrieDto) {
}
exports.DropDto = DropDto;
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'Debes incluir un libro para dar bajas' }),
    __metadata("design:type", String)
], DropDto.prototype, "bookId", void 0);
//# sourceMappingURL=drop-dto.js.map