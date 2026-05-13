// src/supabase/supabase.module.ts
import { Module, Global } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { ConfigService } from '@nestjs/config';

@Global() // Makes the service available everywhere without re-importing
@Module({
    providers: [SupabaseService, ConfigService],
    exports: [SupabaseService],
})
export class SupabaseModule { }
