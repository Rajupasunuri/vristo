import axios from 'axios';
import { MY_LEAVE_URL } from '../query';
import { Fragment, useEffect, useState } from 'react';
import Index from '../Dashboard';
import Tippy from '@tippyjs/react';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import Swal from 'sweetalert2';

const PendingLeaves = () => {
    const [pleaveList, setPLeaveList] = useState([]);
    const [leaveLoader, setLeaveLoader] = useState(false);
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [leaveModal, setleaveModal] = useState(false);

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
                    leave_status: 0,
                };
                const response = await axios.post(MY_LEAVE_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setPLeaveList(response.data.data.leave_Management);
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
        // Get the HTML content from the description variable
        var descriptionHTML = description;

        // Create a temporary element to parse the HTML
        var tempElement = document.createElement('div');
        tempElement.innerHTML = descriptionHTML;

        // Extract the text content from the temporary element
        var textContent = tempElement.textContent || tempElement.innerText;

        // Output the plain text content
        // Insert spaces after commas, periods, and before and after placeholders
        let formattedText = textContent
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
            .replace(/\[([^\]]+)\]/g, '[$1]') // Add space before and after placeholders
            .replace(/([a-z])\./gi, '$1. ') // Add space after periods
            .replace(/([a-z]),/gi, '$1, ') // Add space after commas
            .replace(/\s+/g, ' '); // Replace multiple spaces with a single space

        // Format the date properly
        formattedText = formattedText.replace(/(\d+)([A-Za-z]+)/, '$1 $2');
        console.log(textContent);
        setSubject(subject);
        setDescription(formattedText);
        setleaveModal(true);
    };

    return (
        <>
            {leaveLoader ? (
                <div className="h-screen flex items-center justify-center">
                    <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
                </div>
            ) : (
                <div className="panel ">
                    <h2 className="mb-2 text-base font-semibold">Pending Leave List</h2>
                    <div className="  card-container">
                        {pleaveList.map((leave: any, index: number) => (
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
                                    <div className=" ">
                                        <div className="m-2  whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: description }} />
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

export default PendingLeaves;
