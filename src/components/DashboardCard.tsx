/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kfKxYkVsKHI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  ClipboardCheck,
  Newspaper,
  User,
  LogOut,
  FileType,
} from "lucide-react";
import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";

 const DashboardCard = async () =>{
  const currentUser = await getCurrentUser()
  let todos
  let blogs
  let posts
  if(currentUser?.email){
   todos = await prisma.todo.findMany({where:{authorEmail:currentUser!.email} ,orderBy: { id: "desc" } });
   blogs = await prisma.blog.findMany({where:{authorEmail:currentUser!.email} ,orderBy: { id: "desc" } });
   posts = await prisma.post.findMany({where:{authorEmail:currentUser!.email} ,orderBy: { id: "desc" } });
    
  }
  return (
    <section className="grid grid-cols-3 gap-6 mb-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Todos</CardTitle>
          <CardDescription>
            The total number of registered users.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-4xl font-bold">{todos ? todos.length : 0}</span>
          <ClipboardCheck className="h-8 w-8 text-black" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Posts</CardTitle>
          <CardDescription>
            The number of new users that signed up this month.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-4xl font-bold">{posts ? posts.length : 0}</span>
          <Newspaper className="h-8 w-8 text-black" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Blogs</CardTitle>
          <CardDescription>
            The percentage of visitors that become customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-4xl font-bold">{blogs ? blogs.length : 0}</span>
          <FileType className="h-8 w-8 text-blackpse" />
        </CardContent>
      </Card>
    </section>
  );
}

export default DashboardCard;