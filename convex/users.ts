// import { query, mutation } from "./_generated/server";
// import { v } from "convex/values";

// // Add or update user in the database
// export const saveUser = mutation({
// 	args: {
// 		userId: v.string(),
// 		name: v.string(),
// 		email: v.string(),
// 	},
// 	handler: async ({ db }, { userId, name, email }) => {
// 		return db.patchOrInsert("users", { userId }, { name, email });
// 	},
// });

// // Get user details
// export const getUser = query({
// 	args: { userId: v.string() },
// 	handler: async ({ db }, { userId }) => {
// 		return db
// 			.query("users")
// 			.filter((q) => q.eq(q.field("userId"), userId))
// 			.first();
// 	},
// });
