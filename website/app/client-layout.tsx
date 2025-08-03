'use client'

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import {AuthProvider} from "@/context/AuthContext";

export function ClientLayout({
                                 children,
                             }: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <Toaster position="top-center" />
            <Navbar />
            <main className="flex-1 w-full">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
                    {children}
                </div>
            </main>
            <Footer />
        </AuthProvider>
    );
}