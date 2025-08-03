import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./client-layout";
import { AuthProvider } from "@/lib/hooks/useAuth";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Spezi",
    description: "Speak English Professionally and Confidently",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
        <body className="font-sans antialiased text-[#232C4F] min-h-screen flex flex-col">
        {/* ✅ Wrap the layout in AuthProvider */}
        <AuthProvider>
            <ClientLayout>
                {children}
            </ClientLayout>
        </AuthProvider>
        </body>
        </html>
    );
}