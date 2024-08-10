import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  console.log(user);
  try {
    if (!user || !user?.email) {
      return NextResponse.json(
        { message: "your are not authorised" },
        { status: 401 }
      );
    }

    const { title, content, imageUrl } = await req.json();

    if (!title || !content || !imageUrl) {
      return NextResponse.json(
        { message: "please add the field" },
        { status: 400 }
      );
    }

    await prisma.blog.create({
      data: {
        title,
        content,
        imageUrl,
        authorEmail: user.email,
      },
    });

    return NextResponse.json(
      { message: "blog creates" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}









