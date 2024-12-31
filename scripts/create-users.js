const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://bznlknoqqkckkbxxudkq.supabase.co'
const supabaseServiceRoleKey = 'YOUR_SUPABASE_SERVICE_ROLE_KEY' // Replace with your actual service role key

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

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

async function createUsers() {
  await createUser('admin@whatgwan.com', 'adminpassword123', 'admin')
  await createUser('manager@whatgwan.com', 'managerpassword123', 'manager')
  await createUser('user@whatgwan.com', 'userpassword123', 'user')
}

createUsers()

