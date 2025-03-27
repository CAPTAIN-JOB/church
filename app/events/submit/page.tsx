import { SubmitEventForm } from "@/components/submit-event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubmitEventPage() {
  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="mb-6">
        <Link
          href="/events"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </div>

      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Submit an Event
          </h1>
          <p className="text-xl text-muted-foreground">
            Share your church event with the congregation
          </p>
        </div>
      </div>

      <div className="grid gap-8 mt-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Fill out the form below to submit your event for approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubmitEventForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Event Approval Process</h3>
                  <p className="text-muted-foreground mt-1">
                    All submitted events will be reviewed by church staff before
                    being published to the calendar. This process typically
                    takes 1-2 business days.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Required Information</h3>
                  <p className="text-muted-foreground mt-1">
                    Please provide complete details about your event, including
                    date, time, location, and a clear description. Events with
                    incomplete information may be delayed or rejected.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Event Images</h3>
                  <p className="text-muted-foreground mt-1">
                    Images should be high quality and relevant to the event.
                    Recommended size is 1200×600 pixels. Please ensure you have
                    rights to use any images you upload.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Facility Requests</h3>
                  <p className="text-muted-foreground mt-1">
                    Submitting an event does not automatically reserve church
                    facilities. Please contact the church office separately to
                    book rooms or equipment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you have questions about submitting an event or need
                assistance, please contact:
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Email:</span>
                  <span className="text-sm">events@aicchergeichurch.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Phone:</span>
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Office Hours:</span>
                  <span className="text-sm">
                    Monday-Friday, 9:00 AM - 5:00 PM
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
