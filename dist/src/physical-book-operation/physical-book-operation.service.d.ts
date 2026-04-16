import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PhysicalBookOperationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllOperations(query: any): Promise<{
        id: string;
        bookId: string;
        type: import(".prisma/client").$Enums.OperationType;
        quantity: number;
        observations: string | null;
        personId: string | null;
        personNames: string;
        personSurNames: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    addDrops(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    addEntries(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    findAllLoans(query: any): Promise<{
        id: string;
        bookId: string;
        type: import(".prisma/client").$Enums.OperationType;
        quantity: number;
        observations: string | null;
        personId: string | null;
        personNames: string;
        personSurNames: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    settle(id: any): Promise<{
        state: string;
        message: string;
    }>;
    loan(makeLoanDto: any): Promise<{
        state: string;
        message: string;
        loan: {
            id: string;
            bookId: string;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
            personNames: string;
            personSurNames: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    create(createPhysicalBookOperationDto: CreatePhysicalBookOperationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePhysicalBookOperationDto: UpdatePhysicalBookOperationDto): string;
    remove(id: number): string;
}
