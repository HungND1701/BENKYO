import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LineChart from './chart/LineChart';
import PieChart from './chart/PieChart';
import BarChart from './chart/BarChart';
import { Inertia } from '@inertiajs/inertia'
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard({ auth, ...props }) {
    const [dates, setDates] = useState(props.dates)
    console.log(props)
    const [amounts, setAmounts] = useState(props.amounts)
    const amount_day_filled = dates.map(date => {
        const amount = amounts.find(amount => amount.date === date);
        return amount ? parseInt(amount.total_learned_amount) + parseInt(amount.total_learning_amount) : 0;
    });
    const totalLearnedAmount = amounts.reduce((sum, amount) => sum + parseInt(amount.total_learned_amount), 0);
    const totalLearningAmount = amounts.reduce((sum, amount) => sum + parseInt(amount.total_learning_amount), 0);
    const totalNotLearnAmount = amounts.reduce((sum, amount) => sum + parseInt(amount.total_not_learn_amount), 0);

    const learnedAmounts = dates.map(date => {
        const amount = amounts.find(amount => amount.date === date);
        return amount ? parseInt(amount.total_learned_amount) : 0;
    });
    const learningAmounts = dates.map(date => {
        const amount = amounts.find(amount => amount.date === date);
        return amount ? parseInt(amount.total_learning_amount) : 0;
    });
    const notLearnAmounts = dates.map(date => {
        const amount = amounts.find(amount => amount.date === date);
        return amount ? parseInt(amount.total_not_learn_amount) : 0;
    });

    const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'days').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);

    const onChange = (date) => {
        if (date) {
          console.log('Date: ', date);
        } else {
          console.log('Clear');
        }
      };
      
      const onRangeChange = async (dates, dateStrings) => {
        setDateRange(dateStrings);
        const [startDate, endDate] = dates;
        const formattedStartDate = startDate.format('YYYY-MM-DD');
        const formattedEndDate = endDate.format('YYYY-MM-DD');
        if (dates) {
        axios.get(route('dashboard.getData', {startDate: formattedStartDate, endDate: formattedEndDate}))
            .then((response) => {
                console.log(response.data);
                setDates(response.data[0]);
                setAmounts(response.data[1]);
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
          console.log('Clear');
        }
      };
      const rangePresets = [
        {
          label: 'Last 7 Days',
          value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
          label: 'Last 14 Days',
          value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
          label: 'Last 30 Days',
          value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
          label: 'Last 90 Days',
          value: [dayjs().add(-90, 'd'), dayjs()],
        },
      ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="flex justify-between">
                <div className="h-[40vh] w-[80vw]">
                    <LineChart dates={dates} amounts={amount_day_filled}/>
                </div>
                <div className="h-[40vh] w-[40vw]">
                    <PieChart learned={totalLearnedAmount} learning={totalLearningAmount} notlearn={totalNotLearnAmount} />
                </div>
            </div>
            <hr />
            <div className="flex justify-between">
                <div className="h-[40vh] w-[80vw]">
                    <BarChart dates={dates} learned={learnedAmounts} learning={learningAmounts} notlearn={notLearnAmounts} />
                </div>
                <div className="h-[40vh] w-[40vw]">
                    <div className='h-[30vh] w-[40vw] border-solid border-2 border-indigo-600 mt-3'>
                        <p>Bạn đang trong chuỗi {dates.length} ngày liên tiếp</p>
                        <p>Trong khoảng {dateRange[0]} - {dateRange[1]}</p>
                        <p>Bạn đã học được {totalLearnedAmount + totalLearningAmount} từ</p>
                    </div>
                    <br />
                    <div>
                        <RangePicker
                            style={{ width: '100%', borderColor: 'blue' }}
                            defaultValue={[dayjs().subtract(7, 'days'), dayjs()]}
                            presets={[
                                {
                                label: <span aria-label="Current Time to End of Day">Now ~ EOD</span>,
                                value: () => [dayjs(), dayjs().endOf('day')], // 5.8.0+ support function
                                },
                                ...rangePresets,
                            ]}
                            showTime
                            format="YYYY/MM/DD"
                            onChange={onRangeChange}
                        />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
