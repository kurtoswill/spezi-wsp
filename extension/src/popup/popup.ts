import { supabase } from '../lib/supabase.ts'

async function getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
        console.error('Error getting user:', error)
    } else {
        console.log('User:', user)
    }
}

getUser()
