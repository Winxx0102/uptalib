import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ scope: Scope.DEFAULT })
export class SupabaseService {
    private clientInstance: SupabaseClient;

    constructor(private configService: ConfigService) {
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseKey = this.configService.get('SUPABASE_KEY');

        this.clientInstance = createClient(supabaseUrl, supabaseKey);
    }

    getClient() {
        return this.clientInstance;
    }
}