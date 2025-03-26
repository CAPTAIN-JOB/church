import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarView } from "@/components/calendar-view";
import { EventsList } from "@/components/event-list";
import { FeaturedEvent } from "@/components/featured-event";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Church Events
          </h1>
          <p className="text-xl text-muted-foreground">
            Join us for worship, fellowship, and community service
          </p>
        </div>
        <div className="flex gap-2 ">
          <Button asChild>
            <Link href="/events/submit">Submit Event</Link>
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <FeaturedEvent />
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="bg-primary/10 hover:bg-primary/20"
          >
            All Events
          </Badge>
          <Badge variant="outline">Worship</Badge>
          <Badge variant="outline">Youth</Badge>
          <Badge variant="outline">Community</Badge>
          <Badge variant="outline">Bible Study</Badge>
          <Badge variant="outline">Missions</Badge>
          <Badge variant="outline">Fellowship</Badge>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                This Month
              </Button>
              <Button variant="outline" size="sm">
                Next Month
              </Button>
            </div>
          </div>

          <TabsContent value="list" className="mt-6">
            <EventsList />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <CalendarView />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Subscribe to Our Events</CardTitle>
            <CardDescription>
              Stay updated with all church activities and never miss an
              important event
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                Google Calendar
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                iCalendar
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                Email Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
