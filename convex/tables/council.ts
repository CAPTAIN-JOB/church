import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const addCouncilMembers = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    bio: v.string(),
  },
  handler: async ({ db }, { name, role, email, phone, bio }) => {
    return db.insert("councilMembers", {
      name,
      role,
      email,
      phone,
      bio,
      addedAt: Date.now(),
    });
  },
});

export const getCouncil = query({
  handler: async ({ db }) => {
    return db.query("councilMembers").order("desc").collect();
  },
});
