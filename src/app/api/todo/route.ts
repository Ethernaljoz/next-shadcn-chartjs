import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";



export async function POST(req:Request){
const user = await getCurrentUser()
console.log(user)
try {

    if(!user || !user?.email){
        return NextResponse.json(
            {message:"your are not authorised"},
            {status:401}
        )
    }

    const { task } = await req.json()
    console.log(task)

    if(!task){
        return NextResponse.json(
            {message:"please add the field"},
            {status:400}
        )
    }

    await prisma.todo.create({
        data:{
            task,
            authorEmail:user.email
        }
    })

    return NextResponse.json(
        {message:"todo creates"},{
            status:201}
        )
    
} catch (error) {
    console.log(error)
    return NextResponse.json(
        {message:"something went wrong"},
        {status:500}
    )
}

}