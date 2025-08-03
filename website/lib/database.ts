import { supabase } from './supabase/supabase';

export interface DatabaseUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    passwordHash: string;
    usageCount: number;
    created_at: string;
    updated_at: string;
}

export async function getUserFromDatabase(userId: string): Promise<DatabaseUser | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // No rows returned
                return null;
            }
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function findUserByEmail(email: string): Promise<DatabaseUser | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email.toLowerCase())
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // No rows returned
                return null;
            }
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
}

interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

export async function createUser(userData: CreateUserData): Promise<DatabaseUser> {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{
                email: userData.email.toLowerCase(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                passwordHash: userData.passwordHash,
                emailVerified: false,
                usageCount: 0
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}
