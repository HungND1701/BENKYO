import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function PieChart({learned, learning, notlearn}){
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['Đã học', 'Đang học', 'Chưa học'],
        datasets: [
          {
            label: 'Số từ',
            data: [learned, learning, notlearn],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom', // Position the legend at the bottom
            },
        },
    };

    return <Pie data={data} options={options} />;
}