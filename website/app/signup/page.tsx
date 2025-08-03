'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'
import {router} from "next/client";

export default function SignupPage() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const { signup } = useAuth()
    // const router = useRouter()

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
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
            await signup(firstName, lastName, email, password)
            setSuccess('Account created successfully! Please check your email to verify your account.')

            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push('/login?message=verify-email')
            }, 3000)
        } catch (err: any) {
            setError(err.message || 'An error occurred during signup')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        try {
            // Google OAuth integration would go here
            setError('Google signup will be available soon!')
        } catch (err: any) {
            setError(err.message || 'An error occurred with Google signup')
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#232C4F] mb-2">Spezi</h1>
                    <p className="text-gray-600">AI-Powered Speech Analysis</p>
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

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>

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

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                            placeholder="Create a password"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#232C4F] focus:ring-0 transition-all duration-300 bg-white"
                            placeholder="Confirm your password"
                            required
                            minLength={6}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#232C4F] text-white font-semibold py-6 px-6 rounded-xl hover:bg-[#1a2240] transition-colors"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                </div>

                <Button
                    onClick={handleGoogleSignup}
                    variant="outline"
                    className="w-full flex items-center justify-center px-4 py-6 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-gray-700"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </Button>

                <div className="text-center mt-8 space-y-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-[#6EB1D6] hover:text-[#232C4F] font-medium transition-colors">
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
