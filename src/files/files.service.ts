import { SupabaseService } from '@/supabase/supabase.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    constructor(private readonly supabase: SupabaseService) { }

    async uploadFile(file: Express.Multer.File) {
        const { data, error } = await this.supabase
            .getClient()
            .storage
            .from('your-bucket-name')
            .upload(`folder/${file.originalname}`, file.buffer);

        if (error) throw error;
        return data;
    }
}
