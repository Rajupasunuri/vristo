import React, { useEffect, useState } from 'react';

import Tippy from '@tippyjs/react';

import axios from 'axios';
import { MY_INVOICES_URL, MY_INVOICES_YEARS_URL } from './query';

import { NavLink } from 'react-router-dom';

import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';

const List = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [invoYears, setInvoYears] = useState([]);
    const [schoolyearID, setSchoolyearID] = useState(localStorage.schoolyearID);
    const [yearStudentID, setYearStudentID] = useState(localStorage.studentID);
    const [invoiceData, setInvoiceData] = useState<any>([]);
    const [inoviceIdV, setInvoiceIDV] = useState('');
    const [invoLoader, setInvoLoader] = useState(false);
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
                    schoolyearID: schoolyearID,
                    // yearstudentID: 177398,
                    admno: localStorage.std_regno,
                };
                const response = await axios.post(MY_INVOICES_URL, postData, {
                    headers: headers,
                });

                console.log('invoices', response);
                setInvoYears(response.data.data.invo_years);
            } catch (error) {
                console.error('Error fetching data:', error);
                //setInvoLoader(true);
            }
        };

        fetchData();
    }, [schoolyearID]);

    useEffect(() => {
        const fetchYearInvoices = async () => {
            try {
                setInvoLoader(true);
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    yearstudentID: yearStudentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: schoolyearID,

                    admno: localStorage.std_regno,
                };
                console.log('yearstdid', yearStudentID);

                const response = await axios.post(MY_INVOICES_YEARS_URL, postData, {
                    headers: headers,
                });

                console.log('year invoices', response);
                setInvoiceData(response.data.data.invoices);
                setInvoLoader(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setInvoLoader(true);
            }
        };

        fetchYearInvoices();
    }, [yearStudentID]);

    const handleInvoice = (id: any) => {
        localStorage.setItem('InvoiceIDV', id);
    };
    const loadyearinvo = (schyearid: any, yearstdid: any) => {
        if (schoolyearID == schyearid) {
        } else {
            // console.log('changed', yearstdid);
            setSchoolyearID(schyearid);
            setYearStudentID(yearstdid);
        }
    };

    return (
        <>
            {invoLoader ? (
                <div className="h-screen flex items-center justify-center">
                    <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
                </div>
            ) : (
                <div className="panel ">
                    <div className="flex  panel items-center justify-between pb-5 mb-4 border-b-2 overflow-x-auto space-x-1.5">
                        {invoYears.map((year: any, index) => (
                            <div key={index}>
                                <button
                                    className={`btn whitespace-nowrap ${schoolyearID == year.schoolyearID ? 'btn-info' : 'btn-outline-info'}`}
                                    onClick={() => loadyearinvo(year.schoolyearID, year.studentID)}
                                >
                                    {year.schoolyear}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="  card-container">
                        {invoiceData.map((invoice: any) => (
                            <div key={invoice.invoiceID} className=" mb-4 ">
                                <div className=" panel card-body flex flex-col space-y-2">
                                    <div className="mb-5 ">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="table-hover table-striped">
                                                <thead>
                                                    <tr></tr>
                                                </thead>
                                                <tbody className="dark:text-white-dark border-1.5 ">
                                                    <tr>
                                                        <td style={{ width: '200px' }}>FEE TYPE</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> {invoice.fee_term}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                            FEE AMOUNT
                                                        </td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> ₹{invoice.amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>DISCOUNT</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> ₹{invoice.discount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>AFTER DISCOUNT</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> ₹{invoice.after_concession}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>PAID</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> ₹{invoice.paidamount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>DUE AMOUNT</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td> ₹{invoice.amount_due}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>STATUS</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>
                                                            {invoice.paidstatus === 0 ? (
                                                                <span className="text-red-600 bg-red-300 p-0.5 px-4 rounded-sm  text-center whitespace-nowrap">Not Paid</span>
                                                            ) : invoice.paidstatus === 1 ? (
                                                                <span className="text-green-600 bg-green-300 p-0.5 px-4 rounded-sm  text-center whitespace-nowrap">Partially Paid</span>
                                                            ) : (
                                                                <span className="text-green-600 bg-green-300 p-0.5 px-4 rounded-sm  text-center whitespace-nowrap"> Paid</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '200px' }}>DUE DATE</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td className="whitespace-nowrap"> {invoice.due_date}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className=" flex justify-end">
                                        <Tippy className="bg-black text-white" content={invoice.paidstatus === 0 || invoice.paidstatus === 1 ? 'Pay Now' : 'View'}>
                                            <NavLink to="/preview" onClick={() => handleInvoice(invoice.invoiceID)} className="flex hover:text-primary">
                                                {invoice.paidstatus === 0 || invoice.paidstatus === 1 ? (
                                                    <button type="button" className="btn btn-secondary btn-sm ">
                                                        Pay Now
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-secondary btn-sm">
                                                        View
                                                    </button>
                                                )}
                                            </NavLink>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default List;
