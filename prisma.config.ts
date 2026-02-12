import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Esto carga el archivo .env manualmente
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});