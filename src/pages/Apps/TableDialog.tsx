import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import IconX from '../../components/Icon/IconX';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaPrint } from 'react-icons/fa';
import IconDownload from '../../components/Icon/IconDownload';
import moment from 'moment';
//import logo from './../../public/assets/image/profile-27.jpeg';

interface TableDialogProps {
    hall: any; // Change `any` to the appropriate type of `hall` if possible
    exam: any;
}

const TableDialog = ({ hall, exam }: TableDialogProps) => {
    const [hallTicketModal, sethallTicketModal] = useState(false);

    const downloadPDF = () => {
        const input = document.getElementById('table-container');
        if (!input) {
            console.error("Element with ID 'table-container' not found.");
            return;
        }

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // Width of A4 paper in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Ensure canvas size is adjusted to fit the entire table
            const pdfHeight = (imgHeight * 210) / imgWidth;
            const margin = 1; // Adjust margin as needed
            const padding = 10;

            const xPos = margin; // Adjust as needed
            const yPos = 15; // Adjust as needed
            const contentWidth = imgWidth - 2 * 1;
            const contentHeight = pdfHeight - 2 * padding;
            pdf.addImage(imgData, 'PNG', xPos, yPos, contentWidth, contentHeight);
            pdf.setFontSize(10);

            pdf.save('Hall-Ticket.pdf');
        });
    };

    return (
        <div>
            <button onClick={() => sethallTicketModal(true)} type="button" className="">
                <FaPrint className="text-[#4531B2] w-6 h-4" />
            </button>
            <Transition appear show={hallTicketModal} as={Fragment}>
                <Dialog as="div" open={hallTicketModal} onClose={() => sethallTicketModal(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/10">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-lg font-bold">Exam Hall ticket</h5>
                                    <div className="flex space-x-2">
                                        <button onClick={() => sethallTicketModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                        <button onClick={downloadPDF} type="button" className="text-white-dark hover:text-dark">
                                            <IconDownload className="text-blue-500 hover:text-blue-700" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-2 w-[1200px] h-full  panel border-gray-400 border-2 m-2" id="table-container">
                                    <div className="flex justify-center items-center mb-4">
                                        <p>{exam}</p>
                                    </div>
                                    <div className="flex justify-between mb-0 ">
                                        <div className="flex justify-center">
                                            <p>Name:{localStorage.std_name}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p>Class:{localStorage.classname}</p>
                                            <p>Section:{localStorage.sectionname}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p>Roll No:{localStorage.std_roll}</p>
                                            <p>Reg.No:{localStorage.std_regno}</p>
                                        </div>
                                        <div>
                                            <img src="/public/assets/images/C2172.jpg" alt="img" className="w-22 h-20   overflow-hidden  object-cover  mb-5" />
                                        </div>
                                    </div>
                                    <table className="table-hover  table-striped w-[1200px] h-full">
                                        <thead>
                                            <tr className="whitespace-nowrap text-sm">
                                                <th>Date</th>
                                                <th>Subject</th>
                                                <th>Time</th>
                                                <th>Inv.Sign</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hall.map((halltck: any, index: any) => (
                                                <tr className="whitespace-nowrap text-sm">
                                                    <td>{moment(halltck.edate).format('DD-MM-YYYY')}</td>
                                                    <td>{halltck.subject}</td>
                                                    <td>
                                                        {halltck.examfrom} - {halltck.examto}
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};
export default TableDialog;
