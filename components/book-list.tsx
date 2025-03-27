"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function BookList() {
  const books = useQuery(api.tables.books.getBooks);

  if (!books) return <p> Loading books... </p>
  return (
    <div className="space-y-4">
      {books.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No books have been added yet. Be the first to share a resource!
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book._id} className="space-y-2">
                <div>
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    by {book.author}
                  </p>
                </div>
                <p className="text-sm">{book.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Added by {book.addedBy} on{" "}
                    {new Date(book.addedAt).toLocaleDateString()}
                  </p>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
