import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
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
import { IRootState } from '../../store';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Dropdown from '../../components/Dropdown';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_TIME_TABLE_URL } from './query';

const Tabs = () => {
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

    //const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs1, setTabs1] = useState<string[]>([]);
    const [all_tabs, setAll_tabs] = useState([]);
    const toggleCode1 = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const mondayData = [
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
    ];

    const tuesdayData = [
        {
            time: '9:50 AM - 10:30 AM',
            subject: 'Hindi',
            teacher: 'Meena',
            live: ' ',
        },
        {
            time: '1:50 PM - 2:30 PM',
            subject: 'Hindi',
            teacher: 'Meena',
            live: ' ',
        },
        {
            time: '11:35 AM - 12:15 PM',
            subject: 'Maths',
            teacher: 'Mahesh',
            live: ' ',
        },
        {
            time: '10:35 AM - 10:45 AM',
            subject: '-',
            teacher: '-',
            live: ' ',
        },
        {
            time: '12:20 PM - 1:00 PM',
            subject: '-',
            teacher: '-',
            live: ' ',
        },
        {
            time: '1:05 PM - 1:45 PM',
            subject: 'Science',
            teacher: '-',
            live: ' ',
        },
        {
            time: '10:50 AM - 11:30 AM',
            subject: 'Social Studies',
            teacher: '-',
            live: ' ',
        },
        {
            time: '8:00 AM - 9:45 AM',
            subject: 'Computers',
            teacher: '-',
            live: ' ',
        },
    ];
    const wednesdayData = [
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
    ];
    const thursdayData = [
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
    ];
    const fridayData = [
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
    ];
    const saturdayData = [
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
        {
            time: '9:00 AM - 9:45 AM',
            subject: 'Telugu',
            teacher: 'Sri Lakshmi',
            live: ' ',
        },
    ];

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
                    classesID: localStorage.classesID,
                    sectionID: localStorage.sectionID,
                };
                const response = await axios.post(MY_TIME_TABLE_URL, postData, {
                    headers: headers,
                });

                console.log('time table', response);

                setAll_tabs(response.data.data.this_days);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="panel " id="border">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Time Table</h5>
                    </div>
                    <div className="mb-5 w-full">
                        <Tab.Group>
                            <Tab.List className="mt-3 flex overflow-x-auto  w-full  ">
                                {all_tabs.map((all_tab: any, index: number) => {
                                    return (
                                        <Tab as={Fragment} key={index}>
                                            {({ selected }) => (
                                                <div className="flex-auto text-center !outline-none">
                                                    <button
                                                        className={`${
                                                            selected ? '!border-white-light !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
                                                        } dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:border-white-light hover:border-b-white dark:hover:border-[#191e3a]`}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {all_tab.day_name}
                                                    </button>
                                                </div>
                                            )}
                                        </Tab>
                                    );
                                })}
                            </Tab.List>
                            <Tab.Panels>
                                {all_tabs.map((all_tab: any, index: number) => {
                                    return (
                                        <Tab.Panel>
                                            <div className="active">
                                                {/* Simple */}

                                                {/* Hover Table  */}
                                                <div className="mt-2">
                                                    <div className="table-responsive mb-5">
                                                        <table className="table-hover">
                                                            <thead>
                                                                <tr className="whitespace-nowrap">
                                                                    <th>Time</th>
                                                                    <th>Subject</th>
                                                                    <th>Teacher</th>
                                                                    <th>Live Class</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="whitespace-nowrap">
                                                                {all_tab.time_table.map((data: any, index: number) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{data.start_time}</td>
                                                                            <td>
                                                                                <div className="whitespace-nowrap">{data.subject_name}</div>
                                                                            </td>
                                                                            <td>{data.teacher_name}</td>
                                                                            <td>-</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                    );
                                })}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Tabs;
