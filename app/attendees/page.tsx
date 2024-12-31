"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const initialAttendees = [
  { id: 1, name: "John Doe", event: "Summer Beach Party", arrived: false },
  { id: 2, name: "Jane Smith", event: "Tech Conference 2023", arrived: false },
  { id: 3, name: "Bob Johnson", event: "Summer Beach Party", arrived: false },
]

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState(initialAttendees)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleArrived = (id: number) => {
    setAttendees(attendees.map(attendee => 
      attendee.id === id && !attendee.arrived ? { ...attendee, arrived: true } : attendee
    ))
  }

  const filteredAttendees = attendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.event.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Attendees List</h2>
      <Input
        placeholder="Search attendees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAttendees.map((attendee) => (
            <TableRow key={attendee.id} className={attendee.arrived ? "bg-green-100 dark:bg-green-900" : ""}>
              <TableCell>{attendee.name}</TableCell>
              <TableCell>{attendee.event}</TableCell>
              <TableCell>
                <Badge variant={attendee.arrived ? "default" : "secondary"}>
                  {attendee.arrived ? "Arrived" : "Not Arrived"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  onClick={() => toggleArrived(attendee.id)} 
                  disabled={attendee.arrived}
                >
                  {attendee.arrived ? "Checked In" : "Check In"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

