// lib/supabase/database.types.ts
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string | null
                    subscription_tier: string
                    usage_count: number
                    created_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    subscription_tier?: string
                    usage_count?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    subscription_tier?: string
                    usage_count?: number
                    created_at?: string
                }
                Relationships: []
            }
            recordings: {
                Row: {
                    id: string
                    user_id: string
                    transcript: string | null
                    pace_score: number | null
                    tone_score: number | null
                    filler_count: number | null
                    grammar_issues: Json
                    duration: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    transcript?: string | null
                    pace_score?: number | null
                    tone_score?: number | null
                    filler_count?: number | null
                    grammar_issues?: Json
                    duration?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    transcript?: string | null
                    pace_score?: number | null
                    tone_score?: number | null
                    filler_count?: number | null
                    grammar_issues?: Json
                    duration?: number | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "recordings_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_settings: {
                Row: {
                    id: string
                    user_id: string
                    track_pace: boolean
                    track_tone: boolean
                    track_fillers: boolean
                    track_grammar: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    track_pace?: boolean
                    track_tone?: boolean
                    track_fillers?: boolean
                    track_grammar?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    track_pace?: boolean
                    track_tone?: boolean
                    track_fillers?: boolean
                    track_grammar?: boolean
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_settings_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            increment_usage_count: {
                Args: {
                    user_id: string
                }
                Returns: undefined
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}