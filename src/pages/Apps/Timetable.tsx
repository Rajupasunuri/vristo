import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { MY_TIME_TABLE_URL } from '../query';
import Swal from 'sweetalert2';

const Timetable = () => {
    const dispatch = useDispatch();

    const [all_tabs, setAll_tabs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setAll_tabs(response.data.data.this_days);
                    const today = new Date().toLocaleString('en-us', { weekday: 'long' });
                    const defaultIndex = response.data.data.this_days.findIndex((tab: any) => tab.day_name === today);
                    setSelectedIndex(defaultIndex !== -1 ? defaultIndex : 0);
                }

                console.log('time table', response);
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
                        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                            <Tab.List className="mt-3 flex overflow-x-auto  w-full  ">
                                {all_tabs.map((all_tab: any, index: number) => {
                                    return (
                                        <Tab as={Fragment} key={index}>
                                            {({ selected }) => (
                                                <div className="flex-auto text-center !outline-none">
                                                    <button
                                                        className={`${selected ? '!border-white-light !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
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
                                        <Tab.Panel key={index}>
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
export default Timetable;
