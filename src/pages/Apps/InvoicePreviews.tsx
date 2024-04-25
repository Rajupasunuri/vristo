import { useEffect, useRef, RefObject } from 'react';
import { useDispatch } from 'react-redux';
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

const Preview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: '3rd Term',
            quantity: 1,
            price: '120',
            amount: '120',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'Fee Type',
        },
        {
            key: 'quantity',
            label: 'Fee Amount',
        },
        {
            key: 'price',
            label: 'Discount',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    const pdfref: RefObject<HTMLDivElement> = useRef(null);

    const dates = new Date();
    const local = dates.toLocaleDateString('en-GB');
    const downloadPdf = () => {
        const input = pdfref.current;
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf('p', 'mm', 'a4', true);
                const pdfwidth = pdf.internal.pageSize.getWidth();
                const pdfheight = pdf.internal.pageSize.getHeight();
                const imgwidth = canvas.width;
                const imgheight = canvas.height;
                const ratio = Math.min(pdfwidth / imgwidth, pdfheight / imgheight);
                const imgx = (pdfwidth - imgwidth * ratio) / 2;
                const imgy = 30;
                pdf.addImage(imgData, 'PNG', imgx, imgy, imgwidth * ratio, imgheight * ratio);
                pdf.save('invoice.pdf');
            });
        } else {
            console.error('Input element is null.');
        }
    };
    const downloadPDF = () => {
        const input = document.getElementById('table-container');
        if (!input) {
            console.error("Element with ID 'table-container' not found.");
            return;
        }

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4'); // Changed document size to A4
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Ensure canvas size is adjusted to fit the entire table
            const pdfHeight = (imgHeight * 210) / imgWidth;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight); // Adjusted image placement and size for A4

            pdf.save('table.pdf');
        });
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
            <div className="panel" ref={pdfref}>
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
                    <div className="flex flex-col">
                        <div>
                            <strong>School</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: LFselearn
                        </div>
                        <div className="relative">
                            <strong>Address</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                            <span className="">Affiliated to the council </span>
                        </div>
                        <div>
                            <strong>Phone No</strong>&nbsp;&nbsp;&nbsp;: 1234567543
                        </div>
                        <div>
                            <strong>Email</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: A
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <strong> Name</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Michael Doe
                        </div>
                        <div>
                            <strong>Class</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Emily Doe
                        </div>
                        <div>
                            <strong>Section</strong>&nbsp;&nbsp;&nbsp;&nbsp;: john.doe@example.com
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <strong>Date</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {local}
                        </div>
                        <div>
                            <strong>Invoice</strong>&nbsp;&nbsp;&nbsp;: 54321
                        </div>
                        <div>
                            <strong>Status</strong>&nbsp;&nbsp;&nbsp;&nbsp;: paid
                        </div>
                        <div>
                            <strong>Roll No</strong>&nbsp;&nbsp;&nbsp;: 12
                        </div>
                        <div>
                            <strong>Reg No</strong>&nbsp;&nbsp;&nbsp;: 123-456
                        </div>
                    </div>
                </div>

                <div className="table-responsive mt-6">
                    <table className="">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left">${item.price}</td>
                                        <td className="ltr:text-right rtl:text-left">${item.amount}</td>
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
                            <div className="w-[37%]">₹67577</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Sub Total</div>
                            <div className="w-[37%]">₹67577</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">₹67577</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Amount After Discount</div>
                            <div className="w-[37%]">₹67577</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Paid Amount</div>
                            <div className="w-[37%]">₹67577</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Due Amount</div>
                            <div className="w-[37%]">₹67577</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">$3945</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ltr:text-right rtl:text-left space-y-2">
                <div className="">
                    <Link to="/payments">
                        <h2 className="print:hidden inline-block mt-2 p-4 py-2 border-blue-400 border text-blue-400 hover:bg-blue-400 hover:text-white">Pay Now</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Preview;
