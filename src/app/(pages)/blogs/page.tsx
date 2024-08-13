import Loading from '@/app/loading';
import BlogItem from '@/components/BlogItem';
import BlogForm from '@/components/form/BlogForm';
import prisma from '@/lib/prisma';
import React from 'react'


const Blogs = async() => {

    const blogs = await prisma.blog.findMany({
      orderBy: { id: "desc" },
    });
    
    if(!blogs){
      return <Loading />
    }
  return (
    <div className="flex h-screen ">
      <main className="flex-1 p-6 bg-white">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold">Blogs</h2>
          <BlogForm />
        </header>
        <section className="grid grid-cols-3 gap-5 mx-auto ">
          {blogs ? (blogs.map((blog,index) =>{
            return  <BlogItem key={index} blog={blog} /> 
          })) 
          :
          (<div>Aucun todo</div>)
          }
        </section>
      </main>
    </div>
  )
}

export default Blogs