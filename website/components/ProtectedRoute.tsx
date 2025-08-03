import { useAuth } from '@/lib/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
    requireEmailVerification?: boolean
}

export default function ProtectedRoute({
                                           children,
                                           requireEmailVerification = true
                                       }: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login')
                return
            }

            if (requireEmailVerification && !user.emailVerified) {
                router.push('/login?message=verify-email')
                return
            }
        }
    }, [user, loading, router, requireEmailVerification])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200 text-center">
                    <h1 className="text-4xl font-bold text-[#232C4F] mb-4">Spezi</h1>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#232C4F] mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user || (requireEmailVerification && !user.emailVerified)) {
        return null
    }

    return <>{children}</>
}
