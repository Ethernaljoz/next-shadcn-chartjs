import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/lib/session";

interface Params{
  params:{
    id:string
  }
}


export async function PUT(req:Request, {params}:Params){

  const user = await getCurrentUser()
  const { id } = params

  try {

    if(!user || !user?.email){
      return NextResponse.json(
        {message:"you are not authorised"},
        {status:401}
      )
    }

    const post = await prisma.post.findUnique({where:{id}})

    if(post?.authorEmail !== user.email){
      return NextResponse.json(
        {message:"you can't uptdate this post"},
        {status:401}
      )
    }

    const { newTitle, newContent } = await req.json()
    
    await prisma.post.update({
      where:{id},
      data:{
        title: newTitle ? newTitle : post.title,
        content: newContent ? newContent : post.content
      }
    })

    return NextResponse.json(
      {message:"post updates"},
      {status:200}
    )

  } catch (error) {

    return NextResponse.json(
      {message:"Something went wrong"},
      {status:500}
    )

  }
}




export async function DELETE(req:Request, { params }:Params) {
    const user = await getCurrentUser();
    const { id } = params;
    console.log("id", id);
    console.log("user", user);
    try {
      if (!user || !user.email) {
        return NextResponse.json(
          { message: "you are not authorised" },
          { status: 401 }
        );
      }

      const post = await prisma.post.findUnique({ where: { id } });

      if (post?.authorEmail !== user.email) {
        return NextResponse.json(
          { message: "you can't delete this post" },
          { status: 401 }
        );
      }

      await prisma.post.delete({ where: { id } });

      return NextResponse.json({ message: "post deletes" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "something went wrong" },
        { status: 500 }
      );
    }
}















































