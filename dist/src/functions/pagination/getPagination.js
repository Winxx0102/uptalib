"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = getPagination;
function getPagination(query) {
    const take = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * take;
    return { take, page, skip };
}
//# sourceMappingURL=getPagination.js.map