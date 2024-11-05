import axios from 'axios';
import { MY_LEAVE_URL } from '../query';
import { Fragment, useEffect, useState } from 'react';

import Tippy from '@tippyjs/react';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';

import EditorMce from './EditorMce';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Swal from 'sweetalert2';

const LeaveList = () => {
    const [leaveList, setLeaveList] = useState([]);
    const [leaveLoader, setLeaveLoader] = useState(false);
    const [content, setContent] = useState<any>('');
    const [subject, setSubject] = useState('');
    const [leaveModal, setleaveModal] = useState(false);
    const [leaveListBox, setLeaveListBox] = useState(true);
    const [date1, setDate1] = useState<any>('');
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLeaveLoader(true);
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,
                    leave_status: 3,
                };
                const response = await axios.post(MY_LEAVE_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setLeaveList(response.data.data.leave_Management);
                    console.log('leave', response);
                    setLeaveLoader(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
    const handleInvoice = (subject: any, description: any) => {
        setSubject(subject);
        //setContent(description);
        setContent(decodeHtmlEntities(description));
        setleaveModal(true);
    };
    const decodeHtmlEntities = (text: any) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
        return decodedString;
    };

    const handleApplyLeave = () => {
        setLeaveListBox(true);
    };
    const handleleaveList = () => {
        setLeaveListBox(false);
    };

    console.log('content', content);

    return (
        <>
            {leaveLoader ? (
                <div className="h-screen flex items-center justify-center">
                    <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
                </div>
            ) : leaveListBox ? (
                <div className="panel ">
                    <div className="flex justify-between">
                        <h2 className="mb-2 text-base font-semibold">Leave List</h2>
                        <button onClick={handleleaveList} className="mb-2 bg-white text-[#ffa800] p-1 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
                            + Apply Leave
                        </button>
                    </div>

                    <div className="  card-container">
                        {leaveList.map((leave: any, index: number) => (
                            <div key={index} className=" mb-4 ">
                                <div className=" panel card-body flex flex-col space-y-2">
                                    <div className="mb-5 ">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="table-hover table-striped">
                                                <thead>
                                                    <tr></tr>
                                                </thead>
                                                <tbody className="dark:text-white-dark border-1.5 ">
                                                    <tr>
                                                        <td style={{ width: '200px' }}>Subject</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> {leave.subject}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                            Leave From
                                                        </td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> {moment(leave.leave_from).format('DD-MM-YYYY')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>Leave To</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> {moment(leave.leave_to).format('DD-MM-YYYY')}</td>
                                                    </tr>

                                                    <tr>
                                                        <td style={{ width: '200px' }}>Status</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>
                                                            {leave.leave_status === 0 ? (
                                                                <span className="text-orange-600 bg-orange-300 p-0.5 px-4 rounded-md  text-center whitespace-nowrap">Pending</span>
                                                            ) : leave.leave_status === 1 ? (
                                                                <span className="text-green-600 bg-green-300 p-0.5 px-4 rounded-md  text-center whitespace-nowrap">Approved</span>
                                                            ) : leave.leave_status === 2 ? (
                                                                <span className="text-red-600 bg-red-300 p-0.5 px-4 rounded-md  text-center whitespace-nowrap">Rejected</span>
                                                            ) : leave.leave_status === 3 ? (
                                                                <span className="text-yellow-600 bg-yellow-300 p-0.5 px-4 rounded-md  text-center whitespace-nowrap"></span>
                                                            ) : (
                                                                <span className="text-green-600 bg-green-300 p-0.5 px-4 rounded-md  text-center whitespace-nowrap"></span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className=" flex justify-end">
                                        <Tippy className="bg-black text-white" content="View">
                                            <button type="button" onClick={() => handleInvoice(leave.subject, leave.leave_description)} className="btn btn-secondary btn-sm flex">
                                                View
                                            </button>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="space-y-8 pt-5">
                        <div className="panel " id="icon">
                            <div className="mb-5 flex flex-col sm:flex-row items-center justify-between border-b-2 pb-6">
                                <h5 className="text-sm font-bold dark:text-white-light mb-4 sm:mb-0">Apply Leave</h5>
                                <div className="flex justify-end space-x-2">
                                    <div></div>
                                    <div>
                                        <button
                                            onClick={handleApplyLeave}
                                            className="bg-white text-[#ffa800] p-2 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border"
                                        >
                                            + Leave Management
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <span className="sm:mr-20 mr-4">Leave From*</span>
                                    <div className="mb-5">
                                        <Flatpickr
                                            value={date1}
                                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                            className="form-input sm:w-40 w:20"
                                            onChange={(date) => setDate1(date)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center ml-4">
                                    <span className="sm:mr-20 mr-4 sm:ml-4 md:ml-6 lg:ml-8 ml-2">Leave To*</span>
                                    <div className="mb-5">
                                        <Flatpickr
                                            value={date1}
                                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                            className="form-input sm:w-40 w:20"
                                            onChange={(date) => setDate1(date)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <span className="mr-4">Subject*</span>
                                <input type="text" className=" w-1/2 ml-20 form-input rounded" />
                            </div>
                            <div className="flex mt-8 ">
                                <span className="mr-20">Message*</span>

                                <EditorMce />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div>
                <Transition appear show={leaveModal} as={Fragment}>
                    <Dialog as="div" open={leaveModal} onClose={() => setleaveModal(false)}>
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
                                        <h5 className="text-lg font-bold">{subject}</h5>
                                        <button onClick={() => setleaveModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="flex flex-col space-2 p-2">
                                        <div dangerouslySetInnerHTML={{ __html: content }} />
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default LeaveList;
