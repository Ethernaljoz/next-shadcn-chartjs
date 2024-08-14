"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface doughnutType {
  options: optionType;
  data: dataType;
}
interface optionType {
  responsive: boolean;
  plugins: {
    legend: {
      position: "top";
    };
    title: {
      display: boolean;
      text: string;
    };
  };
}

interface dataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

const DoughnutChart = ({ options, data }: doughnutType) => {
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
