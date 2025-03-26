import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to add a new book
export const addBook = mutation({
	args: {
		title: v.string(),
		author: v.string(),
		description: v.string(),
		addedBy: v.string(), // Manually entered username
	},
	handler: async ({ db }, { title, author, description, addedBy }) => {
		return db.insert("books", {
			title,
			author,
			description,
			addedBy, // Store the manually entered name
			addedAt: Date.now(),
		});
	},
});

// Query to get all books
export const getBooks = query({
	args: {},
	handler: async ({ db }) => {
		return db.query("books").order("desc").collect();
	},
});
