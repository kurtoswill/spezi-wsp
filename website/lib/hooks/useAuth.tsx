"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/me");
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        setUser(data.user);
        router.push("/dashboard");
    };

    const signup = async (firstName: string, lastName: string, email: string, password: string) => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
    };

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.push("/login");
    };

    const forgotPassword = async (email: string) => {
        const response = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
    };

    const resetPassword = async (token: string, password: string) => {
        const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
    };

    const verifyEmail = async (token: string) => {
        const response = await fetch("/api/auth/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                forgotPassword,
                resetPassword,
                verifyEmail,
                refreshUser,
            }}
        >
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
