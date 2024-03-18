import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaRegPlusSquare } from 'react-icons/fa';
import IconEye from '../../components/Icon/IconEye';
import IconX from '../../components/Icon/IconX';
import jsPDF from 'jspdf';
import TableDialog from './TableDialog';
import TableDialog1 from './TableDialog1';
import TableDialog2 from './TableDialog2';
import TableDialog3 from './TableDialog3';
import TableDialog4 from './TableDialog4';

const tableData = [
    {
        id: <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />,
        book: 'English',
        author: 'ram',
        subjectCode: 'Eng',
        quantity: '100',
        rack: '6.7',

        status: '',
        action: '',
        ticket: <TableDialog />,
    },
    {
        id: <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />,
        book: 'English',
        author: 'ram',
        subjectCode: 'Eng',
        quantity: '100',
        rack: '6.7',

        status: '',
        action: '',
        ticket: <TableDialog1 />,
    },
    {
        id: <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />,
        book: 'English',
        author: 'ram',
        subjectCode: 'Eng',
        quantity: '100',
        rack: '6.7',

        status: '',
        action: '',
        ticket: <TableDialog2 />,
    },
    {
        id: <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />,
        book: 'English',
        author: 'ram',
        subjectCode: 'Eng',
        quantity: '100',
        rack: '6.7',

        status: '',
        action: '',
        ticket: <TableDialog3 />,
    },
    {
        id: <FaRegPlusSquare className=" sm:w-10 sm:h-10 w-6 h-6 text-blue-500 " />,
        book: 'English',
        author: 'ram',
        subjectCode: 'Eng',
        quantity: '100',
        rack: '6.7',

        status: '',
        action: '',
        ticket: <TableDialog4 />,
    },
];

const Tables = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const toggleRow = (index: number) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };
    const [modal10, setModal10] = useState(false);

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg">Exam Schedule</h3>
            <div className="panel">
                <div className="flex items-center justify-between mb-5 border-b ">
                    <h5 className="font-semibold text-lg pb-4 dark:text-white-light">Exam Schedule</h5>
                </div>

                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Exam NAME</th>
                                <th>Time</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, index) => (
                                <>
                                    <tr>
                                        <td onClick={() => toggleRow(index)} className="cursor-pointer">
                                            {data.id}
                                        </td>
                                        <td>{data.book}</td>
                                        <td>{data.author}</td>
                                        <td>{data.ticket}</td>
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

export default Tables;
