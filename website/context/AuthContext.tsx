"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Improved helper function to safely parse JSON responses
const safeJsonParse = async (response: Response) => {
    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
        const text = await response.text();
        console.warn('Response is not JSON:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response');
    }

    try {
        return await response.json();
    } catch (parseError) {
        const text = await response.text();
        console.error('JSON parse error:', parseError);
        console.error('Raw response text:', text.substring(0, 500));
        throw new Error('Invalid JSON response from server');
    }
};

// API call wrapper with better error handling
const apiCall = async (url: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);
        const data = await safeJsonParse(response);

        if (!response.ok) {
            throw new Error(data.error || data.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Network error. Please check your connection.');
        }
        throw error;
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = useCallback(async () => {
        try {
            console.log('Checking authentication...');

            const response = await fetch("/api/auth/me", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await safeJsonParse(response);
                console.log('Auth check successful');
                setUser(data.user);
            } else if (response.status === 401 || response.status === 403) {
                console.log('User not authenticated');
                setUser(null);
            } else {
                console.error('Auth check failed with status:', response.status);
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            // On network errors, don't clear user state immediately
            // but still set loading to false
            if (error instanceof TypeError && error.message.includes('fetch')) {
                console.log('Network error during auth check, maintaining current state');
            } else {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async (email: string, password: string) => {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        try {
            console.log('Attempting login for:', email);

            const data = await apiCall("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            console.log('Login successful');
            setUser(data.user);

            // Use replace instead of push to prevent back navigation to login
            router.replace("/dashboard");
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (firstName: string, lastName: string, email: string, password: string) => {
        if (!firstName || !lastName || !email || !password) {
            throw new Error('All fields are required');
        }

        try {
            console.log('Attempting signup for:', email);

            await apiCall("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            console.log('Signup successful');
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Try to call logout endpoint, but don't block on errors
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: 'include'
            });
            console.log('Logout API call completed');
        } catch (error) {
            console.error('Logout API error (continuing anyway):', error);
        }

        // Always clear user state and redirect
        setUser(null);
        router.replace("/login");
    };

    const forgotPassword = async (email: string) => {
        if (!email) {
            throw new Error('Email is required');
        }

        try {
            await apiCall("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
            });
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    };

    const resetPassword = async (token: string, password: string) => {
        if (!token || !password) {
            throw new Error('Token and password are required');
        }

        try {
            await apiCall("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password }),
            });
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    };

    const verifyEmail = async (token: string) => {
        if (!token) {
            throw new Error('Verification token is required');
        }

        try {
            await apiCall("/api/auth/verify-email", {
                method: "POST",
                body: JSON.stringify({ token }),
            });

            // Refresh user data after email verification
            await checkAuth();
        } catch (error) {
            console.error('Email verification error:', error);
            throw error;
        }
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    const contextValue = {
        user,
        loading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}