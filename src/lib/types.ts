import { z } from 'zod'


export const RegisterSchema = z.object({
  name:z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});


export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});




export const TodoSchema = z.object({
  task: z.string().min(5),
});


export const PostSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(5).max(225),
});

export const BlogSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(5),
  imageUrl: z.string().optional()
  // imageUrl: z.instanceof(File),
});

















