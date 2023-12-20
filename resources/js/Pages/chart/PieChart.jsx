import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function PieChart({learned, learning, notlearn}){
    ChartJS.register(ArcElement, Tooltip, Legend);
    const noData = !learned && !learning && !notlearn;
    if(noData){
      const data1 = {

      }
      return (
        <div>
            <div id='div1' style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '300px', 
                height: '300px', 
                borderRadius: '50%', 
                backgroundColor: '#ccc' 
            }}>
                Không có dữ liệu
            </div>
        </div>
      );
    }
    else{
      const data = {
        labels: ['Đã học', 'Đang học', 'Chưa học'],
        datasets: [
          {
            label: 'Số từ',
            data: [10, 20, 30],
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

    return <Doughnut data={data} options={options} />;
}