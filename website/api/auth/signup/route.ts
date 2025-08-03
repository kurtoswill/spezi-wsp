import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '@/lib/database';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password } = body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters long' },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists with this email' },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user in database
        const user = await createUser({
            firstName,
            lastName,
            email,
            passwordHash,
        });

        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                emailVerified: user.emailVerified,
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}