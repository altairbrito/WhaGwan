"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const attendees = [
  { id: 1, name: "John Doe", event: "Summer Beach Party", arrived: true, paid: true },
  { id: 2, name: "Jane Smith", event: "Tech Conference 2023", arrived: false, paid: true },
  { id: 3, name: "Bob Johnson", event: "Summer Beach Party", arrived: true, paid: false },
]

export function AttendeeManagement() {
  const [attendeeList, setAttendeeList] = useState(attendees)

  const toggleArrived = (id: number) => {
    setAttendeeList(attendeeList.map(attendee => 
      attendee.id === id ? { ...attendee, arrived: !attendee.arrived } : attendee
    ))
  }

  const togglePaid = (id: number) => {
    setAttendeeList(attendeeList.map(attendee => 
      attendee.id === id ? { ...attendee, paid: !attendee.paid } : attendee
    ))
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Attendee Management</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendeeList.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>{attendee.name}</TableCell>
              <TableCell>{attendee.event}</TableCell>
              <TableCell>
                <Badge variant={attendee.arrived ? "default" : "secondary"}>
                  {attendee.arrived ? "Arrived" : "Not Arrived"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={attendee.paid ? "default" : "destructive"}>
                  {attendee.paid ? "Paid" : "Unpaid"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button onClick={() => toggleArrived(attendee.id)} className="mr-2">
                  Toggle Arrival
                </Button>
                <Button onClick={() => togglePaid(attendee.id)}>
                  Toggle Payment
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

