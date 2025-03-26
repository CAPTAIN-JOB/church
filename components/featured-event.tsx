import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FeaturedEvent() {
  return (
    <Card className="overflow-hidden">
      <div className="md:grid md:grid-cols-2">
        <div className="relative h-60 md:h-auto">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Easter Sunday Service"
            fill
            className="object-cover"
          />
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured Event</Badge>
        </div>
        <div className="p-6 flex flex-col">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">
                Worship
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                Community
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl">Easter Sunday Celebration</CardTitle>
            <CardDescription>
              Join us for a special Easter service celebrating the resurrection of Jesus Christ
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Sunday, April 9, 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>10:00 AM - 12:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Main Sanctuary, Grace Community Church</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>All ages welcome</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Celebrate the resurrection of our Lord with special music, an inspiring message, and fellowship. Bring
                your family and friends to this joyous occasion.
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-0 pt-4 flex gap-2">
            <Button asChild>
              <Link href="/events/easter-sunday">Learn More</Link>
            </Button>
            <Button variant="outline">Add to Calendar</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}


