import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconSettings from '../../components/Icon/IconSettings';
import Tippy from '@tippyjs/react';
import IconXCircle from '../../components/Icon/IconXCircle';
import TalentShow from './TalentShow';
import DataTable from 'react-data-table-component';
import IconEye from '../../components/Icon/IconEye';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_EVENTS_URL, MY_HOLIDAYS_URL, MY_NOTICES_URL } from './query';
import moment from 'moment';
import { Transition, Dialog } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { FaEye } from 'react-icons/fa6';

interface RowData {
    _id: any;
    date: string;
    title: string;
    notice: string;
}

interface EventsData {
    fdate: string;
    tdate: string;
    title: string;
}

interface HolidayData {
    fdate: string;
    tdate: string;
    title: string;
    holidayID: string;
}

const Tabs = () => {
    const [Notices, setNotices] = useState(true);
    const [Events, setEvents] = useState(false);
    const [Holidays, setHolidays] = useState(false);
    const [data, setData] = useState<RowData[]>([]);
    const [filter, setFilter] = useState<RowData[]>([]);
    const [datapast, setDatapast] = useState<RowData[]>([]);
    const [filterpast, setFilterpast] = useState<RowData[]>([]);
    const [dataEvents, setDataEvents] = useState<EventsData[]>([]);
    const [filterEvents, setFilterEvents] = useState<EventsData[]>([]);
    const [dataHoliday, setDataHoliday] = useState<HolidayData[]>([]);
    const [filterHoliday, setFilterHoliday] = useState<HolidayData[]>([]);
    const [modalNotice, setmodalNotice] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', notice: '' });

    const currentPage = 1; // Current page number
    const rowsPerPage = 10;

    useEffect(() => {
        if (Events) {
            const fetchEventsData = async () => {
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
                    const response = await axios.post(MY_EVENTS_URL, postData, {
                        headers: headers,
                    });

                    console.log('Events', response);
                    setDataEvents(response.data.data.events);
                    setFilterEvents(response.data.data.events);
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
            fetchEventsData();
        }
    }, [Events]);
    useEffect(() => {
        if (Holidays) {
            const fetchHolidaysData = async () => {
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
                    const response = await axios.post(MY_HOLIDAYS_URL, postData, {
                        headers: headers,
                    });

                    console.log('Holidays', response);
                    setDataHoliday(response.data.data.holidays);
                    setFilterHoliday(response.data.data.holidays);
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
            fetchHolidaysData();
        }
    }, [Holidays]);
    const columns: any = [
        {
            name: '#',
            selector: (row: RowData, index: number) => index + 1,
        },
        {
            name: 'DATE',
            selector: (row: RowData) => formatDate(row.date),
        },
        {
            name: 'TITLE',
            selector: (row: RowData) => row.title,
        },

        {
            name: 'Action',
            cell: (row: any) => (
                <button className="border border-blue-400 bg-blue-400 p-2 text-white rounded-md" onClick={() => handlecoledit(row)}>
                    <FaEye />
                </button>
            ),
        },
    ];
    const columnspast: any = [
        {
            name: '#',
            selector: (row: RowData, index: number) => index + 1,
        },
        {
            name: 'DATE',
            selector: (row: RowData) => formatDate(row.date),
        },
        {
            name: 'TITLE',
            selector: (row: RowData) => row.title,
        },

        {
            name: 'Action',
            cell: (row: any) => (
                <button className="border border-blue-400 bg-blue-400 p-2 text-white rounded-md" onClick={() => handlecoledit(row)}>
                    <FaEye />
                </button>
            ),
        },
    ];
    const columnsevents: any = [
        {
            name: '#',
            selector: (row: EventsData, index: number) => index + 1,
        },
        {
            name: 'DATE',
            selector: (row: EventsData) => `${formatDate(row.fdate)} - ${formatDate(row.tdate)}`,
        },
        {
            name: 'TITLE',
            selector: (row: EventsData) => row.title,
        },

        {
            name: 'DETAILS',
            cell: (row: any) => (
                <button className="border border-blue-400 bg-blue-400 p-2 text-white rounded-md" onClick={() => handlecoledit(row)}>
                    <FaEye />
                </button>
            ),
        },
    ];

    const columnsholiday: any = [
        {
            name: '#',
            selector: (row: HolidayData, index: number) => index + 1,
        },
        {
            name: 'TITLE',
            selector: (row: HolidayData) => row.title,
        },
        {
            name: 'DATE',
            selector: (row: HolidayData) => `${formatDate(row.fdate)} - ${formatDate(row.tdate)}`,
        },

        {
            name: 'Action',
            cell: (row: any) => (
                <button className="border border-blue-400 bg-blue-400 p-2 text-white rounded-md" onClick={() => handlecoledit(row)}>
                    <FaEye />
                </button>
            ),
        },
    ];

    function formatDate(date: any): string {
        if (!date || typeof date !== 'string') return 'Invalid Date';
        const formattedDate = moment(date).format('DD:MM:YYYY'); // Using Moment.js to format the date
        return formattedDate;
    }

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#ccc',
            },
        },
    };

    const handlecoledit = async (row: any) => {
        setModalContent({ title: row.title, notice: row.notice });
        setmodalNotice(true);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });

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
                const response = await axios.post(MY_NOTICES_URL, postData, {
                    headers: headers,
                });

                console.log('Notices', response.data.data.notices);
                setData(response.data.data.notices);
                setFilter(response.data.data.notices);
                console.log('Past Notices', response.data.data.pastnotices);
                setDatapast(response.data.data.pastnotices);
                setFilterpast(response.data.data.pastnotices);

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
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState();
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    // useEffect(() => {
    //     const from = (page - 1) * pageSize;
    //     const to = from + pageSize;
    //     setRecordsData([...initialRecords.slice(from, to)]);
    // }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return rowData.filter((item) => {
    //             return item.id.toString().includes(search.toLowerCase());
    //             //item.action.toLowerCase().includes(search.toLowerCase()) ||
    //             // item.status.toLowerCase().includes(search.toLowerCase()) ||
    //             //item.type.toLowerCase().includes(search.toLowerCase()) ||
    //             //item.started.toLowerCase().includes(search.toLowerCase())
    //         });
    //     });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search]);

    const handleNotices = () => {
        setNotices(true);
        setEvents(false);
        setHolidays(false);
    };
    const handleEvents = () => {
        setNotices(false);
        setEvents(true);
        setHolidays(false);
    };
    const handleHolidays = () => {
        setNotices(false);
        setEvents(false);
        setHolidays(true);
    };

    return (
        <div>
            <h2 className="font-bold text-lg">Announcements</h2>
            {Notices ? (
                <>
                    <div className="space-y-8 pt-5">
                        <div className="panel" id="icon">
                            <div className="mb-5 flex items-center justify-between border-b-2 pb-6">
                                <h5 className="text-lg font-bold dark:text-white-light">Notices</h5>
                                <div className="flex justify-end space-x-2">
                                    <div>
                                        <button onClick={handleHolidays} className="bg-white text-[#f64e60] p-2 rounded-md hover:shadow-lg hover:bg-[#f64e60] hover:text-white border-[#f64e60] border">
                                            Holidays
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={handleEvents} className="bg-white text-[#ffa800] p-2 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
                                            Events
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <Tab.Group>
                                    <Tab.List className="mt-3 mr-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger border-b-white`}
                                                >
                                                    Upcoming Notices
                                                </button>
                                            )}
                                        </Tab>
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
                                                >
                                                    Past Notices
                                                </button>
                                            )}
                                        </Tab>
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <div className="space-y-6">
                                                {/* Skin: Striped  */}
                                                <div className="panel">
                                                    <div className="datatables">
                                                        <DataTable
                                                            customStyles={tableHeaderstyle}
                                                            columns={columns}
                                                            data={filter}
                                                            pagination
                                                            fixedHeader
                                                            selectableRowsHighlight
                                                            highlightOnHover
                                                            subHeader
                                                            striped
                                                            subHeaderComponent={
                                                                <input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="space-y-6">
                                                {/* Skin: Striped  */}
                                                <div className="panel">
                                                    <div className="datatables">
                                                        <DataTable
                                                            customStyles={tableHeaderstyle}
                                                            columns={columnspast}
                                                            data={filterpast}
                                                            pagination
                                                            fixedHeader
                                                            highlightOnHover
                                                            subHeader
                                                            striped
                                                            subHeaderComponent={
                                                                <input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>

                                        <Tab.Panel>Disabled</Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {Holidays ? (
                <>
                    <div className="space-y-8 pt-5">
                        <div className="panel" id="icon">
                            <div className="mb-5 flex items-center justify-between border-b-2 pb-6">
                                <h5 className="text-lg font-bold dark:text-white-light">Holidays</h5>
                                <div className="flex justify-end space-x-2">
                                    <div>
                                        <button onClick={handleNotices} className="bg-white text-[#6993ff] p-2 rounded-md hover:bg-[#6993ff] hover:text-white border-[#6993ff] border">
                                            Notices
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={handleEvents} className="bg-white text-[#ffa800] p-2 rounded-md hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
                                            Events
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-6">
                                    {/* Skin: Striped  */}
                                    <div className="panel">
                                        <div className="datatables">
                                            <DataTable
                                                customStyles={tableHeaderstyle}
                                                columns={columnsholiday}
                                                data={filterHoliday}
                                                pagination
                                                fixedHeader
                                                highlightOnHover
                                                subHeader
                                                striped
                                                subHeaderComponent={
                                                    <input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {Events ? (
                <>
                    <div className="space-y-8 pt-5">
                        <div className="panel" id="icon">
                            <div className="mb-5 flex items-center justify-between border-b-2 pb-6">
                                <h5 className="text-lg font-bold dark:text-white-light">Events</h5>
                                <div className="flex justify-end space-x-2">
                                    <div>
                                        <button onClick={handleHolidays} className="bg-white text-[#f64e60] p-2 rounded-md hover:bg-[#f64e60] hover:text-white border-[#f64e60] border">
                                            Holidays
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={handleNotices} className="bg-white text-[#6993ff] p-2 rounded-md hover:bg-[#6993ff] hover:text-white border-[#6993ff] border">
                                            Notices
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-6">
                                    {/* Skin: Striped  */}
                                    <div className="panel">
                                        <div className="datatables">
                                            <DataTable
                                                customStyles={tableHeaderstyle}
                                                columns={columnsevents}
                                                data={filterEvents}
                                                pagination
                                                fixedHeader
                                                highlightOnHover
                                                subHeader
                                                striped
                                                subHeaderComponent={
                                                    <input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <Transition appear show={modalNotice} as={Fragment}>
                <Dialog as="div" open={modalNotice} onClose={() => setmodalNotice(false)} className="sm:w-[300px] w-[100px]">
                    <Transition.Child as={Fragment} enter="ease-out duration-10" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/20">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-md font-bold">
                                        {Notices && modalContent.title} {Events && 'Event Details'} {Holidays && 'Holiday Details'}
                                    </h5>
                                    <button onClick={() => setmodalNotice(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between  bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-sm ">
                                        {Notices && modalContent.notice}
                                        {Events && (
                                            <>
                                                <div className="panel lg:col-span-2 xl:col-span-3">
                                                    <div className="mb-5">
                                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                            <table className="whitespace-nowrap">
                                                                <thead>
                                                                    <tr></tr>
                                                                </thead>
                                                                <tbody className="dark:text-white-dark border-1.5 w-screen">
                                                                    <tr>
                                                                        <td className="w-screen">Title</td>
                                                                        <td className="w-[800px]">:</td>
                                                                        <td>Ramesh</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Event Date</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td>Rani</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Time</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td>21-11-2023</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Details</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {Holidays && (
                                            <>
                                                <div className="panel lg:col-span-2 xl:col-span-3">
                                                    <div className="mb-5">
                                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                            <table className="whitespace-nowrap">
                                                                <thead>
                                                                    <tr></tr>
                                                                </thead>
                                                                <tbody className="dark:text-white-dark border-1.5 w-screen">
                                                                    <tr>
                                                                        <td className="w-screen">Title</td>
                                                                        <td className="w-[800px]">:</td>
                                                                        <td>Ramesh</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Event Date</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td>Rani</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Time</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td>21-11-2023</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Details</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </h5>
                                </div>
                                <div className="flex justify-end items-end m-4 ">
                                    <button className="p-2 bg-gray-300 rounded-md" onClick={() => setmodalNotice(false)}>
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Tabs;
