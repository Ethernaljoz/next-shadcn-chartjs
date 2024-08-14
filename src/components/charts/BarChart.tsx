"use client";
import React from 'react'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface barType {
    options:optionType,
    data:dataType
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

const BarChart = ({options, data}:barType) => {
  return (
     <Bar options={options} data={data} />

  )
}

export default BarChart