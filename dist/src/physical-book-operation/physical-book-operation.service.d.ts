import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PhysicalBookOperationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllLoans(query: any): Promise<{
        id: string;
        bookId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.OperationType;
        quantity: number;
        observations: string | null;
        personId: string | null;
        personNames: string;
        personSurNames: string;
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
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
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
