import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconSettings from '../../components/Icon/IconSettings';
import Tippy from '@tippyjs/react';
import IconXCircle from '../../components/Icon/IconXCircle';
import TalentShow from './TalentShow';
import { DataTable } from 'mantine-datatable';
import IconEye from '../../components/Icon/IconEye';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconInbox from '../../components/Icon/IconInbox';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_YEAR_PAYMENTS_URL } from './query';

const rowData = [
    {
        id: 1,
        examtitle: '7th Physics',
        action: <button></button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Date Expired</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        duration: '00:45',
        subject: 'Physics',
        examdate: '14 Oct 2023',
        time: '10:30AM-10:50AM',
        question: '15',
        marks: '15',
        feetype: '',
        paymentmethod: '',
        amount: '',
        paymentdate: '',
        paidby: '',
    },
    {
        id: 2,
        action: <button></button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: '7th Maths',
        duration: '00:45',
        subject: 'Maths',
        examdate: '14 Oct 2023',
        time: '10:51AM-11:11AM',
        question: '10',
        marks: '10',
        feetype: '',
        paymentmethod: '',
        amount: '',
        paymentdate: '',
        paidby: '',
    },
];

const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
    const [payments, setPayments] = useState([]);
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
                    schoolyearID: localStorage.schoolyearID,
                };
                const response = await axios.post(MY_YEAR_PAYMENTS_URL, postData, {
                    headers: headers,
                });

                console.log('payments', response);
                setPayments(response.data.data.payments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(rowData);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    //item.action.toLowerCase().includes(search.toLowerCase()) ||
                    // item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.type.toLowerCase().includes(search.toLowerCase()) ||
                    item.started.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <>
            <h2 className="mb-4 font-bold">Payment History</h2>
            <div className="panel">
                <div className="flex justify-end flex-wrap gap-4 mb-6 print:hidden">
                    <button type="button" className="btn btn-success gap-2">
                        {/* <IconDownload /> */}
                        Download PDF
                    </button>
                </div>
                <div className="  card-container">
                    {payments.map((payment: any) => (
                        <div key={payment.invoiceID} className=" mb-4 ">
                            <div className=" panel card-body flex flex-col space-y-2">
                                <div className="mb-5 ">
                                    <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                        <table className="table-hover table-striped">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody className="dark:text-white-dark border-1.5 ">
                                                <tr>
                                                    <td style={{ width: '200px' }}>Term</td>
                                                    <td style={{ width: '10px' }}>:</td>
                                                    <td> {payment.fee_struc_term}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                        Payment Method
                                                    </td>
                                                    <td style={{ width: '10px' }}>:</td>
                                                    <td> {payment.paymenttype}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '200px' }}>Amount</td>
                                                    <td style={{ width: '10px' }}>:</td>
                                                    <td> ₹{payment.paymentamount}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '200px' }}>Payment Date</td>
                                                    <td style={{ width: '10px' }}>:</td>
                                                    <td className="whitespace-nowrap"> {payment.paymentdate}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '200px' }}>Paid By</td>
                                                    <td style={{ width: '10px' }}>:</td>
                                                    <td> {payment.paidat}</td>
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
        </>
    );
};

export default Tabs;
