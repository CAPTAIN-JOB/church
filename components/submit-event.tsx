"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  startTime: z.string({
    required_error: "Please select a start time.",
  }),
  endTime: z.string({
    required_error: "Please select an end time.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  address: z.string().optional(),
  organizer: z.string().min(2, {
    message: "Organizer name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurrencePattern: z.string().optional(),
  requiresRegistration: z.boolean().default(false),
  maxAttendees: z.string().optional(),
  additionalInfo: z.string().optional(),
  agreeToGuidelines: z.boolean().refine((val) => val === true, {
    message: "You must agree to the event submission guidelines.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function SubmitEventForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: undefined,
      startTime: "",
      endTime: "",
      location: "",
      address: "",
      organizer: "",
      contactEmail: "",
      contactPhone: "",
      isRecurring: false,
      recurrencePattern: "",
      requiresRegistration: false,
      maxAttendees: "",
      additionalInfo: "",
      agreeToGuidelines: false,
    },
  })

  const watchedValues = form.watch()
  const isRecurring = form.watch("isRecurring")
  const requiresRegistration = form.watch("requiresRegistration")

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would send data to a server
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Event submitted successfully!",
        description: "Your event has been submitted for review.",
      })

      // Redirect to events page
      router.push("/events")
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your event couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePreview = () => {
    if (!previewMode) {
      // Validate form before showing preview
      form.trigger()
      if (form.formState.isValid) {
        setPreviewMode(true)
      }
    } else {
      setPreviewMode(false)
    }
  }

  if (previewMode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{watchedValues.title}</h2>
                <p className="text-muted-foreground mt-2">{watchedValues.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-sm">Date & Time</h3>
                  <p className="text-sm">
                    {watchedValues.date ? format(watchedValues.date, "MMMM d, yyyy") : ""}
                    {watchedValues.startTime ? ` • ${watchedValues.startTime}` : ""}
                    {watchedValues.endTime ? ` - ${watchedValues.endTime}` : ""}
                  </p>
                  {watchedValues.isRecurring && watchedValues.recurrencePattern && (
                    <p className="text-sm text-muted-foreground">Recurring: {watchedValues.recurrencePattern}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-sm">Location</h3>
                  <p className="text-sm">{watchedValues.location}</p>
                  {watchedValues.address && <p className="text-sm text-muted-foreground">{watchedValues.address}</p>}
                </div>

                <div>
                  <h3 className="font-medium text-sm">Category</h3>
                  <p className="text-sm">{watchedValues.category}</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm">Organizer</h3>
                  <p className="text-sm">{watchedValues.organizer}</p>
                  <p className="text-sm text-muted-foreground">{watchedValues.contactEmail}</p>
                  {watchedValues.contactPhone && (
                    <p className="text-sm text-muted-foreground">{watchedValues.contactPhone}</p>
                  )}
                </div>
              </div>

              {watchedValues.requiresRegistration && (
                <div className="mt-2">
                  <h3 className="font-medium text-sm">Registration</h3>
                  <p className="text-sm">Registration required</p>
                  {watchedValues.maxAttendees && (
                    <p className="text-sm text-muted-foreground">Maximum attendees: {watchedValues.maxAttendees}</p>
                  )}
                </div>
              )}

              {watchedValues.additionalInfo && (
                <div className="mt-2">
                  <h3 className="font-medium text-sm">Additional Information</h3>
                  <p className="text-sm">{watchedValues.additionalInfo}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={togglePreview}>
            Edit Event
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your event" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>Provide a brief description of your event (max 500 characters).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Worship">Worship</SelectItem>
                      <SelectItem value="Youth">Youth</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Bible Study">Bible Study</SelectItem>
                      <SelectItem value="Missions">Missions</SelectItem>
                      <SelectItem value="Fellowship">Fellowship</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Recurring Event</FormLabel>
                    <FormDescription>Check this if your event repeats on a regular schedule</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {isRecurring && (
              <FormField
                control={form.control}
                name="recurrencePattern"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recurrence Pattern</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select how often this event repeats" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Main Sanctuary, Fellowship Hall" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Full address if not at the church" {...field} />
                  </FormControl>
                  <FormDescription>Only needed if the event is not at the main church building</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>

            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer/Ministry</FormLabel>
                  <FormControl>
                    <Input placeholder="Who is organizing this event?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email for inquiries" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number for inquiries" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Details</h3>

            <FormField
              control={form.control}
              name="requiresRegistration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Registration Required</FormLabel>
                    <FormDescription>Check this if attendees need to register for this event</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {requiresRegistration && (
              <FormField
                control={form.control}
                name="maxAttendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Attendees (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Leave blank if no limit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any other details about the event" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include any special instructions, what to bring, or other relevant details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border rounded-md p-4">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Event Image (Optional)</h3>
              </div>
              <div className="flex items-center justify-center border-2 border-dashed rounded-md h-32">
                <div className="text-center">
                  <Button variant="ghost" type="button" className="relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <span>Click to upload</span>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG or GIF, max 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="agreeToGuidelines"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I agree to the event submission guidelines</FormLabel>
                  <FormDescription>
                    By submitting this event, you confirm that all information is accurate and appropriate for our
                    church community.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={togglePreview}>
            Preview Event
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


