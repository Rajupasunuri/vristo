import { useEffect, useRef, RefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import html2canvas from 'html2canvas';
import { IRootState } from '../../store';

import jsPDF from 'jspdf';
import { MY_INVOICE_URL } from './query';
import axios from 'axios';
import Swal from 'sweetalert2';

const Preview = () => {
    const studentdtls = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [invoice, setInvoice] = useState<any>([]);
    const [payment, setPayment] = useState<any>([]);

    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
    const exportTable = () => {
        window.print();
    };

    useEffect(() => {
        const fetchYearInvoices = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    yearstudentID: localStorage.yearStudentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.tempschoolYearID,
                    invoiceID: localStorage.InvoiceID,

                    // admno: localStorage.std_regno,
                };
                //console.log('yearstdid', yearStudentID);

                const response = await axios.post(MY_INVOICE_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('preview_invoice', response);
                    localStorage.setItem('paidstatus', response.data.data.invoice[0].paidstatus);
                    setInvoice(response.data.data.invoice);
                    setPayment(response.data.data.payments);
                }

                //  setInvoiceData(response.data.data.invoices);
                //  setInvoLoader(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchYearInvoices();
    }, []);

    const pdfref: RefObject<HTMLDivElement> = useRef(null);

    const dates = new Date();
    const local = dates.toLocaleDateString('en-GB');

    const downloadPDF = () => {
        const input = document.getElementById('table-container');
        if (!input) {
            console.error("Element with ID 'table-container' not found.");
            return;
        }
        const margin = 10; // Adjust margin as needed
        const padding = 10; // Adjust padding as needed

        // Positioning with margins and padding

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

                    const margin = 1.5; // Adjust margin as needed
                    const padding = 10;

                    const xPos = margin; // Adjust as needed
                    const yPos = 10; // Adjust as needed
                    const contentWidth = imgWidth - 2 * 1.5;
                    const contentHeight = pdfHeight - 2 * padding;

                    pdf.addImage(imgData, 'PNG', xPos, yPos, contentWidth, contentHeight);
                    pdf.setFontSize(20);
                    pdf.save('Fee Receipt.pdf');
                })
                .catch((error) => {
                    console.error('Error generating canvas:', error);
                });
        };

        image.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    };

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6 print:hidden">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" onClick={downloadPDF} className="btn btn-success gap-2">
                    <IconDownload />
                    Download PDF
                </button>
            </div>
            <div className="text-2xl font-semibold uppercase mb-4">Invoice</div>
            <div className="w-[1200px] h-full p-6  border-gray-400 border-2" ref={pdfref} id="table-container">
                <div className="flex justify-between flex-wrap gap-4 px-4"></div>
                <div className="flex justify-between">
                    <div className="shrink-0">
                        <img src={localStorage.school_logo} alt="img" className=" w-30 h-12   ltr:ml-auto rtl:mr-auto" />
                    </div>
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>Date:{local}</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                <div className="flex justify-between mt-3">
                    <div className="flex flex-col space-y-2">
                        <div>
                            <strong>School</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.school_name}
                        </div>
                        <div className="relative">
                            <strong>Address</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                            <span className=""> </span>
                        </div>
                        <div>
                            <strong>Phone No</strong>&nbsp;&nbsp;&nbsp;: {studentdtls.school_phone}
                        </div>
                        <div>
                            <strong>Email</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.school_email}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div>
                            <strong> Name</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.std_name}
                        </div>
                        <div>
                            <strong>Class</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.classname}
                        </div>
                        <div>
                            <strong>Section</strong>&nbsp;&nbsp;&nbsp;&nbsp;: {studentdtls.sectionname}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div>
                            <strong>Invoice</strong>&nbsp;&nbsp;&nbsp;: {localStorage.InvoiceID}
                        </div>
                        <div>
                            <strong>Status</strong>&nbsp;&nbsp;&nbsp;&nbsp;:
                            {localStorage.paidstatus == 0 ? (
                                <span className="text-red-600 bg-red-300 p-0.5 px-2 m-1 rounded-sm  text-center whitespace-nowrap">Not Paid</span>
                            ) : localStorage.paidstatus == 1 ? (
                                <span className="text-yellow-600 bg-yellow-300 p-0.5 px-2 m-1 rounded-sm  text-center whitespace-nowrap">Partially Paid</span>
                            ) : (
                                <span className="text-green-600 bg-green-300 p-0.5 px-2 m-1 rounded-sm  text-center whitespace-nowrap">Paid</span>
                            )}
                        </div>
                        <div>
                            <strong>Roll No</strong>&nbsp;&nbsp;&nbsp;:{studentdtls.std_roll}
                        </div>
                        <div>
                            <strong>Reg No</strong>&nbsp;&nbsp;&nbsp;: {studentdtls.std_regno}
                        </div>
                    </div>
                </div>

                <div className="table-responsive mt-6">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Sl.NO</th>
                                <th>Fee Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.map((inc: any, index: number) => {
                                return (
                                    <tr key={inc.index}>
                                        <td>{index + 1}</td>
                                        <td>{inc.fee_term}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">School Fee</div>
                            {invoice.length > 0 && <div className="w-[37%]">₹{invoice[0].amount}</div>}
                        </div>

                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            {invoice.length > 0 && <div className="w-[37%]">₹{invoice[0].discount}</div>}
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Amount After Discount</div>

                            {invoice.length > 0 && <div className="w-[37%]">₹{invoice[0].after_concession}</div>}
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Paid Amount</div>

                            {invoice.length > 0 && <div className="w-[37%]">₹{invoice[0].paidamount}</div>}
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Due Amount</div>
                            {invoice.length > 0 && <div className="w-[37%]">₹{invoice[0].amount_due}</div>}
                        </div>
                    </div>
                </div>
            </div>
            {invoice.length > 0 && invoice[0].paidstatus != 2 && (
                <div className="ltr:text-right rtl:text-left space-y-2">
                    <div className="">
                        <Link to="/payments">
                            <h2 className="print:hidden inline-block mt-2 p-4 py-2 border-blue-400 border text-blue-400 hover:bg-blue-400 hover:text-white">Pay Now</h2>
                        </Link>
                    </div>
                </div>
            )}
            {invoice.length > 0 && invoice[0].paidstatus == 2 && (
                <div className="panel mt-4">
                    <h2>Payments Done</h2>
                    <div className="table-responsive mt-6">
                        <table className="">
                            <thead>
                                <tr>
                                    <th>Sl.NO</th>
                                    <th>Payment Date</th>
                                    <th>Payment Mode</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payment.map((pay: any, index: number) => {
                                    return (
                                        <tr key={pay.index}>
                                            <td>{index + 1}</td>
                                            <td>{pay.paymentdate}</td>
                                            <td>{pay.paymenttype}</td>
                                            <td>{pay.paymentamount}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Preview;
