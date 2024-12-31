"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { EventRegistration } from "@/components/event-registration"
import { supabase } from "@/lib/supabase"

export default function EventDetails() {
  const { id } = useParams()
  const [showRegistration, setShowRegistration] = useState(false)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvent()
  }, [id])

  async function fetchEvent() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setEvent(data)
    } catch (error) {
      console.error('Error fetching event:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!event) return <div>Event not found</div>

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Image src={event.image || "/placeholder.svg"} alt={event.title} width={600} height={400} className="rounded-lg" />
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{new Date(event.date).toLocaleDateString()} - {event.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
          <p className="mt-4 font-bold">Price: ${event.price}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowRegistration(!showRegistration)}>
            {showRegistration ? "Hide Registration" : "Register for Event"}
          </Button>
        </CardFooter>
      </Card>
      {showRegistration && <EventRegistration eventId={event.id} />}
    </div>
  )
}

