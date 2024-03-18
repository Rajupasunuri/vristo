import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import IconEye from '../../components/Icon/IconEye';
import IconX from '../../components/Icon/IconX';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaPrint } from 'react-icons/fa';
import IconDownload from '../../components/Icon/IconDownload';

const TableDialog3 = () => {
    const [modal3, setModal3] = useState(false);
    const downloadPDF = () => {
        const input = document.getElementById('table-container');
        if (!input) {
            console.error("Element with ID 'table-container' not found.");
            return;
        }

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a6');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 105;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Ensure canvas size is adjusted to fit the entire table
            const pdfHeight = (imgHeight * 105) / imgWidth;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, 148);

            pdf.save('table.pdf');
        });
    };
    return (
        <div>
            <button onClick={() => setModal3(true)} type="button" className="border border-blue-400 rounded-md">
                <IconEye />
            </button>
            <Transition appear show={modal3} as={Fragment}>
                <Dialog as="div" open={modal3} onClose={() => setModal3(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/10">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-lg font-bold">Exam Hall ticket</h5>
                                    <div className="flex space-x-2">
                                        <button onClick={() => setModal3(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                        <button onClick={downloadPDF} type="button" className="text-white-dark hover:text-dark">
                                            <IconDownload className="text-blue-500 hover:text-blue-700" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5 table-responsive " id="table-container">
                                    <div className="flex justify-center items-center mb-4">
                                        <p>MID1 Exam Hall Ticket</p>
                                    </div>
                                    <div className="flex justify-between mb-0">
                                        <div>
                                            <p>Name:Raju</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p>Class:VII</p>
                                            <p>Section:A</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p>Roll No:5</p>
                                            <p>Reg.No:20</p>
                                        </div>
                                        <div>
                                            <img src="/public/assets/images/C2172.jpg" alt="img" className="w-22 h-20   overflow-hidden  object-cover  mb-5" />
                                        </div>
                                    </div>
                                    <table className="table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Final Marks</th>
                                                <th>Pass Marks</th>
                                                <th className="text-center">Date</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Telugu</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>Hindi</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>Maths</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>English1</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>Physics</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>Chemistry</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>Biology</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>History & Civics</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
                                            <tr>
                                                <td>Geography</td>
                                                <td>50</td>
                                                <td>20</td>
                                                <td>05 Jun 2023</td>
                                                <td>09:00AM-11:00AM</td>
                                            </tr>
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
export default TableDialog3;
