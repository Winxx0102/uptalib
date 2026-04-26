import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PhysicalBookOperationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllOperations(query: any): Promise<{
        totalPages: number;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bookId: string;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
            wasSettled: boolean | null;
            personNames: string;
            personSurNames: string;
        }[];
    }>;
    addDrops(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    addEntries(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    findAllLoans(query: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bookId: string;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
            wasSettled: boolean | null;
            personNames: string;
            personSurNames: string;
        }[];
        totalPages: number;
    }>;
    settle(id: any): Promise<{
        state: string;
        message: string;
    }>;
    loan(makeLoanDto: any): Promise<{
        state: string;
        message: string;
        loan: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bookId: string;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
            wasSettled: boolean | null;
            personNames: string;
            personSurNames: string;
        };
    }>;
    create(createPhysicalBookOperationDto: CreatePhysicalBookOperationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePhysicalBookOperationDto: UpdatePhysicalBookOperationDto): string;
    remove(id: number): string;
}
