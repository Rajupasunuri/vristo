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
            paid: '6000',
            payment: '13-09-2024',
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
            key: 'paid',
            label: 'Paid Amount',
        },
        {
            key: 'payment',
            label: 'Payment Date',
            class: '',
        },
    ];

    const pdfref: RefObject<HTMLDivElement> = useRef(null);

    const dates = new Date();
    const local = dates.toLocaleDateString('en-GB');
    const downloadPdf = () => {
        const input = pdfref.current;
        if (input) {
            const scale = 2;
            html2canvas(input, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf('p', 'mm', 'a4', true);
                const pdfwidth = pdf.internal.pageSize.getWidth();
                const pdfheight = pdf.internal.pageSize.getHeight();
                const imgwidth = canvas.width * 0.75;
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
        <div className="container mx-auto">
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6 print:hidden">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" onClick={downloadPdf} className="btn btn-success gap-2">
                    {/* <IconDownload /> */}
                    Download PDF
                </button>

                <Link to="/invoice" className="btn btn-secondary gap-2">
                    Invoice List
                </Link>
            </div>
            <div className="panel overflow-auto" ref={pdfref}>
                {/* Rest of the code remains unchanged */}

                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-md ">
                        Address:
                        <div className="text-sm ">GKR Towers,Guntur</div>
                        <div className="text-sm">Andhra Pradesh:522034</div>
                        <div className="text-sm">mobile:9160797103</div>
                    </div>
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
                        <div className="space-y-1  text-white-dark">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div>Name:</div>
                                <div>Rakesh</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div>Class:</div>
                                <div>VII</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div>Reg.No:</div>
                                <div>20</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div>Father Name:</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2"></div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Email:</div>
                                <div>rah@gmail.com</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Section:</div>
                                <div>A</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark ">Date :</div>
                                <div className="whitespace-nowrap">{local}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Roll.No:</div>
                                <div className=" ">5</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Phone No:</div>
                                <div>9988776611</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Mother Name:</div>
                                <div></div>
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
                                        <td>{item.paid}</td>
                                        <td className="">{item.payment}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="ltr:text-right rtl:text-left space-y-2">
                    <div className="">
                        <Link to="/payments">
                            <h2 className=" inline-block pt-8 pr-4">------------------------------------</h2>
                            <p className="  pt-2 pr-4">This is a system generated receipt</p>
                            <p className="  pt-0.5 pr-8">so does not require a signature</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
