import { diskStorage } from "multer";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

export const storageFor1File = {
    limits: {
        files: 1,
    },

    storage: diskStorage({
        destination: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, './public/uploads/img');
            } else if (file.mimetype.includes('pdf')) {
                cb(null, './public/uploads/pdf');
            } else {
                cb(new Error('Tipo no permitido'), null);
            }
        },
        filename: (req, file, cb) => {
            const name = (req.body.title || req.body.name) || 'sin-nombre';
            const uniqueSuffix = randomUUID(); // UUID v4

            cb(null, `${name}-${uniqueSuffix}${extname(file.originalname)}`);
        },
    }),
}

// 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 git key