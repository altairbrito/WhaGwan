"use client"

import { useEffect, useState } from "react"
import { VenueList } from "@/components/venue-list"
import { AttendeeManagement } from "@/components/attendee-management"
import { RevenueChart } from "@/components/revenue-chart"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error

      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Link href="/admin/create-event" passHref>
          <Button>Create New Event</Button>
        </Link>
      </div>
      <RevenueChart events={events} />
      <VenueList events={events} />
      <AttendeeManagement events={events} />
    </div>
  )
}

