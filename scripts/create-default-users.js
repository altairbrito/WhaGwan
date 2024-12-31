const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://bznlknoqqkckkbxxudkq.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Make sure to use the service role key here

const supabase = createClient(supabaseUrl, supabaseKey)

async function createUser(email, password, role) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role }
  })

  if (error) {
    console.error(`Error creating ${role}:`, error.message)
  } else {
    console.log(`${role} created successfully:`, data.user.id)
  }
}

async function createDefaultUsers() {
  await createUser('admin@whatgwan.com', 'adminpassword123', 'admin')
  await createUser('manager@whatgwan.com', 'managerpassword123', 'manager')
  await createUser('user@whatgwan.com', 'userpassword123', 'user')
}

createDefaultUsers()

