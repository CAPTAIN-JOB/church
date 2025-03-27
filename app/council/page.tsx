"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CouncilMemberForm } from "@/components/council-member-form";
import { CouncilMeetings } from "@/components/council-meetings";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CouncilPage() {
  //const councilMembers = useQuery(ap.council.getCouncil)
  const councilMembers = useQuery(api.tables.council.getCouncil);

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Church Council
          </h1>
          <p className="text-xl text-muted-foreground">
            Meet our church leadership and learn about their work
          </p>
        </div>
      </div>

      <Tabs defaultValue="members" className="mt-8">
        <TabsList>
          <TabsTrigger value="members">Council Members</TabsTrigger>
          <TabsTrigger value="meetings">Council Meetings</TabsTrigger>
          <TabsTrigger value="add">Add Member</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {councilMembers?.map((member) => (
              <CouncilMemberCard
                key={member._id} // Ensure each child has a unique "key" prop
                name={member.name}
                role={member.role}
                image={member.image || "/placeholder.svg?height=200&width=200"}
                bio={member.bio}
                contact={member.email}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Council Meetings</CardTitle>
              <CardDescription>
                Schedule and minutes from recent council meetings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CouncilMeetings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Council Member</CardTitle>
              <CardDescription>
                Add a new member to the church council directory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CouncilMemberForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CouncilMemberCard({
  name,
  role,
  image,
  bio,
  contact,
}: {
  name: string;
  role: string;
  image: string;
  bio: string;
  contact: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{bio}</p>
        <p className="text-sm text-muted-foreground">Contact: {contact}</p>
      </CardContent>
    </Card>
  );
}
