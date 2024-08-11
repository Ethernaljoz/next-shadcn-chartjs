"use client"
import React from "react";
import Image from "next/image";
import defaultImage from "../../public/static/default.svg"
import Link from "next/link";
import { useRouter } from "next/navigation";



interface blogProps {
  key: number;
  blog: props;
}

interface props {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorEmail: string;
}

const BlogItem = ({ blog }: blogProps) => {
  const router = useRouter()
  return (
    <div className="mx-2 my-5  rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto">
      <div className="flex flex-col">
        <div className=" px-5 mt-5 relative ">
          <Image
            src={blog.imageUrl ? blog.imageUrl : defaultImage}
            alt="Shop image"
            height={250}
            width={500}
            style={{ width: 500, height: 200 }}
            layout="fixed"
            className="rounded-md shadow-lg object-cover "
          />
        </div>

        <div className="p-5">
          

          <p className="mt-2 text-black text-2xl font-black line-clamp-1 ">
            {blog.title}
          </p>
          <p className="mt-3 text-gray-600 text-justify line-clamp-3">
            {blog.content}
          </p>
         
          <button onClick={()=>{router.push(`/blogs/${blog.id}`)}} className="w-full mt-4 mr-2 flex items-center justify-center rounded-md bg-black px-8 py-2 text-center text-white duration-150  hover:translate-y-1 hover:bg-gray-700">
            Read More
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
