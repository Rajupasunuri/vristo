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

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6 print:hidden">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" onClick={downloadPdf} className="btn btn-success gap-2">
                    <IconDownload />
                    Download PDF
                </button>

                <Link to="/invoice" className="btn btn-secondary gap-2">
                    Invoice List
                </Link>
            </div>
            <div className="panel" ref={pdfref}>
                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Invoice</div>
                    <div className="shrink-0">
                        <img src="/assets/images/crown-logo.png" alt="img" className=" w-30 h-12   ltr:ml-auto rtl:mr-auto" />
                    </div>
                </div>
                <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>Date:{local}</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>
                                School: <span className="">DEMO</span>
                            </div>

                            <div>
                                Address:
                                <span>
                                    <div>GKR Towers,Guntur,Andhra </div>
                                    <div>Pradesh:522034</div>
                                    <div></div>
                                </span>
                            </div>
                            <div>
                                Phone No: <span className="">9160797103</span>
                            </div>
                            <div>
                                Email: <span className="">abc@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Name :</div>
                                <div>Rakesh</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Class:</div>
                                <div>VII</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Section:</div>
                                <div>A</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark ">Invoice :</div>
                                <div className="whitespace-nowrap">#403862</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Status:</div>
                                <div className=" border border-red-500 bg-red-300 p-2 py-0.5 rounded-md">Not Paid</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Roll No:</div>
                                <div>8</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Registration No:</div>
                                <div>56</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
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
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">$3255</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Tax</div>
                            <div className="w-[37%]">$700</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Shipping Rate</div>
                            <div className="w-[37%]">$0</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">$10</div>
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
