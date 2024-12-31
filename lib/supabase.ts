import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bznlknoqqkckkbxxudkq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6bmxrbm9xcWtja2tieHh1ZGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzU0MzcsImV4cCI6MjA1MTE1MTQzN30.qMEw6xzb7fPcmkYbTBkyD8wibbJSU_bP-YZDERXwKdI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Test Supabase connection
supabase.from('events').select('count', { count: 'exact' })
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection error:', error)
    } else {
      console.log('Supabase connection successful, events count:', data)
    }
  })
  .catch((error) => {
    console.error('Failed to test Supabase connection:', error)
  })

