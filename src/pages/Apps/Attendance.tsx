import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import ReactApexChart from 'react-apexcharts';
import { setPageTitle } from '../../store/themeConfigSlice';
import { MY_ATTENDANCE_URL } from './query';
import axios from 'axios';
import Swal from 'sweetalert2';

const Charts = () => {
    const dispatch = useDispatch();
    const [attendance, setAttendance] = useState<any>([]);
    const [loading] = useState(false);
    const [monthAttendance, setmonthAttendance] = useState<any>([]);
    const [monthYears, setMonthYears] = useState<any>([]);
    const [monthWiseAtt, setMonthWiseAtt] = useState<any>([]);
    const [present, setPresent] = useState(0);
    const [absent, setAbsent] = useState(0);
    const [hp, setHp] = useState(0);
    const [hd, setHd] = useState(0);
    const [late, setLate] = useState(0);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,
                    on_dash: 0,
                };
                const response = await axios.post(MY_ATTENDANCE_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setAttendance(response.data.data.attendance);
                    setMonthYears(response.data.data.monthYear);
                    setMonthWiseAtt(response.data.data.atdmonthwise);
                    if (response.data.data.attendance) {
                        const present = response.data.data.attendance[0].data;
                        const absent = response.data.data.attendance[2].data;
                        const halfday = response.data.data.attendance[1].data;
                        const late = response.data.data.attendance[3].data;
                        const holiday = response.data.data.attendance[4].data;
                        const ptotal = present.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
                        const atotal = absent.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
                        const hptotal = halfday.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
                        const hdtotal = holiday.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
                        const ltotal = late.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
                        setPresent(ptotal);
                        setAbsent(atotal);
                        setHd(hdtotal);
                        setHp(hptotal);
                        setLate(ltotal);

                        console.log('ptotal', ptotal);
                        console.log('atotal', atotal);
                        console.log('hptotal', hptotal);
                        console.log('hdtotal', hdtotal);
                        console.log('ltotal', ltotal);
                    }
                }

                console.log('attendance', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

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

    const salesByCategory: any = {
        series: [present, absent, hp, late],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f', '#2fbec0', '#c02f3f', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a', '#8dc02f', '#ea041d'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: '',
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Present', 'Absent', 'HalfDay Present', 'Came Late'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    const columnChart: any = {
        series: attendance,
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
            colors: ['#805dca', '#e7515a', '#4682b4', '#191970', '#000039'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 0.5,
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
                categories: monthYears,
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

    // function countOccurrences(obj: any) {
    //     let pCount = 0;
    //     let hdCount = 0;
    //     let lCount = 0;
    //     let olCount = 0;

    //     for (let key in obj) {
    //         if (obj.hasOwnProperty(key) && key.startsWith('a')) {
    //             if (obj[key] === 'P') {
    //                 pCount++;
    //             } else if (obj[key] === 'HD') {
    //                 hdCount++;
    //             } else if (obj[key] === 'L') {
    //                 lCount++;
    //             } else if (obj[key] === 'OL') {
    //                 olCount++;
    //             }
    //         }
    //     }

    //     return { P: pCount, HD: hdCount, L: lCount, OL: olCount };
    // }

    // // Loop through the array and count occurrences for each object
    // attendance.forEach((obj: any, index: any) => {
    //     const counts = countOccurrences(obj);

    //     console.log(`Object ${index + 1}:`, counts);
    // });

    return (
        <div>
            <h2 className="font-bold text-lg mb-6">Attendance</h2>
            <div className="panel">
                <div className="border-b mb-16 pb-8 flex justify-between items-center">
                    <h2 className="font-bold text-base whitespace-nowrap">Academics Year {localStorage.schoolyear}</h2>
                    {/* <div className="flex justify-end">
                        <div className="ml-4 bg-blue-600 text-white p-1 rounded-md">Working Days:176</div>
                        <div className="ml-4 bg-green-500 text-white p-1 rounded-md">Present:139.5</div>
                        <div className="ml-4 bg-red-600 text-white p-1 rounded-md">Absent:19.5</div>
                    </div> */}
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <div className="panel h-full ">
                            <div className="flex items-center mb-4">
                                <h5 className="font-semibold text-lg dark:text-white-light">Attendance Summary</h5>
                            </div>
                            <div>
                                <div className="bg-white dark:bg-black rounded-lg ">
                                    {loading ? (
                                        <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                        </div>
                                    ) : (
                                        <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
            </div>

            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {monthWiseAtt.map((attd: any) => (
                    <div className="panel h-full">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">{attd.month}</h5>
                        </div>
                        <div>
                            <div className="space-y-2">
                                <div className="flex bg-gray-100 p-2 ">
                                    <div className="px-3 flex-1">
                                        <div>Present</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">{attd.p}</span>
                                </div>
                                <div className="flex bg-gray-100 p-2 ">
                                    <div className="px-3 flex-1">
                                        <div>Half Day Present</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">{attd.hp}</span>
                                </div>
                                <div className="flex bg-gray-100 p-2 ">
                                    <div className="px-3 flex-1">
                                        <div>Absent</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">{attd.A}</span>
                                </div>
                                <div className="flex bg-gray-100 p-2 ">
                                    <div className="px-3 flex-1">
                                        <div>On Leave</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">{attd.ol}</span>
                                </div>
                                <div className="flex bg-gray-100 p-2 ">
                                    <div className="px-3 flex-1">
                                        <div>Holiday</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">{attd.hd}</span>
                                </div>
                                <div className="flex bg-gray-100 p-2 ">
                                    <div className="px-3 flex-1">
                                        <div>Came Late </div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">{attd.l}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Charts;
