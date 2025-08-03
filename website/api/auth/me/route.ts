import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        console.log('Auth me route called');

        // For now, return a simple response to test
        return NextResponse.json({
            user: null,
            message: 'Not authenticated'
        }, { status: 401 });

    } catch (error) {
        console.error('Auth me error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}