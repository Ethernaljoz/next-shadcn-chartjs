"use client"
import React from "react";
import Image from "next/image";
import profilePhoto from "../../public/assets/splash.png";
import { log } from "console";
import { useRouter } from "next/navigation";

interface postProps {
  key: number;
  post: props;
}
interface props{



    author: {
        id: string;
        email: string;
        name: string | null;
        password: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorEmail: string;
  } 




const PostItem = ({ post }:postProps) => {
  const router = useRouter()
  return (
    <button onClick={()=>{router.push(`/posts/${post.id}`)}} className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-80 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-col items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-gray-200">
      <div className="flex items-center w-full px-4 ">
        <Image
          className="w-12 mr-3 rounded-full border object-cover"
          src={profilePhoto}
          alt="Junior Coders"
          height={50}
          width={50}
          style={{ width: 50, height: 50 }}
        />
        <div className="text-left">
          <h3 className="leading-4">{post.author.name}</h3>
          <span className="text-xs text-gray-500">Published: {post.updatedAt.toDateString()}</span>
        </div>
      </div>
      <div>
        <span className="font-bold line-clamp-1">{post.title}</span>
        <p className="line-clamp-3 text-justify">{post.content}</p>
      </div>

    </button>
  );
};

export default PostItem;
