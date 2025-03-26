"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function CouncilMemberForm() {

  const addConucil = useMutation(api.council.addCouncilMembers)

  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    bio: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {

      await addConucil({
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio
      })
      // In a real app, this would save to a database
      // For now, we'll just simulate a successful submission

      toast({
        title: "Council member added!",
        description: "The new council member has been added to the directory.",
      })

      // Reset form
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        bio: "",
      })

      // Refresh the page to show the new member (in a real app, this would update state)
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "The council member couldn't be added. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Council Role</Label>
          <Input
            id="role"
            name="role"
            placeholder="e.g. Treasurer, Elder, etc."
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" placeholder="(254) 123-4567" value={formData.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Brief description of the council member's background and role"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Council Member"}
      </Button>
    </form>
  )
}

