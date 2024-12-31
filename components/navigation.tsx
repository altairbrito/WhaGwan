"use client"

import Link from 'next/link'
import { useAuth } from './auth-provider'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function Navigation() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) {
    return null
  }

  return (
    <header className="container mx-auto py-4 flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          {user.user_metadata.role === 'manager' && (
            <li><Link href="/attendees" className="hover:underline">Attendees</Link></li>
          )}
          {user.user_metadata.role === 'admin' && (
            <>
              <li><Link href="/attendees" className="hover:underline">Attendees</Link></li>
              <li><Link href="/admin" className="hover:underline">Admin</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">WhatGwan</h1>
        <ModeToggle />
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  )
}

