import { z } from 'zod';

// Auth validation
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// Post validation
export const PostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z.string().min(1, 'Slug is required').max(255),
  content: z.string().min(1, 'Content is required'),
  image: z.string().optional(),
  published: z.boolean().default(false),
});

export type PostInput = z.infer<typeof PostSchema>;

// Video validation
export const VideoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  youtubeId: z.string().min(1, 'YouTube ID is required'),
  description: z.string().optional(),
});

export type VideoInput = z.infer<typeof VideoSchema>;

// Page validation
export const PageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z.string().min(1, 'Slug is required').max(255),
  content: z.string().min(1, 'Content is required'),
});

export type PageInput = z.infer<typeof PageSchema>;
