"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type Event = {
  id: number
  title: string
  description: string
  date: string
  location: string
  price: number
  image: string
}

export function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error

      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setError('Failed to fetch events. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const groupEventsByMonth = (events: Event[]) => {
    return events.reduce((acc, event) => {
      const monthYear = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' })
      if (!acc[monthYear]) {
        acc[monthYear] = []
      }
      acc[monthYear].push(event)
      return acc
    }, {} as Record<string, Event[]>)
  }

  const groupedEvents = groupEventsByMonth(events)

  if (loading) return <div className="text-center py-8">Loading events...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>
  if (events.length === 0) return <div className="text-center py-8">No events found.</div>

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear}>
          <h3 className="text-2xl font-semibold mb-4">{monthYear}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {monthEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="p-0">
                    <Image 
                      src={event.image || "/placeholder.svg"} 
                      alt={event.title} 
                      width={300} 
                      height={200} 
                      className="rounded-t-lg w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                    <CardDescription>
                      <span className="block text-sm mb-2">{new Date(event.date).toLocaleDateString()} - {event.location}</span>
                      <span className="block text-sm line-clamp-2">{event.description}</span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <span className="text-lg font-bold">${event.price.toFixed(2)}</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

