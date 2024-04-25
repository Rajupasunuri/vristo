import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconDollarSign from '../components/Icon/IconDollarSign';
import IconInbox from '../components/Icon/IconInbox';
import IconTag from '../components/Icon/IconTag';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconShoppingCart from '../components/Icon/IconShoppingCart';
import IconArrowLeft from '../components/Icon/IconArrowLeft';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
import IconUser from '../components/Icon/IconUser';
import IconNetflix from '../components/Icon/IconNetflix';
import IconBolt from '../components/Icon/IconBolt';
import IconCaretDown from '../components/Icon/IconCaretDown';
import IconPlus from '../components/Icon/IconPlus';
import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight';
import { ToastContainer, toast } from 'react-toastify';
import IconBook from '../components/Icon/IconBook';
import IconPencilPaper from '../components/Icon/IconPencilPaper';
import IconNotesEdit from '../components/Icon/IconNotesEdit';
import IconNotes from '../components/Icon/IconNotes';
import IconBookmark from '../components/Icon/IconBookmark';
import IconOpenBook from '../components/Icon/IconOpenBook';
import IconLaptop from '../components/Icon/IconLaptop';
import IconPencil from '../components/Icon/IconPencil';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import IconEye from '../components/Icon/IconEye';
import IconXCircle from '../components/Icon/IconXCircle';
import { FaRupeeSign, FaBookReader, FaBook, FaLaptop } from 'react-icons/fa';
import { MdHomeWork } from 'react-icons/md';
import { FaPenToSquare } from 'react-icons/fa6';
import { MY_DASHBOARD_URL } from './Apps/query';
import axios from 'axios';

const rowData = [
    {
        id: 1,
        examtitle: '7th Physics',
        action: <button></button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Date Expired</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        duration: '00:45',
        subject: 'Physics',
        examdate: '14 Oct 2023',
        time: '10:30AM-10:50AM',
        question: '15',
        marks: '15',
    },
    {
        id: 2,
        action: <button></button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: '7th Maths',
        duration: '00:45',
        subject: 'Maths',
        examdate: '14 Oct 2023',
        time: '10:51AM-11:11AM',
        question: '10',
        marks: '10',
    },
];

const rowData2 = [
    {
        id: 1,
        action: <button className="bg-blue-900 px-4 py-1 rounded-md text-white">Expired</button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: 39,
        validfrom: '15 NOV 2023',
        validto: '28 NOV 2023',
        duration: '00:45',
    },
    {
        id: 2,
        action: <button className="bg-blue-900 px-4 py-1 rounded-md text-white">Expired</button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: 39,
        validfrom: '15 NOV 2023',
        validto: '28 NOV 2023',
        duration: '00:45',
    },
    {
        id: 3,
        action: <button className="bg-blue-900 px-4 py-1 rounded-md text-white">Expired</button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: 39,
        validfrom: '15 NOV 2023',
        validto: '28 NOV 2023',
        duration: '00:45',
    },
];

const Index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);

    const PAGE_SIZES2 = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES2[0]);
    const [initialRecords2, setInitialRecords2] = useState(rowData2);
    const [recordsData2, setRecordsData2] = useState(initialRecords2);
    const [rowData, setrowData] = useState([]);

    const [search2, setSearch2] = useState('');

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

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
                    sectionID: localStorage.sectionID,
                    classesID: localStorage.classesID,
                    schoolyearID: localStorage.schoolyearID,
                };
                const response = await axios.post(MY_DASHBOARD_URL, postData, {
                    headers: headers,
                });
                //const res = JSON.parse(response.data.data.invoices[0].comps);

                if (!response.data.error) {
                    setrowData(response.data.data.invoices);
                }

                console.log('dashboard', response.data.data.invoices);
                // if (response.data.error) {
                //     // setUsererror(response.data.message);
                // } else {
                //     const profiledtls = response.data.data;
                //     console.log('profiledtls:', profiledtls);

                //     // setProfile(profiledtls);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        setInitialRecords2(() => {
            return rowData2.filter((item) => {
                return (
                    item.id.toString().includes(search2.toLowerCase()) ||
                    //item.action.toLowerCase().includes(search.toLowerCase()) ||
                    // item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.type.toLowerCase().includes(search.toLowerCase()) ||
                    item.started.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search2]);

    const PAGE_SIZES1 = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page1, setPage1] = useState(1);
    const [pageSize1, setPageSize1] = useState(PAGE_SIZES1[0]);
    const [initialRecords1, setInitialRecords1] = useState(rowData);
    const [recordsData, setRecordsData] = useState(initialRecords1);

    const [search1, setSearch1] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize1]);

    useEffect(() => {
        const from = (page1 - 1) * pageSize1;
        const to = from + pageSize1;
        setRecordsData([...initialRecords1.slice(from, to)]);
    }, [page1, pageSize1, initialRecords1]);

    useEffect(() => {
        setInitialRecords1(() => {
            return rowData.filter((item) => {
                return (
                    //item.id.toString().includes(search1.toLowerCase())
                    //item.action.toLowerCase().includes(search.toLowerCase())
                    // item.status.toLowerCase().includes(search.toLowerCase()) ||
                    // item.examtitle.toLowerCase().includes(search1.toLowerCase()) ||
                    //item.subject.toLowerCase().includes(search1.toLowerCase())
                    <></>
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search1]);
    useEffect(() => {
        console.log('jhjdhj', isLoggedinuser);
        if (!isLoggedinuser) {
            navigate('/');
            console.log('isloggedin dashboard', isLoggedinuser);
        }
        toast.success('Logged in Successfully');
    }, []);
    dispatch(setPageTitle('Sales Admin'));
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    // useEffect(() => {
    //     dispatch(setPageTitle('Invoice List'));
    // });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            feeamount: '2275.45',
            feetype: '3rd Term',

            discount: '',
            afterdiscount: '',
            date: '15 Dec 2020',
            amount: '2275.45',
            status: { tooltip: 'Paid', color: 'success' },
            profile: 'profile-1.jpeg',
            paid: '',
        },
        {
            id: 2,
            invoice: '081452',
            feeamount: '2275.45',
            feetype: '2nd Term',

            discount: '',
            afterdiscount: '',
            date: '20 Dec 2020',
            amount: '1044.00',
            status: { tooltip: 'Paid', color: 'success' },
            profile: 'profile-1.jpeg',
            paid: '',
        },
        {
            id: 3,
            invoice: '081681',
            feeamount: '2275.45',
            feetype: '1st Term',
            discount: '',
            afterdiscount: '',
            date: '27 Dec 2020',
            amount: '20.00',
            status: { tooltip: 'Pending', color: 'danger' },
            profile: 'profile-1.jpeg',
            paid: '',
        },
    ]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.feetype.toLowerCase().includes(search.toLowerCase()) ||
                    item.discount.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Total Working Days',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Total Present Days',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
            {
                name: 'Total Absent Days',
                data: [17500, 17500, 17200, 17800, 19000, 18500, 17000, 17000, 16000, 19000, 18900, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    //Sales By Category
    const salesByCategory: any = {
        series: [985, 737, 270],
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
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
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
            labels: ['Total Fee', 'Balance Fee', 'Fee Paid'],
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

    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: 'Last Week',
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format the date as per the browser's locale
    };

    return (
        <div>
            <div className="pt-5">
                <div className="grid sm:grid-cols-2 xl:grid-cols-6 grid-cols-2 gap-6 mb-6">
                    <Link to="/preview">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            {/* <IconDollarSign className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " /> */}
                            <FaRupeeSign className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500">PayFee</p>
                        </div>
                    </Link>

                    <Link to="/knowledge-bank">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y2 ">
                            <FaBookReader className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500">Knowledge Bank</p>
                        </div>
                    </Link>
                    <Link to="/assignments">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <MdHomeWork className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500">Home Work</p>
                        </div>
                    </Link>
                    <Link to="/diary">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2 ">
                            <FaBook className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500">Diary</p>
                        </div>
                    </Link>
                    <Link to="/online-exam">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <FaLaptop className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500">Online Exam</p>
                        </div>
                    </Link>
                    <Link to="/offline-exam">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <FaPenToSquare className="text-blue-500 sm:w-12 sm:h-12 w-8 h-8  " />
                            <p className="text-blue-500">Offline Exam</p>
                        </div>
                    </Link>
                </div>
                <div className="grid xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Fees Summary</h5>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
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
                    <div className="panel h-full xl:col-span-2">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Attendance</h5>
                        </div>

                        <div className="relative">
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer position="top-center" autoClose={2000} /> */}
            <div className="space-y-4">
                <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                    <div className="invoice-table">
                        <div className="mb-4.5 px-5 flex justify-between items-center ite md:items-center md:flex-row flex-col gap-5">
                            <div>
                                <p className="font-semibold text-lg dark:text-white-light">Invoice to be paid</p>
                            </div>
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>

                        <div className="datatables pagination-padding">
                            <DataTable
                                className="whitespace-nowrap table-hover invoice-table"
                                records={rowData}
                                columns={[
                                    // {
                                    //     accessor: 'id',
                                    //     title: 'SL.NO',
                                    // },
                                    {
                                        accessor: 'invoiceID',

                                        render: ({ invoiceID }) => (
                                            <NavLink to="/apps/invoice/preview">
                                                <div className="text-primary underline hover:no-underline font-semibold">{`#${invoiceID}`}</div>
                                            </NavLink>
                                        ),
                                    },
                                    {
                                        accessor: 'feetype',
                                        title: 'FEE TYPE',
                                    },
                                    {
                                        accessor: 'amount',
                                        title: 'FEE AMOUNT',
                                    },
                                    {
                                        accessor: 'discount',
                                        title: 'Discount',
                                    },
                                    {
                                        accessor: 'afterdiscount',
                                        title: 'AfterDiscount',
                                    },
                                    {
                                        accessor: 'paid',
                                        title: 'Paid',
                                    },

                                    {
                                        accessor: 'due_amount',
                                        title: 'Due Amount',
                                        titleClassName: 'text-right',
                                        render: ({ due_amount, id }) => <div className="text-right font-semibold">{`Rs${due_amount}`}</div>,
                                    },
                                    {
                                        accessor: 'paidstatus',
                                        title: 'Status',

                                        //render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                                    },
                                    {
                                        accessor: 'due_date',
                                        title: 'Due Date',
                                        render: ({ due_date }) => <span>{formatDate(due_date)}</span>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Actions',
                                        sortable: false,
                                        textAlignment: 'center',
                                        // render: ({ id, status: rowStatus }) => (
                                        //     <div className="flex gap-4 items-center w-max mx-auto">
                                        //         <Tippy className="bg-black text-white" content={rowStatus.tooltip === 'Paid' ? 'View' : 'Pay Now'}>
                                        //             <NavLink to="/preview" className="flex hover:text-primary">
                                        //                 <IconEye />
                                        //             </NavLink>
                                        //         </Tippy>
                                        //         {/* <NavLink to="" className="flex"> */}

                                        //         {/* </NavLink> */}
                                        //     </div>
                                        // ),
                                    },
                                ]}
                                highlightOnHover
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                selectedRecords={selectedRecords}
                                onSelectedRecordsChange={setSelectedRecords}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
                {/* online exam */}
                <div className="space-y-6">
                    {/* Skin: Striped  */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Online Exams</h5>
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search1} onChange={(e) => setSearch1(e.target.value)} />
                        </div>
                        <div className="datatables">
                            <DataTable
                                striped
                                className="whitespace-nowrap table-striped"
                                records={recordsData}
                                columns={[
                                    { accessor: 'id', title: '#' },
                                    { accessor: 'examtitle', title: 'EXAM TITLE' },
                                    { accessor: 'subject', title: 'SUBJECT' },
                                    { accessor: 'examdate', title: 'EXAM DATE' },
                                    { accessor: 'duration', title: 'DURATION' },
                                    { accessor: 'time', title: 'TIME' },
                                    { accessor: 'question', title: 'QUESTIONS' },
                                    { accessor: 'marks', title: 'MARKS' },
                                    { accessor: 'status', title: 'STATUS' },
                                    {
                                        accessor: 'action',
                                        title: 'ACTION',
                                        render: () => (
                                            <div className="flex items-center w-max mx-auto">
                                                <Tippy content="Delete">
                                                    <button type="button" onClick={() => alert('hello')}>
                                                        <IconXCircle />
                                                    </button>
                                                </Tippy>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={initialRecords1.length}
                                recordsPerPage={pageSize1}
                                page={page1}
                                onPageChange={(p) => setPage1(p)}
                                recordsPerPageOptions={PAGE_SIZES1}
                                onRecordsPerPageChange={setPageSize1}
                                minHeight={200}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    {/* Skin: Striped  */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Talent Show Exams</h5>
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="datatables">
                            <DataTable
                                striped
                                className="whitespace-nowrap table-striped"
                                records={recordsData}
                                columns={[
                                    { accessor: 'id', title: '#' },
                                    { accessor: 'action', title: 'ACTION' },
                                    { accessor: 'status', title: 'STATUS' },
                                    { accessor: 'type', title: 'TYPE' },
                                    { accessor: 'phone', title: 'STARTED' },
                                    { accessor: 'finished', title: 'FINISHED' },
                                    { accessor: 'examtitle', title: 'EXAM TITLE' },
                                    { accessor: 'validfrom', title: 'VALID FROM' },
                                    { accessor: 'validto', title: 'VALID TO' },
                                    { accessor: 'duration', title: 'DURATION HH:MM' },
                                ]}
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                minHeight={200}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
