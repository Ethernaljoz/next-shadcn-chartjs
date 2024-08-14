import Loading from "@/app/loading";
import Task from "@/components/Task";
import TodoForm from "@/components/form/TodoForm";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import React from "react";

const TodoList = async () => {
  const currentUser = await getCurrentUser();
  let todos;
  let userTodos;
  if (currentUser?.email) {
    todos = await prisma.todo.findMany({
      where: { authorEmail: currentUser!.email },
      orderBy: { id: "desc" },
    });
    if (todos) {
      userTodos = todos.filter((todo) => {
        todo.isComplete === false;
      });
    }
    // todos=userTodos

    if (!todos) {
      return <Loading />;
    }
  }

  // const userTodo = todos
  //   ? todos.filter((todo) => {
  //     todo.isComplete === false
  //     })
  //   : null;

  console.log("user todo", userTodos);
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

// {
//   todos ? (
//     todos.map((todo) => {
//       return !todo.isComplete && todo.authorEmail === currentUser?.email ? (
//         <Task key={todo.id} todo={todo} />
//       ) : (
//         ""
//       );
//     })
//   ) : (
//     <div>Aucun todo</div>
//   );
// }
