// import { useEffect, useState, Fragment } from 'react';
// import CodeHighlight from '../../components/Highlight';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import Dropdown from '../../components/Dropdown';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import IconCode from '../../components/Icon/IconCode';
// import IconTrashLines from '../../components/Icon/IconTrashLines';
// import IconXCircle from '../../components/Icon/IconXCircle';
// import IconPencil from '../../components/Icon/IconPencil';
// import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
// import IconCircleCheck from '../../components/Icon/IconCircleCheck';
// import IconSettings from '../../components/Icon/IconSettings';
// import { Dialog, Transition } from '@headlessui/react';
// import IconX from '../../components/Icon/IconX';
// import IconEye from '../../components/Icon/IconEye';
// import { Link } from 'react-router-dom';
// import { FaRegPlusSquare } from 'react-icons/fa';

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
    },
];
// const tableData1 = [
//     {
//         id: 1,
//         book: 'English',
//         author: 'ram',
//         subjectCode: 'Eng',
//         quantity: '100',
//         rack: '6.7',

//         status: '',
//         action: '',
//     },
// ];
// const Tables = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Tables'));
//     });
//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     const [tabs, setTabs] = useState<string[]>([]);
//     const toggleCode = (name: string) => {
//         if (tabs.includes(name)) {
//             setTabs((value) => value.filter((d) => d !== name));
//         } else {
//             setTabs([...tabs, name]);
//         }
//     };
//     const [modal10, setModal10] = useState(false);
//     const [Books, setBooks] = useState(true);
//     const [Issue, setIssue] = useState(false);
//     const handleBooks = () => {
//         setBooks(false);
//         setIssue(true);
//     };
//     const handleIssue = () => {
//         setBooks(true);
//         setIssue(false);
//     };
//     return (
//         <div className="space-y-6">
//             {/* Simple */}

//             {/* Hover Table  */}
//             <h3 className="font-bold text-lg">Exam Schedule</h3>
//             {Books ? (
//                 <>
//                     <div className="panel">
//                         <div className="flex items-center justify-between mb-5 border-b ">
//                             <h5 className="font-semibold text-lg pb-4 dark:text-white-light">Exam Schedule</h5>
//                         </div>

//                         <div className="table-responsive mb-5">
//                             <table className="table-hover">
//                                 <thead>
//                                     <tr>
//                                         <th>#</th>
//                                         <th>Exam NAME</th>
//                                         <th>Time</th>

//                                         <th className="text-center">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {tableData.map((data) => {
//                                         return (
//                                             <tr>
//                                                 <td>{data.id}</td>
//                                                 <td>
//                                                     <div className="whitespace-nowrap">{data.book}</div>
//                                                 </td>
//                                                 <td>{data.author}</td>

// <td>
//     <div>
//         <button onClick={() => setModal10(true)} type="button" className="border border-blue-400 rounded-md">
//             <IconEye />
//         </button>
//         <Transition appear show={modal10} as={Fragment}>
//             <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0" />
//                 </Transition.Child>
//                 <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/10">
//                     <div className="flex min-h-screen items-start justify-center px-4">
//                         <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
//                             <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
//                                 <h5 className="text-lg font-bold">Book School Hotel</h5>
//                                 <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
//                                     <IconX />
//                                 </button>
//                             </div>
//                             <div className="p-5 ">
//                                 <div className="font-bold flex items-center justify-center">School Hostel</div>
//                                 <div className="font-bold flex items-center justify-center">Combine Hostel</div>
//                                 <div className="font-bold flex items-center justify-center">Balaji Hostel</div>
//                             </div>
//                             <div className="mb-5 mr-0 ml-6 flex items-center ">
//                                 <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
//                                     <div className="py-7 px-6">
//                                         <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light border-b">Simple</h5>
//                                         <p className="text-white-dark">No Of Rooms:30</p>
//                                         <p className="text-white-dark">Max. Members per Rooms:5</p>
//                                         <p className="text-white-dark">Members filled:38</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Dialog.Panel>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition>
//     </div>
// </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </>
//             ) : null}
//         </div>
//     );
// };

// export default Tables;
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaRegPlusSquare } from 'react-icons/fa';
import IconEye from '../../components/Icon/IconEye';
import IconX from '../../components/Icon/IconX';

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
                                        <td>
                                            <div>
                                                <button onClick={() => setModal10(true)} type="button" className="border border-blue-400 rounded-md">
                                                    <IconEye />
                                                </button>
                                                <Transition appear show={modal10} as={Fragment}>
                                                    <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <div className="fixed inset-0" />
                                                        </Transition.Child>
                                                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/10">
                                                            <div className="flex min-h-screen items-start justify-center px-4">
                                                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                                                    <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                                                        <h5 className="text-lg font-bold">Book School Hotel</h5>
                                                                        <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
                                                                            <IconX />
                                                                        </button>
                                                                    </div>
                                                                    <div className="p-5 ">
                                                                        <div className="font-bold flex items-center justify-center">School Hostel</div>
                                                                        <div className="font-bold flex items-center justify-center">Combine Hostel</div>
                                                                        <div className="font-bold flex items-center justify-center">Balaji Hostel</div>
                                                                    </div>
                                                                    <div className="mb-5 mr-0 ml-6 flex items-center ">
                                                                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                            <div className="py-7 px-6">
                                                                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light border-b">Simple</h5>
                                                                                <p className="text-white-dark">No Of Rooms:30</p>
                                                                                <p className="text-white-dark">Max. Members per Rooms:5</p>
                                                                                <p className="text-white-dark">Members filled:38</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Dialog.Panel>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </div>
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
                                        <tr className="bg-gray-100">
                                            <td colSpan={4}>
                                                <table>
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
                                            </td>
                                        </tr>
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
