import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Book, Users, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-md">
                  Welcome to Aic Chergei Community
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-md">
                  A place of worship, community, and spiritual growth
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/youth">
                    Youth Ministry <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-white">
                  <Link href="/council">
                    Church Council <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 items-start">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Book className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Youth Bible Study</h3>
                <p className="text-muted-foreground">
                  Join our youth in exploring the Word through engaging Bible studies.
                </p>
                <Button asChild variant="outline">
                  <Link href="/youth">Learn More</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Church Council</h3>
                <p className="text-muted-foreground">Meet the dedicated leaders guiding our church community.</p>
                <Button asChild variant="outline">
                  <Link href="/council">Learn More</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upcoming Events</h3>
                <p className="text-muted-foreground">Stay connected with our church events and activities.</p>
                <Button asChild variant="outline">
                  <Link href="/events">View Calendar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Grace Community Church. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

