import { useEffect, useRef, RefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import html2canvas from 'html2canvas';
import { IRootState } from '../../store';

import jsPDF from 'jspdf';
import { MY_INVOICE_URL } from '../query';
import axios from 'axios';
import Swal from 'sweetalert2';

const InvoicePreview = () => {
    const studentdtls = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [invoice, setInvoice] = useState<any>([]);
    const [payment, setPayment] = useState<any>([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
        setIsGeneratingPDF(true);
        const image = new Image();
        image.src = localStorage.school_logo;
        image.onload = () => {
            html2canvas(input, { scale: .8 })
                .then((canvas) => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 210;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    const pdfHeight = (imgHeight * 210) / imgWidth;

                    const margin = 1.5; // Adjust margin as needed
                    const padding = 10;

                    const xPos = 16; // Adjust as needed
                    const yPos = 10; // Adjust as needed
                    const contentWidth = imgWidth - 30 * 1;
                    const contentHeight = pdfHeight - 2 * padding;

                    pdf.addImage(imgData, 'PNG', xPos, yPos, contentWidth, contentHeight);
                    pdf.setFontSize(40);
                    pdf.save('Fee Receipt.pdf');
                    setIsGeneratingPDF(false);
                })
                .catch((error) => {
                    setIsGeneratingPDF(false);
                    console.error('Error generating canvas:', error);
                });
        };

        image.onerror = (error) => {
            console.error('Error loading image:', error);
            setIsGeneratingPDF(false);
        };
    };

    return (
        <div>
            <div className="flex items-center  justify-between flex-wrap gap-4 mb-6 print:hidden">
                <div className="text-2xl font-semibold uppercase ">Invoice</div>

                <button type="button" onClick={downloadPDF} className="btn btn-success btn-sm  gap-2">
                    {/* <IconDownload /> */}
                    Download PDF
                </button>
            </div>




            <div className=" panel  bg-white shadow-md rounded-md p-6 mt-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <img src={localStorage.school_logo} alt="School Logo" className="w-20 h-auto" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Invoice : {localStorage.InvoiceID}</h1>
                        <h1 className="text-lg font-bold">Status : {localStorage.paidstatus == 0 ? (
                            <span className="text-red-600  p-0.5 px-2 m-1  rounded-sm  text-center whitespace-nowrap">Not Paid</span>
                        ) : localStorage.paidstatus == 1 ? (
                            <span className="text-yellow-600  p-0.5 px-2 m-1 rounded-sm  text-center whitespace-nowrap">Partially Paid</span>
                        ) : (
                            <span className="text-green-600  p-0.5  px-2  rounded-sm  text-center whitespace-nowrap">Paid</span>
                        )}</h1>
                        <p>Date: {new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Payment Details</h2>
                    <table className="w-full mt-3">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">School Fee</td>
                                <td className="border px-4 py-2">{invoice.length > 0 && <span>₹{invoice[0].amount}</span>}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Discount</td>
                                <td className="border px-4 py-2">{invoice.length > 0 && <span >₹{invoice[0].discount}</span>}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Amount After Discount</td>
                                <td className="border px-4 py-2"> {invoice.length > 0 && <span >₹{invoice[0].after_concession}</span>}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Paid Amount</td>
                                <td className="border px-4 py-2"> {invoice.length > 0 && <span >₹{invoice[0].paidamount}</span>}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Due Amount</td>
                                <td className="border px-4 py-2">{invoice.length > 0 && <span >₹{invoice[0].amount_due}</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <p className="text-lg font-semibold">Total Amount : {invoice.length > 0 && <span >₹{invoice[0].paidamount}</span>}</p>
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

            <div className={`w-[1200px] h-full p-6 border-gray-400 border-2 ${isGeneratingPDF ? 'block' : 'hidden'}`} ref={pdfref} id="table-container">
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




                <table className='table-responsive' style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ fontSize: '20px' }}>
                                <div style={{ marginBottom: '10px' }}>School: {studentdtls.school_name}</div>
                                <div style={{ marginBottom: '10px' }} >
                                    <div className='w-[300px]'>Address
                                        :
                                        raghunathpally ,hanamkonda ,warangal </div>
                                </div>  <div style={{ marginBottom: '10px' }}>Phone No: {studentdtls.school_phone}</div> <div style={{ marginBottom: '10px' }}>Email: {studentdtls.school_email}</div>
                            </td>
                            <td style={{ fontSize: '20px' }}>
                                <div style={{ marginBottom: '10px' }}>Name : {studentdtls.std_name}</div><div style={{ marginBottom: '10px' }}>Class : {studentdtls.classname}</div>
                                <div style={{ marginBottom: '10px' }}>Section : {studentdtls.sectionname}</div></td>
                            <td style={{ fontSize: '20px' }}><div style={{ marginBottom: '10px' }}>Invoice : {localStorage.InvoiceID}</div><div style={{ marginBottom: '10px' }}>Status :  {localStorage.paidstatus == 0 ? (
                                <span className="text-red-600  p-0.5 px-2 m-1  rounded-sm  text-center whitespace-nowrap">Not Paid</span>
                            ) : localStorage.paidstatus == 1 ? (
                                <span className="text-yellow-600  p-0.5 px-2 m-1 rounded-sm  text-center whitespace-nowrap">Partially Paid</span>
                            ) : (
                                <span className="text-green-600  p-0.5  px-2  rounded-sm  text-center whitespace-nowrap">Paid</span>
                            )}</div><div style={{ marginBottom: '10px' }}>Roll No : {studentdtls.std_roll}</div><div style={{ marginBottom: '10px' }}>Reg No : {studentdtls.std_regno}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>








                <div className="">
                    <table className=" table-responsive">
                        <thead>
                            <tr>
                                <th style={{ fontSize: '20px' }}> Sl.NO</th>
                                <th style={{ fontSize: '20px' }}>Fee Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.map((inc: any, index: number) => {
                                return (
                                    <tr key={inc.index}>
                                        <td style={{ fontSize: '20px' }}>{index + 1}</td>
                                        <td style={{ fontSize: '20px' }}>{inc.fee_term}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center" style={{ fontSize: '20px' }}>
                            <div className="flex-1" style={{ fontSize: '20px' }}>School Fee</div>
                            {invoice.length > 0 && <div className="w-[37%]" style={{ fontSize: '20px' }}>₹{invoice[0].amount}</div>}
                        </div>

                        <div className="flex items-center" style={{ fontSize: '20px' }}>
                            <div className="flex-1" style={{ fontSize: '20px' }}>Discount</div>
                            {invoice.length > 0 && <div className="w-[37%]" style={{ fontSize: '20px' }}>₹{invoice[0].discount}</div>}
                        </div>
                        <div className="flex items-center" style={{ fontSize: '20px' }}>
                            <div className="flex-1" style={{ fontSize: '20px' }}>Amount After Discount</div>

                            {invoice.length > 0 && <div className="w-[37%]" style={{ fontSize: '20px' }}>₹{invoice[0].after_concession}</div>}
                        </div>
                        <div className="flex items-center" style={{ fontSize: '20px' }}>
                            <div className="flex-1" style={{ fontSize: '20px' }}>Paid Amount</div>

                            {invoice.length > 0 && <div className="w-[37%]" style={{ fontSize: '20px' }}>₹{invoice[0].paidamount}</div>}
                        </div>
                        <div className="flex items-center" style={{ fontSize: '20px' }}>
                            <div className="flex-1" style={{ fontSize: '20px' }}>Due Amount</div>
                            {invoice.length > 0 && <div className="w-[37%]" style={{ fontSize: '20px' }}>₹{invoice[0].amount_due}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;

