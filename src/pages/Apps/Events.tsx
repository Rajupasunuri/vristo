import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { MY_EVENTS_INFO_URL, MY_EVENTS_URL, MY_HOLIDAYS_INFO_URL, MY_HOLIDAYS_URL, MY_NOTICES_URL } from './query';
import moment from 'moment';
import { Transition, Dialog } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { FaEye } from 'react-icons/fa6';
import Swal from 'sweetalert2';

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
    const [Notices, setNotices] = useState(false);
    const [Events, setEvents] = useState(true);
    const [Holidays, setHolidays] = useState(false);
    const [dataNotices, setDataNotices] = useState<RowData[]>([]);
    const [filter, setFilter] = useState<RowData[]>([]);
    const [datapast, setDatapast] = useState<RowData[]>([]);
    const [filterpast, setFilterpast] = useState<RowData[]>([]);
    const [dataEvents, setDataEvents] = useState<EventsData[]>([]);
    const [filterEvents, setFilterEvents] = useState<EventsData[]>([]);
    const [dataHoliday, setDataHoliday] = useState<HolidayData[]>([]);
    const [filterHoliday, setFilterHoliday] = useState<HolidayData[]>([]);
    const [modalNotice, setmodalNotice] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', notice: '' });
    const [noticeDesc, setNoticeDesc] = useState('');
    const [noticeTitle, setNoticeTitle] = useState('');
    const [holyTitle, setHolyTitle] = useState('');
    const [holyDate, setHolyDate] = useState('');
    const [eventTDate, setEventTDate] = useState('');
    const [eventFDate, setEventFDate] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventTime, setEventTime] = useState('');

    const [eventID, setEventID] = useState('');
    const [holyID, setHolyID] = useState('');
    const [eventInfo, setEventInfo] = useState('');
    const [holyInfo, setHolyInfo] = useState('');

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

                    if (response.data.error) {
                        // Swal.fire('Request Failed, Try Again Later!');
                    } else {
                        setDataEvents(response.data.data.events);
                        setFilterEvents(response.data.data.events);
                    }

                    console.log('Events', response);
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

                    if (response.data.error) {
                        //Swal.fire('Request Failed, Try Again Later!');
                    } else {
                        setDataHoliday(response.data.data.holidays);
                        setFilterHoliday(response.data.data.holidays);
                    }

                    console.log('Holidays', response);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            // Call the fetchData function when the component mounts
            fetchHolidaysData();
        }
    }, [Holidays]);

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

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('Notices', response.data.data.notices);
                    setDataNotices(response.data.data.notices);
                    setFilter(response.data.data.notices);
                    console.log('Past Notices', response.data.data.pastnotices);
                    setDatapast(response.data.data.pastnotices);
                    setFilterpast(response.data.data.pastnotices);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

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
                    eventID: eventID,
                };
                const response = await axios.post(MY_EVENTS_INFO_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    //Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setEventInfo(response.data.data.eventinfo[0].details);
                    console.log('event info', response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [eventID]);

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
                    holidayID: holyID,
                };
                const response = await axios.post(MY_HOLIDAYS_INFO_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    //Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setHolyInfo(response.data.data.holidayinfo[0].details);
                    console.log('holy info', response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [holyID]);

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

    const handleNoticeModal = (notice: any, title: any) => {
        setNoticeDesc(notice);
        setNoticeTitle(title);
        setmodalNotice(true);
    };

    const handleHoliModal = (date: any, title: any, holyID: any) => {
        setHolyID(holyID);
        const fdate = moment(date).format('DD:MM:YYYY');
        setHolyTitle(title);
        setHolyDate(fdate);
        setmodalNotice(true);
    };

    const handleEventModal = (fdate: any, tdate: any, ftime: any, title: any, eventID: any) => {
        setEventID(eventID);
        setEventFDate(moment(fdate).format('DD:MM:YYYY'));
        setEventTDate(moment(tdate).format('DD:MM:YYYY'));
        setEventTime(moment(tdate).format('LT'));
        setEventTitle(title);
        setmodalNotice(true);
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
                            <div className="space-y-2">
                                {dataNotices.length > 0 ? <h2 className="text-md font-bold mb-4">Upcoming Notices</h2> : ''}
                                {dataNotices.map((notice: any) => (
                                    <div className="flex bg-gray-100 p-2 ">
                                        <span
                                            onClick={() => handleNoticeModal(notice.notice, notice.title)}
                                            className=" cursor-pointer shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light"
                                        >
                                            <FaEye className="text-blue-400 w-8 h-4" />
                                        </span>

                                        <div className="px-3 flex-1">
                                            <div className="text-sm">{notice.title}</div>
                                            <div className="text-xs text-white-dark dark:text-gray-500">Diary Date:{moment(notice.date).format('DD-MM-YYYY')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {datapast.length > 0 && dataNotices.length > 0 ? (
                                    <h2 className="text-md font-bold mb-4 mt-4">Past Notices</h2>
                                ) : (
                                    <h2 className="text-md font-bold mb-4 mt-4"> Notices</h2>
                                )}
                                {datapast.map((notice: any) => (
                                    <div className="flex bg-gray-100 p-2 ">
                                        <span
                                            onClick={() => handleNoticeModal(notice.notice, notice.title)}
                                            className=" cursor-pointer shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light"
                                        >
                                            <FaEye className="text-blue-400 w-8 h-4" />
                                        </span>

                                        <div className="px-3 flex-1">
                                            <div className="text-sm">{notice.title}</div>
                                            <div className="text-xs text-white-dark dark:text-gray-500">Diary Date:{moment(notice.date).format('DD-MM-YYYY')}</div>
                                        </div>
                                        {/* <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                            view
                                        </span> */}
                                    </div>
                                ))}
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
                            <div className="space-y-2">
                                {dataHoliday.map((notice: any) => (
                                    <div className="flex bg-gray-100 p-2 ">
                                        <span
                                            onClick={() => handleHoliModal(notice.fdate, notice.title, notice.holidayID)}
                                            className=" cursor-pointer shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light"
                                        >
                                            <FaEye className="text-blue-400 w-8 h-4" />
                                        </span>

                                        <div className="px-3 flex-1">
                                            <div className="text-sm">{notice.title}</div>
                                            <div className="text-xs text-white-dark dark:text-gray-500">
                                                Date:{moment(notice.fdate).format('DD-MM-YYYY')} - {moment(notice.tdate).format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                            <div className="space-y-2">
                                {dataEvents.map((notice: any) => (
                                    <div className="flex bg-gray-100 p-2 ">
                                        <span
                                            onClick={() => handleEventModal(notice.fdate, notice.tdate, notice.ftime, notice.title, notice.eventID)}
                                            className=" cursor-pointer shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light"
                                        >
                                            <FaEye className="text-blue-400 w-8 h-4" />
                                        </span>

                                        <div className="px-3 flex-1">
                                            <div className="text-sm">{notice.title}</div>
                                            <div className="text-xs text-white-dark dark:text-gray-500">
                                                Date:{moment(notice.fdate).format('DD-MM-YYYY')} - {moment(notice.tdate).format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                        {/* <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                            view
                                        </span> */}
                                    </div>
                                ))}
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
                                        {Notices && noticeTitle} {Events && 'Event Details'} {Holidays && 'Holiday Details'}
                                    </h5>
                                    <button onClick={() => setmodalNotice(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between  bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-sm ">
                                        {Notices && <div dangerouslySetInnerHTML={{ __html: noticeDesc }} />}
                                        {Events && (
                                            <>
                                                <div className=" panel justify-center  card-body flex flex-col space-y-2">
                                                    <div className="mb-5 ">
                                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                            <table className="table-hover table-striped">
                                                                <thead>
                                                                    <tr></tr>
                                                                </thead>
                                                                <tbody className="dark:text-white-dark border-1.5 ">
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Title</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{eventTitle}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="">
                                                                            From Date
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{eventFDate}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="">
                                                                            To Date
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{eventTDate}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Time</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td> {eventTime}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Details</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{eventInfo} </td>
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
                                                <div className=" panel card-body justify-center flex flex-col space-y-2">
                                                    <div className="mb-5 ">
                                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                            <table className="table-hover table-striped">
                                                                <thead>
                                                                    <tr></tr>
                                                                </thead>
                                                                <tbody className="dark:text-white-dark border-1.5 ">
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Title</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td> {holyTitle}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="">
                                                                            Event Date
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td> {holyDate}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Details</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>
                                                                            <div dangerouslySetInnerHTML={{ __html: holyInfo }} />
                                                                        </td>
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
                                {/* <div className="flex justify-end items-end m-4 ">
                                    <button className="p-2 bg-gray-300 rounded-md" onClick={() => setmodalNotice(false)}>
                                        Close
                                    </button>
                                </div> */}
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Tabs;
