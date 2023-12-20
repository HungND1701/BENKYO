import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
export default function BarChart({dates, learned, learning, notlearn}){

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const labels = dates;

    const options = {
        plugins: {
          title: {
            display: false,
          },
          legend:{
            position: 'bottom',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
    };

    const data = {
        labels,
        datasets: [
          {
            label: 'Chưa học',
            data: notlearn,
            backgroundColor: 'rgb(53, 162, 235)',
          },
          {
            label: 'Đang học',
            data: learning,
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Đã học',
            data: learned,
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
    };

    return <Bar options={options} data={data} />;
}