"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const venues = [
  { id: 1, name: "Sunny Beach", capacity: 1000, events: 2 },
  { id: 2, name: "Tech Center", capacity: 500, events: 1 },
  { id: 3, name: "Downtown Hall", capacity: 750, events: 3 },
]

export function VenueList() {
  const [selectedVenue, setSelectedVenue] = useState(null)

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Venues</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Events</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues.map((venue) => (
            <TableRow key={venue.id}>
              <TableCell>{venue.name}</TableCell>
              <TableCell>{venue.capacity}</TableCell>
              <TableCell>{venue.events}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedVenue(venue)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

