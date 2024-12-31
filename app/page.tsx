import { EventList } from "@/components/event-list"

export default function Home() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Upcoming Events</h2>
      <EventList />
    </div>
  )
}

