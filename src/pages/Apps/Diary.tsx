import { Link } from 'react-router-dom';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
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
import { DataTable } from 'mantine-datatable';
import IconEye from '../../components/Icon/IconEye';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconInbox from '../../components/Icon/IconInbox';
import FullCalendar from '@fullcalendar/react';
import Swal from 'sweetalert2';
import IconPlus from '../../components/Icon/IconPlus';
import IconX from '../../components/Icon/IconX';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MY_DASHBOARD_URL, MY_DIARY_INFO_URL, MY_DIARY_URL } from './query';
import axios from 'axios';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import moment from 'moment';

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

const Tabs = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
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
    const [initialRecords, setInitialRecords] = useState(rowData);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [Diary, setDiary] = useState(true);
    const [Calendar, setCalendar] = useState(false);
    const [loadDiary, setloadDiary] = useState('');
    const [nowmonth, setnowmonth] = useState('');
    const [myDiariesMonth, setmyDiariesMonth] = useState<any>([]);
    const [myDiariesDays, setmyDiariesDays] = useState<any>([]);
    const [diaryInfo, setmyDiaryInfo] = useState<any>([]);
    const [diaryModal, setdiaryModal] = useState(false);
    const [diaryID, setDairyID] = useState('');
    const [diaryDate, setDairyDate] = useState('');
    const [diaryTitle, setDairyTitle] = useState('');
    const [diaryHome, setDairyHome] = useState('');
    const handleDiary = () => {
        setDiary(true);
        setCalendar(false);
    };
    const handleCalendar = () => {
        setDiary(false);
        setCalendar(true);
    };

    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    //item.action.toLowerCase().includes(search.toLowerCase()) ||
                    // item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.type.toLowerCase().includes(search.toLowerCase()) ||
                    item.started.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Calendar'));
    });
    const now = new Date();
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
        // return dt.getMonth() < 10 ? '0' + month : month;
    };

    const [events, setEvents] = useState<any>([
        {
            id: 1,
            title: 'All Day Event',
            start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',
            className: 'danger',
            description: 'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
        },
        {
            id: 2,
            title: 'Site Visit',
            start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',
            className: 'primary',
            description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
        },
        {
            id: 3,
            title: 'Product Lunching Event',
            start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',
            className: 'info',
            description: 'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
        },
        {
            id: 4,
            title: 'Meeting',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',
            className: 'danger',
            description: 'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
        },
        {
            id: 5,
            title: 'Lunch',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',
            className: 'info',
            description: 'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
            id: 6,
            title: 'Conference',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',
            className: 'success',
            description:
                'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
        },
        {
            id: 7,
            title: 'Happy Hour',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',
            className: 'info',
            description: ' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
        },
        {
            id: 8,
            title: 'Dinner',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',
            className: 'danger',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 9,
            title: 'Birthday Party',
            start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',
            className: 'success',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 10,
            title: 'New Talent Event',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',
            className: 'danger',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 11,
            title: 'Other new',
            start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',
            className: 'primary',
            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 13,
            title: 'Upcoming Event',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',
            className: 'primary',
            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    ]);
    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState<any>('');
    const [minEndDate, setMinEndDate] = useState<any>('');
    const defaultParams = { id: null, title: '', start: '', end: '', description: '', type: 'primary' };
    const [params, setParams] = useState<any>(defaultParams);
    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
        return dt;
    };
    const editEvent = (data: any = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                start: dateFormat(obj.start),
                end: dateFormat(obj.end),
                type: obj.classNames ? obj.classNames[0] : 'primary',
                description: obj.extendedProps ? obj.extendedProps.description : '',
            });
            setMinStartDate(new Date());
            setMinEndDate(dateFormat(obj.start));
        } else {
            setMinStartDate(new Date());
            setMinEndDate(new Date());
        }
        setIsAddEventModal(true);
    };
    const editDate = (data: any) => {
        let obj = {
            event: {
                start: data.start,
                end: data.end,
            },
        };
        editEvent(obj);
    };

    const saveEvent = () => {
        if (!params.title) {
            return true;
        }
        if (!params.start) {
            return true;
        }
        if (!params.end) {
            return true;
        }
        if (params.id) {
            //update event
            let dataevent = events || [];
            let event: any = dataevent.find((d: any) => d.id === parseInt(params.id));
            event.title = params.title;
            event.start = params.start;
            event.end = params.end;
            event.description = params.description;
            event.className = params.type;

            setEvents([]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        } else {
            //add event
            let maxEventId = 0;
            if (events) {
                maxEventId = events.reduce((max: number, character: any) => (character.id > max ? character.id : max), events[0].id);
            }
            maxEventId = maxEventId + 1;
            let event = {
                id: maxEventId,
                title: params.title,
                start: params.start,
                end: params.end,
                description: params.description,
                className: params.type,
            };
            let dataevent = events || [];
            dataevent = dataevent.concat([event]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        }
        showMessage('Event has been saved successfully.');
        setIsAddEventModal(false);
    };
    const startDateChange = (event: any) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setMinEndDate(dateFormat(dateStr));
            setParams({ ...params, start: dateStr, end: '' });
        }
    };
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
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
                    classesID: localStorage.classesID,
                    sectionID: localStorage.sectionID,
                    nowmonth: '0',
                };
                const response = await axios.post(MY_DIARY_URL, postData, {
                    headers: headers,
                });

                console.log('diary', response);

                setmyDiariesMonth(response.data.data.dairy_months);
                setmyDiariesDays(response.data.data.dairy_days);
                setloadDiary(response.data.data.dairy_months[0].monthName);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,
                    classesID: localStorage.classesID,
                    sectionID: localStorage.sectionID,
                    nowmonth: nowmonth,
                    //sectionID: localStorage.sectionID,
                };
                const response = await axios.post(MY_DIARY_URL, postData, {
                    headers: headers,
                });

                console.log('diary days', response);
                setmyDiariesDays(response.data.data.dairy_days);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetch();
    }, [nowmonth]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,

                    did: diaryID,
                    //sectionID: localStorage.sectionID,
                };
                const response = await axios.post(MY_DIARY_INFO_URL, postData, {
                    headers: headers,
                });

                console.log('diary info', response);
                setmyDiaryInfo(response.data.data.dairy_info);
                setDairyDate(response.data.data.dairy_info.dairy_date);
                setDairyTitle(response.data.data.dairy_info.title);
                setDairyHome(response.data.data.dairy_info.homework);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetch();
    }, [diaryID]);

    const handleDiaryDay = (dairyID: any) => {
        setdiaryModal(true);
        setDairyID(dairyID);
    };

    const handleMonth = (monthno: any, monthName: any) => {
        //setSubID(subID);
        setloadDiary(monthName);
        setnowmonth(monthno);
    };

    return (
        <div>
            <>
                <div className="space-y-8 pt-5">
                    <div className="panel" id="icon">
                        {/* <h5 className="text-lg font-bold dark:text-white-light">Diary</h5> */}
                        <div className="mb-5 flex items-center justify-between border-b-2 pb-6">
                            <span className="text-lg font-bold">
                                Diary Month : <span className="text-md font-semibold"> {loadDiary}</span>
                            </span>
                            <div className="flex justify-end space-x-2">
                                <div className="mb-2">
                                    <div className="flex flex-wrap w-full gap-7 justify-around">
                                        <div className="flex items-center justify-center">
                                            <div className="dropdown">
                                                <Dropdown
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="btn btn-success  w-full  dropdown-toggle"
                                                    button={
                                                        <>
                                                            {loadDiary}
                                                            <span>
                                                                <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                            </span>
                                                        </>
                                                    }
                                                >
                                                    <ul className="!min-w-[170px]">
                                                        {myDiariesMonth &&
                                                            myDiariesMonth.map((month: any) => (
                                                                <li key={month.id}>
                                                                    <button type="button" onClick={() => handleMonth(month.monthno, month.monthName)}>
                                                                        {month.monthName}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-6">
                                {myDiariesDays &&
                                    myDiariesDays.map((day: any) => (
                                        <div className="flex bg-gray-100 p-2 cursor-pointer" onClick={() => handleDiaryDay(day.dairyID)}>
                                            {/* <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                            Pay
                                        </span> */}
                                            <div className="px-3 flex-1">
                                                <div className="text-sm">{day.title}</div>
                                                <div className="text-xs text-white-dark dark:text-gray-500">Diary Date:{moment(day.dairy_date).format('DD-MM-YYYY')}</div>
                                            </div>
                                            <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                                view
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <div>
                <Transition appear show={diaryModal} as={Fragment}>
                    <Dialog as="div" open={diaryModal} onClose={() => setdiaryModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">{diaryTitle}</h5>
                                        <button onClick={() => setdiaryModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="flex flex-col space-y2 p-2">
                                        <div>Date:{moment(diaryDate).format('DD-MM-YYYY')}</div>
                                        <div dangerouslySetInnerHTML={{ __html: diaryHome }} />
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default Tabs;
