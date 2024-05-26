import { useEffect, useRef, RefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSend from '../../components/Icon/IconSend';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import IconEdit from '../../components/Icon/IconEdit';
import IconPlus from '../../components/Icon/IconPlus';
import IconAt from '../../components/Icon/IconAt';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_YEAR_PAYMENTS_URL } from './query';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';
import { IRootState } from '../../store';
import Swal from 'sweetalert2';

interface PaymentsProps {
    payments: any; // Change `any` to the appropriate type of `hall` if possible
    feereceipt: boolean;
    setFeeReceipt: React.Dispatch<React.SetStateAction<boolean>>;
}

const Preview = ({ payments, feereceipt, setFeeReceipt }: PaymentsProps) => {
    console.log('payments....', payments);
    const dispatch = useDispatch();
    const school_logo = useSelector((state: IRootState) => state.themeConfig.school_logo);
    const studentdtls = useSelector((state: IRootState) => state.themeConfig);
    const [logo, setLogo] = useState(localStorage.school_logo);
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
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
                    schoolyearID: localStorage.schoolyearID,
                };
                const response = await axios.post(MY_YEAR_PAYMENTS_URL, postData, {
                    headers: headers,
                });

                // if (response.data.error) {
                //     Swal.fire('Request Failed, Try Again Later!');
                // } else {
                //     setALeaveList(response.data.data.leave_Management);
                //     setLeaveLoader(false);
                // }

                console.log('payments', response);
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

    const exportTable = () => {
        window.print();
    };

    const pdfref: RefObject<HTMLDivElement> = useRef(null);

    const dates = new Date();
    const local = dates.toLocaleDateString('en-GB');

    const downloadPDF = () => {
        if (logo) {
            const input = document.getElementById('table-container');
            if (!input) {
                console.error("Element with ID 'table-container' not found.");
                return;
            }

            const image = new Image();
            image.src = localStorage.school_logo;
            image.onload = () => {
                html2canvas(input, { scale: 2 })
                    .then((canvas) => {
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgData = canvas.toDataURL('image/png');
                        const imgWidth = 210;
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        const pdfHeight = (imgHeight * 210) / imgWidth;
                        const margin = 1; // Adjust margin as needed
                        const padding = 10;

                        const xPos = margin; // Adjust as needed
                        const yPos = 15; // Adjust as needed
                        const contentWidth = imgWidth - 2 * 1;
                        const contentHeight = pdfHeight - 2 * padding;
                        pdf.addImage(imgData, 'PNG', xPos, yPos, contentWidth, contentHeight);
                        pdf.save('Fee Receipt.pdf');
                    })
                    .catch((error) => {
                        console.error('Error generating canvas:', error);
                    });
            };

            image.onerror = (error) => {
                console.error('Error loading image:', error);
            };
        }
    };

    return (
        <div className="">
            <div className="flex justify-start flex-wrap gap-4 mb-6 print:hidden">
                <button type="button" onClick={downloadPDF} className="btn btn-success btn-sm gap-2">
                    Download PDF
                </button>
                {/* <button type="button" onClick={() => setFeeReceipt(false)} className="btn btn-success gap-2">
                    Back
                </button> */}
            </div>
            <div className=" bg-white shadow-md rounded-md w-[1200px] h-full p-12 pt-16  text-base border-gray-400 border-2" id="table-container">
                {/* Rest of the code remains unchanged */}

                <div className="flex justify-center items-center flex-col flex-wrap ">
                    <div className="">
                        <img src={localStorage.school_logo} className="mx-auto w-24 h-8 " alt="Image Description" />
                    </div>
                    <strong>{localStorage.school_name}</strong>
                    {/* <div className="flex items-center">
                        <span>
                            <FaLocationDot className="relative inline w-4 h-4" />: Affiliated to the Council for the I.C.S.E-New Delhi. SILVER JUBILEE SCHOOL(Estd.1982),
                        </span>
                        <IoMdMail className="relative inline" />: 9949752324,
                        <IoMdMail className="relative inline" />: noreply@lfselearn.com
                    </div> */}
                    <div className="flex items-centers ">
                        <FaLocationDot className="inline w-4 h-4 mb--2" />: Affiliated to the Council for the I.C.S.E-New Delhi. SILVER JUBILEE SCHOOL(Estd.1982),
                    </div>
                    <div className="flex items-center">
                        <FaPhoneAlt className="inline" />: 9949752324,
                        <IoMdMail className="inline" />: noreply@lfselearn.com
                    </div>

                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                </div>
                <div className="flex justify-between mt-3">
                    <div className="flex flex-col">
                        <div>
                            <strong>Name</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.std_name}
                        </div>
                        <div>
                            <strong>Class</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{studentdtls.classname}
                        </div>
                        <div>
                            <strong>Reg. No</strong>&nbsp;&nbsp;&nbsp;: {studentdtls.std_regno}
                        </div>
                        <div>
                            <strong>Section</strong>&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.sectionname}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <strong>Father's Name</strong>&nbsp;&nbsp;&nbsp;:{localStorage.father}
                        </div>
                        <div>
                            <strong>Mother's Name</strong>&nbsp;&nbsp;: {localStorage.mother}
                        </div>
                        <div>
                            <strong>Email</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.std_email}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <strong>Date</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {local}
                        </div>
                        <div>
                            <strong>Roll No</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{studentdtls.std_roll}
                        </div>
                        <div>
                            <strong>Phone No</strong>&nbsp;:{studentdtls.std_phone}
                        </div>
                    </div>
                </div>
                {/* <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>Date:{local}</div>
                    </div>
                </div> */}

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                <div className="table-responsive mt-4">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Fee Type</th>
                                <th>Paid Amount</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{payment.fee_struc_term}</td>
                                        <td>{payment.paymentamount}</td>
                                        <td className="">{payment.paymentdate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="ltr:text-right rtl:text-left space-y-1">
                        <div className="">
                            <div>
                                <h2 className="  pt-2 pr-4">------------------------------------</h2>
                                <p className="  pt-1 pr-4">This is a system generated receipt</p>
                                <p className="   pr-8">so does not require a signature</p>
                                <div>.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
