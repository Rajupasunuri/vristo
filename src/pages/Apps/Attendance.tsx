import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import ReactApexChart from 'react-apexcharts';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';

const Charts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Charts'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const lineChart: any = {
        series: [
            {
                name: 'Sales',
                data: [45, 55, 75, 25, 45, 110],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'line',
                toolbar: false,
            },
            colors: ['#4361EE'],
            tooltip: {
                marker: false,
                y: {
                    formatter(number: number) {
                        return '$' + number;
                    },
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
        },
    };

    const columnChart: any = {
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
            {
                name: 'Raju',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca', '#e7515a'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
                y: {
                    formatter: function (val: any) {
                        return val;
                    },
                },
            },
        },
    };

    return (
        <div>
            <h2 className="font-bold text-lg mb-6">Attendance</h2>
            <div className="panel">
                <div className="border-b mb-16 pb-8 flex justify-between items-center">
                    <h2 className="font-bold text-base">Academics Year 2023-2024</h2>
                    <div className="flex justify-end">
                        <div className="ml-4 bg-blue-600 text-white p-1 rounded-md">Working Days:176</div>
                        <div className="ml-4 bg-green-500 text-white p-1 rounded-md">Present:139.5</div>
                        <div className="ml-4 bg-red-600 text-white p-1 rounded-md">Absent:19.5</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <div className="panel shadow-gray-600">
                            <div className="mb-5">
                                <ReactApexChart series={columnChart.series} options={columnChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="bar" height={300} />
                            </div>
                        </div>
                        <h2 className="flex justify-center items-center font-bold text-base m-4">Monthly Attendance</h2>
                    </div>
                    <div>
                        <div className="panel shadow-gray-600 ">
                            <div className="mb-5">
                                <ReactApexChart series={lineChart.series} options={lineChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="line" height={300} />
                            </div>
                        </div>
                        <h2 className="flex justify-center items-center font-bold text-base m-4">Attendance Percentage</h2>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <div>P - Present</div>
                    <div>HP - Half Day Present </div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
