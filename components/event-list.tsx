import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// This would come from a database in a real application
const eventsData = [
  {
    id: "1",
    title: "Sunday Worship Service",
    description: "Weekly worship service with praise, prayer, and teaching",
    date: "Every Sunday",
    time: "10:00 AM - 11:30 AM",
    location: "Main Sanctuary",
    category: "Worship",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Youth Bible Study",
    description: "Weekly Bible study for teenagers and young adults",
    date: "Every Wednesday",
    time: "7:00 PM - 8:30 PM",
    location: "Youth Room",
    category: "Youth",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Community Food Drive",
    description: "Monthly food collection for local families in need",
    date: "First Saturday of each month",
    time: "9:00 AM - 12:00 PM",
    location: "Church Parking Lot",
    category: "Community",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Women's Prayer Breakfast",
    description: "Monthly gathering for women to pray and fellowship together",
    date: "Third Saturday of each month",
    time: "8:00 AM - 9:30 AM",
    location: "Fellowship Hall",
    category: "Fellowship",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Men's Bible Study",
    description: "Weekly study and discussion for men",
    date: "Every Thursday",
    time: "6:30 AM - 7:30 AM",
    location: "Conference Room",
    category: "Bible Study",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Children's Sunday School",
    description: "Age-appropriate Bible lessons for children",
    date: "Every Sunday",
    time: "9:00 AM - 10:00 AM",
    location: "Children's Wing",
    category: "Youth",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "7",
    title: "Mission Trip Planning Meeting",
    description: "Planning session for upcoming summer mission trip",
    date: "April 15, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Conference Room",
    category: "Missions",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "8",
    title: "Church Picnic",
    description: "Annual church family picnic with games and fellowship",
    date: "May 20, 2023",
    time: "12:00 PM - 4:00 PM",
    location: "City Park",
    category: "Fellowship",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function EventsList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {eventsData.map((event) => (
        <Card key={event.id} className="overflow-hidden flex flex-col">
          <div className="relative h-48">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2">{event.category}</Badge>
          </div>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 flex-1">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href={`/events/${event.id}`}>
                View Details
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


