import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { FaRegPlusSquare } from 'react-icons/fa';
import TableDialog from './TableDialog';
import { MY_EXAM_HALL_DEATILS_URL, MY_EXAM_SCHEDULE_DEATILS_URL, MY_EXAM_SCHEDULE_URL } from './query';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const ExamSchedule = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [examSchedule, setExamSchedule] = useState([]);
    const [examScheduleDlts, setExamScheduleDlts] = useState([]);
    const [examID, setExamID] = useState('');
    const [toggleBtn, setToggleBtn] = useState(true);
    const [hallTicket, setHallTicket] = useState<any>([]);

    const toggleRow = (index: number, examID: any) => {
        setExamID(examID);
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };
    const [modal10, setModal10] = useState(false);
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
                };
                const response = await axios.post(MY_EXAM_SCHEDULE_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('exam schedule', response);
                    setExamSchedule(response.data.data.exam_schedule);
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
                    classesID: localStorage.classesID,
                    sectionID: localStorage.sectionID,
                    examID: examID,
                };
                const response = await axios.post(MY_EXAM_SCHEDULE_DEATILS_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    //Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('exam schedule details', response);
                    setExamScheduleDlts(response.data.data.exam_details);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [examID]);

    const handleHallTicket = async (examIDs: any) => {
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
                examID: examIDs,
            };
            const response = await axios.post(MY_EXAM_HALL_DEATILS_URL, postData, {
                headers: headers,
            });

            if (response.data.error) {
                Swal.fire('Request Failed, Try Again Later!');
            } else {
                setHallTicket(response.data.data.exam_hall_ticket);
                const hall = response.data.data.exam_hall_ticket;
                console.log('inside', hall);
            }

            console.log('hall ticket', response);
            //setExamScheduleDlts(response.data.data.exam_details);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="panel">
                <div className="flex items-center justify-between mb-5 border-b ">
                    <h5 className="font-semibold text-lg pb-4 dark:text-white-light">Exam Schedule</h5>
                </div>

                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="whitespace-nowrap ">Exam NAME</th>
                                <th>Time</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examSchedule.map((examsch: any, index) => (
                                <>
                                    <tr>
                                        <td onClick={() => toggleRow(index, examsch.examID)} className="cursor-pointer">
                                            <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />
                                        </td>
                                        <td className="whitespace-nowrap text-sm">{examsch.exam}</td>
                                        <td className="whitespace-nowrap text-sm">
                                            {examsch.examfrom} - {examsch.examto}
                                        </td>
                                        <td>
                                            <span onClick={() => handleHallTicket(examsch.examID)}>
                                                <TableDialog hall={hallTicket} exam={examsch.exam} />
                                            </span>
                                        </td>
                                    </tr>
                                    <Transition
                                        as={Fragment}
                                        show={expandedRow === index}
                                        enter="transition-opacity duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="  table-responsive mb-5">
                                            <table className=" table-hover table-striped">
                                                <thead>
                                                    <tr className="whitespace-nowrap">
                                                        <th>Subject</th>
                                                        <th>Final Marks</th>
                                                        <th>Pass Marks</th>
                                                        <th className="text-center">Date</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {examScheduleDlts.map((examschdlts: any, index) => (
                                                        <tr className="whitespace-nowrap text-sm">
                                                            <td>{examschdlts.subject}</td>
                                                            <td>{examschdlts.finalmark}</td>
                                                            <td>{examschdlts.passmark}</td>
                                                            <td>{moment(examschdlts.edate).format('DD-MM-YYYY')}</td>
                                                            <td>
                                                                {examschdlts.examfrom} - {examschdlts.examto}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Transition>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExamSchedule;
