import React from "react";
import Image from "next/image";

import profilePhoto from "../../../../../public/assets/splash.png";
import Loading from "@/app/loading";
import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";
import BlogEditForm from "@/components/form/BlogEditForm";
import BackButton from "@/components/BackButton";
import defaultImage from "../../../../../public/static/default.svg";
import DeleteButton from "@/components/DeleteButton";
interface props {
  params: {
    id: string;
  };
}
const BlogDetailPage = async ({ params }: props) => {
  const { id } = params;
  const currentUser = await getCurrentUser();
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!blog) {
    return <Loading />;
  }
  return (
    <div className="flex h-screen ">
      <main className="flex-1 p-6 bg-white">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center  px-4 ">
            <Image
              className="w-12 mr-3 rounded-full border object-cover"
              src={profilePhoto}
              alt="Junior Coders"
              height={50}
              width={50}
              style={{ width: 50, height: 50 }}
            />
            <div className="text-left">
              <h3 className="leading-4 text-lg font-medium">{blog.author.name}</h3>
              <span className="text-sm text-gray-500">
                Published: 24-345-343
              </span>
            </div>
          </div>
          <BackButton />
        </header>
        
        <section className="max-w-3xl mx-auto">
          <div className="flex flex-col">
            <p className="px-5 mt-2 text-black text-4xl font-black  ">
              {blog.title}
            </p>
            <div className=" p-5 mt-3  ">
              <Image
                src={blog.imageUrl ? blog.imageUrl : defaultImage}
                alt="Shop image"
                height={500}
                width={500}
                style={{ width: "100%", height: 400 }}
                layout="fixed"
                className="rounded-md shadow-lg object-cover "
              />
            </div>

            <p className="px-5 mt-3 text-gray-600 text-justify ">
              {blog.content}
            </p>

            {currentUser?.email === blog.authorEmail ? (
              <div className="mt-7 flex justify-end items-center gap-5 px-5 pb-20">
                <BlogEditForm />
                <DeleteButton path="blog" id={blog.id} />
              </div>
            ) : (
              ""
            )}
            <div></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetailPage;
