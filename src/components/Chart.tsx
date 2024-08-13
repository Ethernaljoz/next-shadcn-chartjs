import React from "react";
import faker from "faker";
import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";
import BarChart from "./BarChart";

const labels = ["TodoLists", "Posts", "Blogs"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(23, 23, 23)",
    },
  ],
};
const ChartComponent = async () => {
  const currentUser = await getCurrentUser();
  let todos;
  let blogs;
  let posts;
  let tab
  tab=[0,0,0]
  if (currentUser?.email) {
    todos = await prisma.todo.findMany({
      where: { authorEmail: currentUser!.email },
      orderBy: { id: "desc" },
    });
    blogs = await prisma.blog.findMany({
      where: { authorEmail: currentUser!.email },
      orderBy: { id: "desc" },
    });
    posts = await prisma.post.findMany({
      where: { authorEmail: currentUser!.email },
      orderBy: { id: "desc" },
    });

    if (todos || posts || blogs) {
      tab = [todos?.length, posts?.length, blogs?.length];
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = ["TodoLists", "Posts", "Blogs"];



  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: tab,
        backgroundColor: "rgba(23, 23, 23)",
      },
    ],
  };

  return (
    <div>
      <h1>Bar chart</h1>
      <div className="h-60 w-full">
        <BarChart options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartComponent;
