"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// This would come from a database in a real application
const eventsData = {
  "2023-04-02": [{ id: "1", title: "Sunday Worship Service", category: "Worship", time: "10:00 AM" }],
  "2023-04-05": [{ id: "2", title: "Youth Bible Study", category: "Youth", time: "7:00 PM" }],
  "2023-04-06": [{ id: "5", title: "Men's Bible Study", category: "Bible Study", time: "6:30 AM" }],
  "2023-04-09": [
    { id: "1", title: "Sunday Worship Service", category: "Worship", time: "10:00 AM" },
    { id: "6", title: "Children's Sunday School", category: "Youth", time: "9:00 AM" },
    { id: "9", title: "Easter Sunday Celebration", category: "Worship", time: "10:00 AM" },
  ],
  "2023-04-12": [{ id: "2", title: "Youth Bible Study", category: "Youth", time: "7:00 PM" }],
  "2023-04-13": [{ id: "5", title: "Men's Bible Study", category: "Bible Study", time: "6:30 AM" }],
  "2023-04-15": [{ id: "7", title: "Mission Trip Planning Meeting", category: "Missions", time: "6:00 PM" }],
  "2023-04-16": [
    { id: "1", title: "Sunday Worship Service", category: "Worship", time: "10:00 AM" },
    { id: "6", title: "Children's Sunday School", category: "Youth", time: "9:00 AM" },
  ],
  "2023-04-19": [{ id: "2", title: "Youth Bible Study", category: "Youth", time: "7:00 PM" }],
  "2023-04-20": [{ id: "5", title: "Men's Bible Study", category: "Bible Study", time: "6:30 AM" }],
  "2023-04-23": [
    { id: "1", title: "Sunday Worship Service", category: "Worship", time: "10:00 AM" },
    { id: "6", title: "Children's Sunday School", category: "Youth", time: "9:00 AM" },
  ],
  "2023-04-26": [{ id: "2", title: "Youth Bible Study", category: "Youth", time: "7:00 PM" }],
  "2023-04-27": [{ id: "5", title: "Men's Bible Study", category: "Bible Study", time: "6:30 AM" }],
  "2023-04-30": [
    { id: "1", title: "Sunday Worship Service", category: "Worship", time: "10:00 AM" },
    { id: "6", title: "Children's Sunday School", category: "Youth", time: "9:00 AM" },
  ],
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 3, 1)) // April 2023

  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getDateString = (day: number) => {
    const dateObj = new Date(year, month, day)
    return dateObj.toISOString().split("T")[0]
  }

  const renderCalendarDays = () => {
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border/50 bg-muted/20"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = getDateString(day)
      const dayEvents = eventsData[dateString] || []

      days.push(
        <div key={day} className="min-h-24 border border-border/50 p-1 relative">
          <div className="font-medium text-sm p-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event, index) => (
              <Link href={`/events/${event.id}`} key={`${day}-${index}`}>
                <div className="text-xs bg-primary/10 rounded p-1 truncate hover:bg-primary/20">
                  <span className="font-medium">{event.time}</span> {event.title}
                </div>
              </Link>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground p-1">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div key={day} className="font-medium text-center py-2 text-sm">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-primary/10">
          Worship
        </Badge>
        <Badge variant="outline" className="bg-secondary/10">
          Youth
        </Badge>
        <Badge variant="outline" className="bg-accent/10">
          Bible Study
        </Badge>
        <Badge variant="outline" className="bg-green-500/10">
          Fellowship
        </Badge>
        <Badge variant="outline" className="bg-orange-500/10">
          Missions
        </Badge>
      </div>
    </Card>
  )
}


