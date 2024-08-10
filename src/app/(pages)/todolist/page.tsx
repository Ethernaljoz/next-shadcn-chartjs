import Loading from "@/app/loading";
import Task from "@/components/Task";
import TodoForm from "@/components/form/TodoForm";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import React from "react";

// isCompleted={false}

const TodoList = async () => {
  const currentUser = await getCurrentUser();
  const todos = await prisma.todo.findMany({ orderBy: { id: "desc" } });
  // const todos = await prisma.todo.findMany({orderBy:{id:'desc'},include:{author:true}})
  if (!todos) {
    return <Loading />;
  }
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 bg-white">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold">Todos</h2>
          <TodoForm />
        </header>
        <section className="flex flex-col gap-3 mx-auto max-w-3xl">
          {todos ? (
            todos.map((todo) => {
              return !todo.isComplete &&
                todo.authorEmail === currentUser?.email ? (
                <Task key={todo.id} todo={todo} />
              ) : (
                ""
              );
            })
          ) : (
            <div>Aucun todo</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default TodoList;
