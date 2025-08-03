// app/waitlist/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase/supabase'

export default function WaitlistPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

    // Fetch waitlist count on mount
    useEffect(() => {
        const fetchCount = async () => {
            const { count, error } = await supabase
                .from('waitlist')
                .select('*', { count: 'exact', head: true })

            if (!error && count !== null) {
                setWaitlistCount(count)
            } else {
                console.error('Failed to fetch waitlist count:', error)
            }
        }

        fetchCount()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data, error } = await supabase
                .from('waitlist')
                .insert([{ email }])

            if (error) {
                if (error.code === '23505') {
                    toast.error('Email already on waitlist!')
                } else {
                    toast.error('Error joining waitlist. Please try again.')
                }
            } else {
                setSuccess(true)
                toast.success('Successfully joined the waitlist!')
                setEmail('')

                // Refresh waitlist count after joining
                const { count } = await supabase
                    .from('waitlist')
                    .select('*', { count: 'exact', head: true })

                if (count !== null) {
                    setWaitlistCount(count)
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
                <div className="max-w-md w-full mx-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-[#232C4F] hover:text-[#232C4F]/80 mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Home
                    </Link>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                <CheckCircle size={32} className="text-green-600" />
                            </div>

                            <h1 className="text-2xl font-bold text-[#232C4F] mb-4">
                                You&#39;re on the list!
                            </h1>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Thank you for joining our waitlist! We&#39;ll notify you as soon as Spezi is ready for launch.
                                Get ready to speak English professionally and confidently.
                            </p>

                            <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
                                <p className="text-sm text-gray-600 mb-2">What&#39;s next?</p>
                                <ul className="text-sm text-gray-700 space-y-1 text-left">
                                    <li>• You&#39;ll receive an email confirmation shortly</li>
                                    <li>• We&#39;ll keep you updated on our progress</li>
                                    <li>• You&#39;ll be among the first to access Spezi</li>
                                </ul>
                            </div>

                            <Button asChild className="w-full bg-[#232C4F] hover:bg-[#232C4F]/90">
                                <Link href="/">Explore Spezi</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#232C4F]/10 rounded-full mb-4">
                            <Users size={32} className="text-[#232C4F]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#232C4F] mb-2">
                            Join Our Waitlist
                        </h1>

                        {waitlistCount !== null && (
                            <p className="text-sm text-gray-600 mb-4">
                                {waitlistCount.toLocaleString()} people have already joined the waitlist.
                            </p>
                        )}

                        <p className="text-gray-600">
                            Be the first to know when Spezi launches and start speaking English professionally!
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-[#232C4F] mb-3">What you&#39;ll get:</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                Early access to Spezi before public launch
                            </li>
                            <li className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                Exclusive updates on new features
                            </li>
                            <li className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                Special launch discount (when available)
                            </li>
                            <li className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                Priority customer support
                            </li>
                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="waitlist-email" className="block text-sm font-medium text-[#232C4F] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="waitlist-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email address"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#232C4F] focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#232C4F] hover:bg-[#232C4F]/90 text-white py-6 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Joining Waitlist...
                                </div>
                            ) : (
                                'Join Waitlist'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            We respect your privacy. No spam, just updates about Spezi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}