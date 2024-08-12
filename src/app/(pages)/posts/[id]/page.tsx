import Loading from '@/app/loading';
import BackButton from '@/components/BackButton';
import DeleteButton from '@/components/DeleteButton';
import prisma from '@/lib/prisma';
import getCurrentUser from '@/lib/session';
import React from 'react'
import Image from "next/image";
import profilePhoto from "../../../../../public/assets/splash.png";
import PostEditForm from '@/components/form/PostEditForm';

interface props {
  params: {
    id: string;
  };
}

const PostDetailPage = async ({ params }: props) => {
  const { id } = params;
  const currentUser = await getCurrentUser();
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!post) {
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
              <h3 className="leading-4 text-lg font-medium">
                {post.author.name}
              </h3>
              <span className="text-sm text-gray-500">
                Published: {post.updatedAt.toDateString()}
              </span>
            </div>
          </div>
          <BackButton />
        </header>

        <section className="max-w-3xl mx-auto">
          <div className="flex flex-col">
            <p className="px-5 mt-2 text-black text-4xl font-black  ">
              {post.title}
            </p>
            
            <p
              className={`px-5 mt-3 text-gray-600 text-justify ${
                currentUser?.email !== post.authorEmail ? "pb-20" : ""
              }`}
            >
              {post.content}
            </p>

            {currentUser?.email === post.authorEmail ? (
              <div className="mt-7 flex justify-end items-center gap-5 px-5 pb-20">
                <PostEditForm post={post} />
                <DeleteButton path="post" id={post.id} />
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

export default PostDetailPage