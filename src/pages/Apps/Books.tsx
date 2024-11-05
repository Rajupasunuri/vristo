import { useEffect, useState, Fragment } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import { MY_BOOKS_URL, MY_ISSUED_BOOKS_URL } from '../query';
import moment from 'moment';
import Swal from 'sweetalert2';
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
const Books = () => {
    const [Books, setBooks] = useState(true);
    const [Issue, setIssue] = useState(false);
    const [modalNotice, setmodalNotice] = useState(false);

    const [dataBooks, setdataBooks] = useState<BOOKS[]>([]);
    const [dataBooksIssued, setdataBooksIssued] = useState<BOOKSISSUED[]>([]);

    const [bookRack, setBookRack] = useState('');
    const [bookAuth, setBookAuth] = useState('');
    const [book, setBook] = useState('');
    const [bookDue, setBookDue] = useState('');
    const [bookQuantity, setBookQuantity] = useState('');
    const [bookDsc, setBookDsc] = useState('');

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
                    if (response.data.error) {
                        // Swal.fire('Request Failed, Try Again Later!');
                    } else {
                        setdataBooksIssued(response.data.data.issuedbooks);
                    }
                    console.log('issuedbooks', response);
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

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setdataBooks(response.data.data.books);
                }

                console.log('books', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const handleBooks = () => {
        setBooks(false);
        setIssue(true);
    };
    const handleIssue = () => {
        setBooks(true);
        setIssue(false);
    };

    const handleBookModal = (author: any, book: any, due_quantity: any, quantity: any, rack: any, subject_code: any) => {
        setBookAuth(author);
        setBook(book);
        setBookDue(due_quantity);
        setBookQuantity(quantity);
        setBookRack(rack);
        setBookDsc(subject_code);
        setmodalNotice(true);
    };
    return (
        <div className="space-y-6">
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

                        <div className="space-y-2">
                            {dataBooks.map((book: any, index: number) => (
                                <div key={index} className="flex bg-gray-100 p-2 ">
                                    <span
                                        onClick={() => handleBookModal(book.author, book.book, book.due_quantity, book.quantity, book.rack, book.subject_code)}
                                        className=" cursor-pointer shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light"
                                    >
                                        <FaEye className="text-blue-400 w-8 h-4" />
                                    </span>

                                    <div className="px-3 flex-1">
                                        <div className="text-sm">{book.book}</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">Author : {book.author}</div>
                                    </div>
                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                        {parseInt(book.quantity) - parseInt(book.due_quantity)}
                                    </span>
                                </div>
                            ))}
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
                        <div className="space-y-2">
                            <div className="  card-container">
                                {dataBooksIssued.map((book: any, index: number) => (
                                    <div key={index} className=" mb-4 ">
                                        <div className=" panel card-body flex flex-col space-y-2">
                                            <div className="mb-5 ">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="table-hover table-striped">
                                                        <thead>
                                                            <tr></tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5 ">
                                                            <tr>
                                                                <td className="whitespace-nowrap" style={{ width: '200px' }}>
                                                                    Issued Book
                                                                </td>
                                                                <td style={{ width: '10px' }}>:</td>
                                                                <td> {book.book}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                    Serial No
                                                                </td>
                                                                <td style={{ width: '10px' }}>:</td>
                                                                <td> {book.serial_no}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '200px' }}>Due Date</td>
                                                                <td style={{ width: '10px' }}>:</td>
                                                                <td> {moment(book.due_date).format('DD-MM-YYYY')}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '200px' }}>Status</td>
                                                                <td style={{ width: '10px' }}>:</td>
                                                                <td>
                                                                    {new Date(book.due_date) < new Date() ? (
                                                                        <div className="text-[#FFA800] bg-[#FFF4DE] text-center p-2 rounded-md whitespace-nowrap">Due Date Expired</div>
                                                                    ) : (
                                                                        <div className="text-[#8950FC] text-center bg-[#EEE5FF] p-2 rounded-md">Issued</div>
                                                                    )}{' '}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                    <h5 className="text-md font-bold">Book - {book}</h5>
                                    <button onClick={() => setmodalNotice(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between  bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-sm ">
                                        {Books && (
                                            <>
                                                <div className=" panel card-body justify-center flex flex-col space-y-2">
                                                    <div className="mb-5 ">
                                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                            <table className="table-hover table-striped">
                                                                <thead>
                                                                    <tr></tr>
                                                                </thead>
                                                                <tbody className="dark:text-white-dark border-1.5 ">
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Book Name</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td> {book}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="">
                                                                            Subject Code
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td> {bookDsc}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Author</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{bookAuth} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Due Quantity</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{bookDue} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Quantity</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{bookQuantity} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Rack No</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>{bookRack} </td>
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

export default Books;
