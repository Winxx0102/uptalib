import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Creamos una piscina de conexiones de Postgres
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    // Creamos el adaptador
    const adapter = new PrismaPg(pool);
    
    // Se lo pasamos al constructor de Prisma
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}