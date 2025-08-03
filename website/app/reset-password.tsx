'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [token, setToken] = useState('')

    const { resetPassword } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const tokenFromUrl = router.query.token as string
        if (tokenFromUrl) {
            setToken(tokenFromUrl)
        }
    }, [router.query])

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            setLoading(false)
            return
        }

        try {
            await resetPassword(token, password)
            setSuccess('Password reset successfully! You can now sign in with your new password.')
            setTimeout(() => {
                router.push('/login?message=password-reset')
            }, 3000)
        } catch (err: any) {
            setError(err.message || 'An error occurred while resetting password')
        } finally {
            setLoading(false)
        }
    }

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-5">
                <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-gray-200 text-center">
                    <h1 className="text-4xl font-bold text-[#232C4F] mb-2">Spezi</h1>
                    <p className="text-gray-600">Invalid or missing token</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-gray-200">
                <h1 className="text-4xl font-bold text-[#232C4F] text-center mb-4">Spezi</h1>
                <p className="text-center text-gray-600 mb-6">Set your new password</p>

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

                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                            placeholder="Enter new password"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                            placeholder="Confirm new password"
                            required
                            minLength={6}
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
                                Resetting password...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </form>

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
