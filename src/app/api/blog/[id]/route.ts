import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import { log } from "console";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: Params) {
  console.log("le params", params);
  const user = await getCurrentUser();
  const { id } = params;
  console.log("id recuperer", id);

  try {
    if (!user || !user?.email) {
      return NextResponse.json(
        { message: "you are not authorised" },
        { status: 401 }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (blog?.authorEmail !== user.email) {
      return NextResponse.json(
        { message: "you can update this blog" },
        { status: 401 }
      );
    }

    const { title:newTitle,content:newContent,imageUrl:newImageUrl } = await req.json();

    console.log("l image url",newImageUrl)

      await prisma.blog.update({
        where: { id },
        data: {
          title: newTitle !== "" ? newTitle : blog.title,
          content: newContent !== "" ? newContent : blog.content,
          imageUrl: newContent !== "" ? newImageUrl : blog.imageUrl,
        },
      }).then(response=>console.log("response update info",response));

      return NextResponse.json({ message: "blog is edited" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
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

    const blog = await prisma.blog.findUnique({ where: { id } });

    if (blog?.authorEmail !== user.email) {
      return NextResponse.json(
        { message: "you can't delete this blog" },
        { status: 401 }
      );
    }

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ message: "blog deletes" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
