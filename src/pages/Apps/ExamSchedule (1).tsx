import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { FaPrint, FaRegPlusSquare } from 'react-icons/fa';

import { MY_EXAM_HALL_DEATILS_URL, MY_EXAM_SCHEDULE_DEATILS_URL, MY_EXAM_SCHEDULE_URL } from '../query';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import HallTicket from './HallTicket';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { bottom } from '@popperjs/core';
import IconDownload from '../../components/Icon/IconDownload';

const ExamSchedule = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [examSchedule, setExamSchedule] = useState([]);
    const [examScheduleDlts, setExamScheduleDlts] = useState([]);
    const [examID, setExamID] = useState('');
    const [examName, setExamName] = useState('');
    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState<any>(true)

    const [hallTicket, setHallTicket] = useState<any>([]);

    const toggleRow = (index: number, examID: any) => {
        setExamID(examID);
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
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

    const handleHallTicket = async (examIDs: any, exam: any) => {
        setExamName(exam)
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
                setErrors(response.data.error)
                const hall = response.data.data.exam_hall_ticket;
                setShow(true)
                console.log('inside', hall);
            }

            console.log('hall ticket', response);
            //setExamScheduleDlts(response.data.data.exam_details);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log('inside err', errors);

    useEffect(() => {

        if (!errors && show) {

            downloadPDF();

        }

    }, [hallTicket])


    const downloadPDF = () => {
        const input = document.getElementById('table-container');
        if (!input) {
            console.error("Element with ID 'table-container' not found.");
            return;
        }


        html2canvas(input, { scale: 2 }).then((canvas) => {
            setShow(true);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // Width of A4 paper in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Ensure canvas size is adjusted to fit the entire table
            const pdfHeight = (imgHeight * 210) / imgWidth;
            const margin = 1; // Adjust margin as needed
            const padding = 2;

            const xPos = 16; // Adjust as needed
            const yPos = 10; // Adjust as needed
            const contentWidth = imgWidth - 30 * 1;
            const contentHeight = pdfHeight - 2 * padding;
            pdf.addImage(imgData, 'PNG', xPos, yPos, contentWidth, contentHeight);
            pdf.setFontSize(2);

            pdf.save('Hall-Ticket.pdf');
            setShow(false);
        }).catch((error) => {
            //setShow(false);
            console.error('Error generating canvas:', error);
        });
    };

    const cellStyle: any = {
        border: '.1px solid black',

        textAlign: 'center',
        borderLeft: 'none',

        borderBottom: 'none',
    };

    return (
        <div className="space-y-2">



            {show && (
                <div className={`${show ? 'block' : 'hidden'} w-[600px] h-full`} id="table-container">
                    <table className='table-responsive' style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black', borderTop: '1px solid black', margin: '.5px' }}>
                        <thead>
                            <tr>
                                <th colSpan={4} className='' style={{ textAlign: 'center', borderRight: '1px solid black' }}>{examName} HallTicket</th>
                            </tr>
                            <tr style={{ borderLeft: 'none' }}>
                                <td style={{ borderLeft: 'none' }}>Name: {localStorage.std_name}</td>
                                <td>Class: {localStorage.classname}<br />Section: {localStorage.sectionname}</td>
                                <td>Roll No: {localStorage.std_roll}<br />Reg.No: {localStorage.std_regno}</td>
                                <td style={{ borderRight: '1px solid black' }}>
                                    <img src="/public/assets/images/C2172.jpg" alt="img" className="w-17 h-16 overflow-hidden object-cover mb-2" />
                                </td>
                            </tr>
                            <tr>
                                <th style={cellStyle}>Date</th>
                                <th style={cellStyle}>Subject</th>
                                <th style={cellStyle}>Time</th>
                                <th style={cellStyle}>Inv Sign</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hallTicket.map((halltck: any, index: any) => (
                                <tr key={index}>
                                    <td style={cellStyle}>{moment(halltck.edate).format('DD-MM-YYYY')}</td>
                                    <td style={cellStyle}>{halltck.subject}</td>
                                    <td style={cellStyle}>{halltck.examfrom} - {halltck.examto}</td>
                                    <td style={cellStyle}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

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
                                <th className="text-center">HallTicket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examSchedule.map((examsch: any, index) => (
                                <>
                                    <tr key={index}>
                                        <td onClick={() => toggleRow(index, examsch.examID)} className="cursor-pointer">
                                            <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />
                                        </td>
                                        <td className="whitespace-nowrap text-sm">{examsch.exam}</td>
                                        <td className="whitespace-nowrap text-sm">
                                            {examsch.examfrom} - {examsch.examto}
                                        </td>
                                        <td>
                                            <span onClick={() => handleHallTicket(examsch.examID, examsch.exam)}>
                                                {/* <FaPrint className="text-[#4531B2] w-6 h-4"  /> */}

                                                <IconDownload className=" w-6 h-6" />

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
                                                        <tr key={index} className="whitespace-nowrap text-sm">
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
