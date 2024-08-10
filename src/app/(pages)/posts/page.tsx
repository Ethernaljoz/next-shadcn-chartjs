import React from 'react'
import PostForm from '@/components/form/PostForm';
import PostItem from '@/components/PostItem';
import Loading from '@/app/loading';
import getCurrentUser from '@/lib/session';
import prisma from '@/lib/prisma';



const Posts = async () => {
  const posts = await prisma.post.findMany({orderBy:{id:'desc'},include:{author:true}})
  if (!posts) {
    return <Loading />;
  }
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 bg-white">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold">Posts</h2>
          <PostForm />
        </header>
        <section className="grid grid-cols-3 gap-5 mx-auto ">
          {posts ? (
            posts.map((post, index) => {
              return <PostItem key={index} />;
            })
          ) : (
            <div>Aucun post</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Posts