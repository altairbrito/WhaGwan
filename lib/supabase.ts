import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bznlknoqqkckkbxxudkq.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6bmxrbm9xcWtja2tieHh1ZGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzU0MzcsImV4cCI6MjA1MTE1MTQzN30.qMEw6xzb7fPcmkYbTBkyD8wibbJSU_bP-YZDERXwKdI';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and ANON KEY must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Test Supabase connection
(async () => {
  try {
    const { data, error } = await supabase.from('events').select('count', { count: 'exact' });
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase connection successful, events count:', data);
    }
  } catch (error) {
    console.error('Failed to test Supabase connection:', error);
  }
})();

// Function to fetch and log session details
export const getSession = async () => {
  try {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error);
    } else {
      console.log('Current session:', session);
    }
    return session;
  } catch (error) {
    console.error('Failed to fetch session:', error);
    return null;
  }
};
