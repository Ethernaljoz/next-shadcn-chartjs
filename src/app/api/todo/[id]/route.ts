import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";

interface Params{
  params:{
    id:string
  }
}


export async function PUT(req: Request, { params }:Params) {
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

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (todo?.authorEmail !== user.email) {
      return NextResponse.json(
        { message: "you can update this todo" },
        { status: 401 }
      );
    }

    const { task, isComplete } = await req.json();
    console.log(isComplete)

    await prisma.todo.update({
      where: { id },
      data: {
        task: task ? task : todo.task,
        isComplete: isComplete ? isComplete : todo.isComplete,
      },
    }).then(res => console.log(res))

    return NextResponse.json({ message: "todo updates" }, { status: 200 });

    
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

    const todo = await prisma.todo.findUnique({ where: { id } });

    if (todo?.authorEmail !== user.email) {
      return NextResponse.json(
        { message: "you can't delete this task" },
        { status: 401 }
      );
    }

    await prisma.todo.delete({ where: { id } });

    return NextResponse.json(
      { message: "todo deletes" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
