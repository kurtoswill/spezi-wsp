import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useSubscription() {
    const [user, setUser] = useState<any>(null)
    const [usageCount, setUsageCount] = useState(0)
    const [tier, setTier] = useState('free')
    const [canRecord, setCanRecord] = useState(true)
    const [loading, setLoading] = useState(true)

    const supabase = createClient()

    useEffect(() => {
        checkUserStatus()
    }, [])

    async function checkUserStatus() {
        try {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (userData) {
                    setUser(userData)
                    setUsageCount(userData.usage_count)
                    setTier(userData.subscription_tier)

                    // Free tier limited to 5 recordings
                    setCanRecord(userData.subscription_tier === 'premium' || userData.usage_count < 5)
                }
            }
        } catch (error) {
            console.error('Error checking user status:', error)
        } finally {
            setLoading(false)
        }
    }

    async function incrementUsage() {
        if (user) {
            const { error } = await supabase.rpc('increment_usage_count', {
                user_id: user.id
            })

            if (!error) {
                await checkUserStatus() // Refresh status
            }

            return !error
        }
        return false
    }

    const remainingUsage = Math.max(0, 5 - usageCount)
    const usagePercentage = tier === 'free' ? (usageCount / 5) * 100 : 0

    return {
        user,
        usageCount,
        tier,
        canRecord,
        loading,
        remainingUsage,
        usagePercentage,
        refreshStatus: checkUserStatus,
        incrementUsage
    }
}