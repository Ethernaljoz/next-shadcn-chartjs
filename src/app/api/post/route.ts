import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const user = await getCurrentUser();

  try {

    if (!user || !user?.email) {
      return NextResponse.json(
        { message: "you are not authorized" },
        { status: 401 }
      );
    }

    const { title , content } = await req.json();

    if (!title && !content) {
      return NextResponse.json(
        { message: "please add all the fields" },
        { status: 400 }
      );
    }

    await prisma.post.create({
      data: {
        title,
        content,
        authorEmail: user.email,
      },
    });

    return NextResponse.json(
      { message: "post creates" },
      { status: 201 }
    );

  } catch (error) {

    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
