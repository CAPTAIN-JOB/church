import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
	books: defineTable({
		title: v.string(),
		author: v.string(),
		description: v.string(),
		addedBy: v.string(), // User ID of who added the book
		addedAt: v.number(), // Timestamp
	}),
	councilMembers: defineTable({
		name: v.string(),
		role: v.string(),
		email: v.string(),
		phone: v.string(),
		bio: v.string(),
		addedAt: v.number(),
	}),
});
