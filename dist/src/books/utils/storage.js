"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageFor1File = void 0;
const multer_1 = require("multer");
const node_crypto_1 = require("node:crypto");
const node_path_1 = require("node:path");
exports.storageFor1File = {
    limits: {
        files: 1,
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, './public/uploads/img');
            }
            else if (file.mimetype.includes('pdf')) {
                cb(null, './public/uploads/pdf');
            }
            else {
                cb(new Error('Tipo no permitido'), null);
            }
        },
        filename: (req, file, cb) => {
            const name = (req.body.title || req.body.name) || 'sin-nombre';
            const uniqueSuffix = (0, node_crypto_1.randomUUID)();
            cb(null, `${name}-${uniqueSuffix}${(0, node_path_1.extname)(file.originalname)}`);
        },
    }),
};
//# sourceMappingURL=storage.js.map