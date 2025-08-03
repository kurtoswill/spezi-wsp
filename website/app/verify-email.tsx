'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'

export default function VerifyEmailPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const { verifyEmail } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const tokenFromUrl = router.query.token as string
        if (tokenFromUrl) {
            setToken(tokenFromUrl)
            handleVerification(tokenFromUrl)
        }
    }, [router.query])

    const handleVerification = async (verificationToken: string) => {
        try {
            await verifyEmail(verificationToken)
            setSuccess('Email verified successfully! You can now sign in to your account.')
            setLoading(false)

            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push('/login')
            }, 3000)
        } catch (err: any) {
            setError(err.message || 'Email verification failed')
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-5">
                <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-gray-200 text-center">
                    <h1 className="text-4xl font-bold text-[#232C4F] mb-2">Spezi</h1>
                    <p className="text-gray-600 mb-6">Verifying your email...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#232C4F] mx-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-gray-200 text-center">
                <h1 className="text-4xl font-bold text-[#232C4F] mb-2">Spezi</h1>
                <p className="text-gray-600 mb-6">Email Verification</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                            The verification link may have expired or is invalid.
                        </p>
                        <Button
                            onClick={() => router.push('/login')}
                            className="w-full bg-[#232C4F] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1a2240] transition-colors"
                        >
                            Go to Login
                        </Button>
                    </div>
                )}

                {success && (
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Redirecting you to the login page...
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
