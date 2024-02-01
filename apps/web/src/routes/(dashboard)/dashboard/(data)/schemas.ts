import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const ticketSchema = z.object({
	id: z.string(),
	// solution: z.string().optional(),
	title: z.string(),
	status: z.string(),
	label: z.string(),
	// createdAt: z.date(),
	// updatedAt: z.date(),
	priority: z.string(), // z.number().min(0).max(4),
	// source: z.number(),
	// assignee: z.string(),
});

export type Ticket = z.infer<typeof ticketSchema>;
