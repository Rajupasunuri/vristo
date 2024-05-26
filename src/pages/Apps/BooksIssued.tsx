import { useEffect, useState, Fragment } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import { MY_BOOKS_URL, MY_ISSUED_BOOKS_URL } from './query';
import DataTable from 'react-data-table-component';
import moment from 'moment';

import { FaEye } from 'react-icons/fa6';

interface BOOKS {
    author: string;
    book: string;
    quantity: string;
    rack: string;
    subject_code: string;
    status: string;
}
interface BOOKSISSUED {
    author: string;
    book: string;
    quantity: string;
    rack: string;
    serial_no: string;
    status: string;
    due_date: string;
}
const Tables = () => {
    const [modal10, setModal10] = useState(false);
    const [Books, setBooks] = useState(false);
    const [Issue, setIssue] = useState(true);
    const [modalNotice, setmodalNotice] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', notice: '' });
    const [dataBooks, setdataBooks] = useState<BOOKS[]>([]);
    const [filterBooks, setfilterBooks] = useState<BOOKS[]>([]);
    const [dataBooksIssued, setdataBooksIssued] = useState<BOOKSISSUED[]>([]);
    const [filterBooksIssued, setfilterBooksIssued] = useState<BOOKSISSUED[]>([]);
    const [search, setSearch] = useState('');
    const columnbooks: any = [
        {
            name: 'SL.NO',
            selector: (row: BOOKS, index: number) => index + 1,
        },
        {
            name: 'BOOK NAME',
            selector: (row: BOOKS) => row.book,
        },
        {
            name: 'AUTHOR',
            selector: (row: BOOKS) => row.author,
        },
        {
            name: 'SUBJECT CODE',
            selector: (row: BOOKS) => row.subject_code,
        },
        {
            name: 'QUANTITY',
            selector: (row: BOOKS) => row.quantity,
        },
        {
            name: 'RACK NO',
            selector: (row: BOOKS) => row.rack,
        },
        {
            name: 'STATUS',
            selector: (row: BOOKS) => row.status,
        },

        {
            name: 'Action',
            cell: (row: any) => (
                <button className="border border-blue-400 bg-blue-400 p-2 text-white rounded-md" onClick={() => handlecoledit(row)}>
                    <FaEye />
                </button>
            ),
        },
    ];

    const columnbooksissued: any = [
        {
            name: 'SL.NO',
            selector: (row: BOOKSISSUED, index: number) => index + 1,
        },
        {
            name: 'ISSUED BOOK',
            selector: (row: BOOKSISSUED) => row.book,
        },
        {
            name: 'SERIAL NO',
            selector: (row: BOOKSISSUED) => row.serial_no,
        },
        {
            name: 'DUE DATE',
            selector: (row: BOOKSISSUED) => formatDate(row.due_date),
        },

        {
            name: 'STATUS',
            selector: (row: BOOKSISSUED) => row.status,
        },
    ];

    const handlecoledit = async (row: any) => {
        setModalContent({ title: row.title, notice: row.notice });
        setmodalNotice(true);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });

    useEffect(() => {
        if (Issue) {
            const fetchBookIssue = async () => {
                try {
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.token,
                    };
                    const postData = {
                        studentID: localStorage.studentID,
                        schoolID: localStorage.schoolID,
                        stdadm: localStorage.std_regno,
                        schoolyearID: localStorage.schoolyearID,
                    };
                    const response = await axios.post(MY_ISSUED_BOOKS_URL, postData, {
                        headers: headers,
                    });

                    console.log('issuedbooks', response);
                    setdataBooksIssued(response.data.data.issuedbooks);
                    setfilterBooksIssued(response.data.data.issuedbooks);
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
            fetchBookIssue();
        }
    }, [Issue]);
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
                };
                const response = await axios.post(MY_BOOKS_URL, postData, {
                    headers: headers,
                });

                console.log('books', response);
                setdataBooks(response.data.data.books);
                setfilterBooks(response.data.data.books);
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
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const handleBooks = () => {
        setBooks(false);
        setIssue(true);
    };
    const handleIssue = () => {
        setBooks(true);
        setIssue(false);
    };
    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#ccc',
            },
        },
    };

    function formatDate(date: any): string {
        if (!date || typeof date !== 'string') return 'Invalid Date';
        const formattedDate = moment(date).format('DD:MM:YYYY'); // Using Moment.js to format the date
        return formattedDate;
    }
    return (
        <div className="space-y-6">
            {/* Simple */}

            {/* Hover Table  */}
            <h3 className="font-bold text-lg">Facilities</h3>
            {Books ? (
                <>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5 border-b ">
                            <h5 className="font-semibold text-lg pb-4 dark:text-white-light">Books</h5>
                            <div className="flex justify-start pb-4">
                                <button onClick={handleBooks} className="p-2 bg-white text-blue-700 border-blue-700 border hover:bg-blue-700 rounded-md  hover:text-white font-bold">
                                    Issued Books
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="space-y-6">
                                {/* Skin: Striped  */}
                                <div className="panel">
                                    <div className="datatables">
                                        <DataTable
                                            customStyles={tableHeaderstyle}
                                            columns={columnbooks}
                                            data={filterBooks}
                                            pagination
                                            fixedHeader
                                            highlightOnHover
                                            subHeader
                                            striped
                                            subHeaderComponent={
                                                <input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {Issue ? (
                <>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5 border-b ">
                            <h5 className="font-semibold text-lg pb-4 dark:text-white-light"> Issued Books</h5>
                            <div className="flex justify-start pb-4">
                                <button onClick={handleIssue} className="p-2 bg-white text-blue-700 border-blue-700 border hover:bg-blue-700 rounded-md hover:text-white font-bold">
                                    Books
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="space-y-6">
                                {/* Skin: Striped  */}
                                <div className="panel">
                                    <div className="datatables">
                                        <DataTable
                                            customStyles={tableHeaderstyle}
                                            columns={columnbooksissued}
                                            data={filterBooksIssued}
                                            pagination
                                            fixedHeader
                                            highlightOnHover
                                            subHeader
                                            striped
                                            subHeaderComponent={
                                                <input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <Transition appear show={modalNotice} as={Fragment}>
                <Dialog as="div" open={modalNotice} onClose={() => setmodalNotice(false)} className="sm:w-[300px] w-[100px]">
                    <Transition.Child as={Fragment} enter="ease-out duration-10" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/20">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-md font-bold">{/* {Notices && modalContent.title} {Events && 'Event Details'} {Holidays && 'Holiday Details'} */}Book - English</h5>
                                    <button onClick={() => setmodalNotice(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between  bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-sm ">
                                        {/* {Notices && modalContent.notice} */}
                                        {Books && (
                                            <>
                                                <div className="panel lg:col-span-2 xl:col-span-3">
                                                    <div className="mb-5">
                                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                            <table className="whitespace-nowrap">
                                                                <thead>
                                                                    <tr></tr>
                                                                </thead>
                                                                <tbody className="dark:text-white-dark border-1.5 w-screen">
                                                                    <tr>
                                                                        <td className="w-screen">Book Name</td>
                                                                        <td className="w-[800px]">:</td>
                                                                        <td>Ramesh</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Description</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td>Rani</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Subject</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td>21-11-2023</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Serial No</td>
                                                                        <td className="w-[10px]">:</td>
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </h5>
                                </div>
                                <div className="flex justify-end items-end m-4 ">
                                    <button className="p-2 bg-gray-300 rounded-md" onClick={() => setmodalNotice(false)}>
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Tables;
