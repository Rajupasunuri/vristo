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

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="panel " id="border">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Time Table</h5>
                    </div>
                    <div className="mb-5 w-full">
                        <Tab.Group>
                            <Tab.List className="mt-3 flex flex-wrap  w-full ">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:!bg-[#191e3a]' : ''}
                                                    ' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 before:inline-block hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Monday
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:bg-[#191e3a]' : ''}
                                                before:inline-block' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Tuesday
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:bg-[#191e3a]' : ''}
                                                before:inline-block' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Wednesday
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:bg-[#191e3a]' : ''}
                                                before:inline-block' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Thursday
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:bg-[#191e3a]' : ''}
                                                before:inline-block' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Friday
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:bg-[#191e3a]' : ''}
                                                before:inline-block' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Saturday
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-secondary text-secondary !outline-none dark:bg-[#191e3a]' : ''}
                                                before:inline-block' flex items-center border-t-2 border-transparent bg-[#f6f7f8] p-7 py-3 hover:border-secondary hover:text-secondary dark:bg-transparent dark:hover:bg-[#191e3a]`}
                                        >
                                            Sunday
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="space-y-6">
                                            {/* Simple */}

                                            {/* Hover Table  */}
                                            <div className="panel">
                                                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5> */}</div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Subject</th>
                                                                <th>Teacher</th>
                                                                <th>Live Class</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mondayData.map((data) => {
                                                                return (
                                                                    <tr key={data.time}>
                                                                        <td>{data.time}</td>
                                                                        <td>
                                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                                        </td>
                                                                        <td>{data.teacher}</td>
                                                                        <td>{data.live}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="space-y-6">
                                            {/* Simple */}

                                            {/* Hover Table  */}
                                            <div className="panel">
                                                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5> */}</div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Subject</th>
                                                                <th>Teacher</th>
                                                                <th>Live Class</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tuesdayData.map((data) => {
                                                                return (
                                                                    <tr key={data.time}>
                                                                        <td>{data.time}</td>
                                                                        <td>
                                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                                        </td>
                                                                        <td>{data.teacher}</td>
                                                                        <td>{data.live}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="space-y-6">
                                            {/* Simple */}

                                            {/* Hover Table  */}
                                            <div className="panel">
                                                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5> */}</div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Subject</th>
                                                                <th>Teacher</th>
                                                                <th>Live Class</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mondayData.map((data) => {
                                                                return (
                                                                    <tr key={data.time}>
                                                                        <td>{data.time}</td>
                                                                        <td>
                                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                                        </td>
                                                                        <td>{data.teacher}</td>
                                                                        <td>{data.live}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="space-y-6">
                                            {/* Simple */}

                                            {/* Hover Table  */}
                                            <div className="panel">
                                                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5> */}</div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Subject</th>
                                                                <th>Teacher</th>
                                                                <th>Live Class</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mondayData.map((data) => {
                                                                return (
                                                                    <tr key={data.time}>
                                                                        <td>{data.time}</td>
                                                                        <td>
                                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                                        </td>
                                                                        <td>{data.teacher}</td>
                                                                        <td>{data.live}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="space-y-6">
                                            {/* Simple */}

                                            {/* Hover Table  */}
                                            <div className="panel">
                                                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5> */}</div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Subject</th>
                                                                <th>Teacher</th>
                                                                <th>Live Class</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mondayData.map((data) => {
                                                                return (
                                                                    <tr key={data.time}>
                                                                        <td>{data.time}</td>
                                                                        <td>
                                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                                        </td>
                                                                        <td>{data.teacher}</td>
                                                                        <td>{data.live}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="space-y-6">
                                            {/* Simple */}

                                            {/* Hover Table  */}
                                            <div className="panel">
                                                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5> */}</div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Subject</th>
                                                                <th>Teacher</th>
                                                                <th>Live Class</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mondayData.map((data) => {
                                                                return (
                                                                    <tr key={data.time}>
                                                                        <td>{data.time}</td>
                                                                        <td>
                                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                                        </td>
                                                                        <td>{data.teacher}</td>
                                                                        <td>{data.live}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="mt-5 rounded-tr-md rounded-br-md border border-l-2 border-white-light !border-l-primary bg-white p-5 pt-5 text-black shadow-md ltr:pl-3.5 rtl:pr-3.5 dark:border-[#060818] dark:bg-[#060818]">
                                        <div className="flex items-center justify-center">
                                            <h2 className="font-bold text-base">No Records Found</h2>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Tabs;
