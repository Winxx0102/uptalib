import { PhysicalBookOperationService } from './physical-book-operation.service';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { MakeLoanDto } from './dto/makeLoan.dto';
export declare class PhysicalBookOperationController {
    private readonly physicalBookOperationService;
    constructor(physicalBookOperationService: PhysicalBookOperationService);
    loan(makeLoanDto: MakeLoanDto): Promise<{
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
    settle(id: any): Promise<{
        state: string;
        message: string;
    }>;
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
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePhysicalBookOperationDto: UpdatePhysicalBookOperationDto): string;
    remove(id: string): string;
}
