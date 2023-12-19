import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function LineChart({dates, amounts}){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

      const labels = dates;

      const data = {
        labels,
        datasets: [
          {
            label: 'Số từ vựng',
            data: amounts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          }
        ],
      };

      const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Lượng từ học qua từng ngày',
            position: 'bottom'
          },
          legend:{
            display: false,
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          }
        },
      };
      
    return (
        <Line options={options} data={data} />
    );

}
