"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar } from "lucide-react"

// This would come from a database in a real application
const meetingsData = [
  {
    id: "1",
    date: "March 15, 2024",
    time: "7:00 PM",
    location: "Church Fellowship Hall",
    agenda: [
      "Opening Prayer",
      "Approval of Previous Minutes",
      "Financial Report",
      "Building Maintenance Updates",
      "Upcoming Events Planning",
      "New Business",
      "Closing Prayer",
    ],
    minutes: "Minutes will be available after approval at the next meeting.",
  },
  {
    id: "2",
    date: "February 18, 2024",
    time: "7:00 PM",
    location: "Church Fellowship Hall",
    agenda: [
      "Opening Prayer",
      "Approval of Previous Minutes",
      "Youth Ministry Report",
      "Easter Service Planning",
      "Volunteer Recognition Program",
      "New Business",
      "Closing Prayer",
    ],
    minutes:
      "The council approved the budget for the Easter service and discussed plans for a new volunteer recognition program to be implemented in May.",
  },
  {
    id: "3",
    date: "January 21, 2024",
    time: "7:00 PM",
    location: "Church Fellowship Hall",
    agenda: [
      "Opening Prayer",
      "Approval of Previous Minutes",
      "Annual Budget Review",
      "Ministry Reports",
      "Strategic Planning for 2024",
      "New Business",
      "Closing Prayer",
    ],
    minutes:
      "The annual budget was approved unanimously. Each ministry presented their goals for 2024, and the council discussed strategic priorities for the coming year.",
  },
]

export function CouncilMeetings() {
  const [meetings] = useState(meetingsData)
  const [upcomingMeetings, pastMeetings] = meetings.reduce(
    (result, meeting) => {
      const meetingDate = new Date(meeting.date)
      const today = new Date()

      if (meetingDate > today) {
        result[0].push(meeting)
      } else {
        result[1].push(meeting)
      }

      return result
    },
    [[], []] as [typeof meetings, typeof meetings],
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Upcoming Meetings</h3>
        {upcomingMeetings.length === 0 ? (
          <p className="text-muted-foreground">No upcoming meetings scheduled.</p>
        ) : (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-start gap-4 border p-4 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    {meeting.date} at {meeting.time}
                  </h4>
                  <p className="text-sm text-muted-foreground">{meeting.location}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Past Meetings</h3>
        <Accordion type="single" collapsible className="w-full">
          {pastMeetings.map((meeting) => (
            <AccordionItem key={meeting.id} value={meeting.id}>
              <AccordionTrigger>
                <div className="text-left">
                  <div>{meeting.date}</div>
                  <div className="text-sm text-muted-foreground">{meeting.location}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="font-medium">Agenda</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {meeting.agenda.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Minutes</h4>
                    <p className="text-sm mt-2">{meeting.minutes}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download Full Minutes
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

