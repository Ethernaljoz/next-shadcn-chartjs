import React from "react";
import faker from "faker";
import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";
import BarChart from "./charts/BarChart";
import DoughnutChart from "./charts/DoughnutChart";

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
        display: false,
        text: "Chart.js Chart",
      },
    },
  };

  const labels = ["TodoLists", "Posts", "Blogs"];



  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: tab,
        backgroundColor: [
          "rgba(43, 63, 228,0.8)",
          "rgba(250, 192, 19,0.8)",
          "rgba(253, 135, 135,0.8)",

        ],
      },
    ],
  };

  return (
    <div className="mt-10 border rounded-lg shadow-sm mb-10">
      <div className="h-72 w-full flex justify-between py-5 px-6 ">
        <BarChart options={options} data={data} />
        <DoughnutChart options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartComponent;
