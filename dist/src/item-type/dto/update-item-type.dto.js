"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateItemTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_item_type_dto_1 = require("./create-item-type.dto");
class UpdateItemTypeDto extends (0, swagger_1.PartialType)(create_item_type_dto_1.CreateItemTypeDto) {
}
exports.UpdateItemTypeDto = UpdateItemTypeDto;
//# sourceMappingURL=update-item-type.dto.js.map