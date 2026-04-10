"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhysicalBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_physical_book_dto_1 = require("./create-physical-book.dto");
class UpdatePhysicalBookDto extends (0, swagger_1.PartialType)(create_physical_book_dto_1.CreatePhysicalBookDto) {
}
exports.UpdatePhysicalBookDto = UpdatePhysicalBookDto;
//# sourceMappingURL=update-physical-book.dto.js.map