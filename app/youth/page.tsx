import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookForm } from "@/components/book-form"
import { BookList } from "@/components/book-list"

export default function YouthPage() {
  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Youth Ministry</h1>
          <p className="text-xl text-muted-foreground">A place for our youth to grow in faith and fellowship</p>
        </div>
      </div>

      <Tabs defaultValue="books" className="mt-8">
        <TabsList>
          <TabsTrigger value="books">Bible Study Books</TabsTrigger>
          <TabsTrigger value="events">Youth Events</TabsTrigger>
          <TabsTrigger value="leaders">Youth Leaders</TabsTrigger>
        </TabsList>
        <TabsContent value="books" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Add Bible Study Book</CardTitle>
                <CardDescription>Share your favorite Bible study resources with the youth group</CardDescription>
              </CardHeader>
              <CardContent>
                <BookForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bible Study Resources</CardTitle>
                <CardDescription>Browse books recommended by our youth members</CardDescription>
              </CardHeader>
              <CardContent>
                <BookList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Youth Events</CardTitle>
              <CardDescription>Join us for these exciting youth activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Youth Retreat</h3>
                  <p className="text-sm text-muted-foreground">June 15-17, 2024 • Camp Wilderness</p>
                  <p className="mt-2">A weekend of fellowship, worship, and outdoor activities.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Bible Study Night</h3>
                  <p className="text-sm text-muted-foreground">Every Wednesday • 7:00 PM</p>
                  <p className="mt-2">Weekly gathering to study scripture and grow together.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Youth Service Project</h3>
                  <p className="text-sm text-muted-foreground">July 8, 2024 • 9:00 AM</p>
                  <p className="mt-2">Serving our community through volunteer work.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaders">
          <Card>
            <CardHeader>
              <CardTitle>Youth Ministry Leaders</CardTitle>
              <CardDescription>Meet the dedicated team guiding our youth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
                  <h3 className="font-medium">Pastor Michael Johnson</h3>
                  <p className="text-sm text-muted-foreground">Youth Pastor</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
                  <h3 className="font-medium">Sarah Williams</h3>
                  <p className="text-sm text-muted-foreground">Youth Coordinator</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
                  <h3 className="font-medium">David Thompson</h3>
                  <p className="text-sm text-muted-foreground">Bible Study Leader</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

