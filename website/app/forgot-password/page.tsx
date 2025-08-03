'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [emailSent, setEmailSent] = useState<boolean>(false)

    const { forgotPassword } = useAuth()

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            await forgotPassword(email)
            setSuccess('If an account with that email exists, we\'ve sent a password reset link.')
            setEmailSent(true)
        } catch (err: any) {
            setError(err.message || 'An error occurred while sending reset email')
        } finally {
            setLoading(false)
        }
    }

    const handleResendEmail = async () => {
        setLoading(true)
        setError('')
        try {
            await forgotPassword(email)
            setSuccess('Reset email sent again! Please check your inbox.')
        } catch (err: any) {
            setError('Failed to resend email. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#232C4F] mb-2">Spezi</h1>
                    <p className="text-gray-600">
                        {emailSent ? 'Check your email' : 'Reset your password'}
                    </p>
                </div>

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

                {!emailSent ? (
                    <>
                        <div className="text-center mb-6">
                            <p className="text-gray-600 text-sm">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#232C4F] text-white font-semibold py-6 px-6 rounded-xl hover:bg-[#1a2240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Sending reset email...
                                    </>
                                ) : (
                                    'Send Reset Email'
                                )}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email sent!</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            <p className="text-gray-500 text-xs">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleResendEmail}
                                disabled={loading}
                                variant="outline"
                                className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                                        Resending...
                                    </>
                                ) : (
                                    'Resend Email'
                                )}
                            </Button>

                            <Button
                                onClick={() => {
                                    setEmailSent(false)
                                    setEmail('')
                                    setSuccess('')
                                    setError('')
                                }}
                                variant="ghost"
                                className="w-full text-[#232C4F] hover:text-[#1a2240] hover:bg-blue-50 transition-colors"
                            >
                                Try a different email
                            </Button>
                        </div>
                    </div>
                )}

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <a href="/login" className="text-[#6EB1D6] hover:text-[#232C4F] font-medium transition-colors">
                            Back to login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}