"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function BookForm() {


  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addBook = useMutation(api.books.addBook); // Convex mutation
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {

      await addBook({
        title: formData.title,
        author: formData.author,
        description: formData.description,
        addedBy: "anon", // Replace with actual user ID when you add auth

      });
      //// In a real app, this would save to a database
      //// For now, we'll just simulate a successful submission
      //await new Promise((resolve) => setTimeout(resolve, 1000))
      //
      toast({
        title: "Book added successfully!",
        description: "Your Bible study book has been added to the list.",
      })

      // Reset form
      setFormData({
        title: "",
        author: "",
        description: "",
      })

      // Refresh the page to show the new book (in a real app, this would update state)
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your book couldn't be added. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter the book title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          placeholder="Enter the author's name"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What is this book about? Why do you recommend it?"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Book"}
      </Button>
    </form>
  )
}

