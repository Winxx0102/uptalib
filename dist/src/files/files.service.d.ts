import { SupabaseService } from '@/supabase/supabase.service';
export declare class FilesService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        path: string;
        fullPath: string;
    }>;
}
