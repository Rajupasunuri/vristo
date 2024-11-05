// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import axios from 'axios';
// import { MY_PAY_NOW_URL } from './query';
// import Swal from 'sweetalert2';

// const PayNow = () => {
//     const navigate = useNavigate();

//     const [unpaidinv, setUnPaidInv] = useState([]);
//     const [paynowLoad, setPaynowLoad] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             setPaynowLoad(true);
//             try {
//                 const headers = {
//                     'Content-Type': 'application/json',
//                     Authorization: localStorage.token,
//                 };
//                 const postData = {
//                     studentID: localStorage.studentID,
//                     schoolID: localStorage.schoolID,

//                     admno: localStorage.std_regno,
//                 };
//                 const response = await axios.post(MY_PAY_NOW_URL, postData, {
//                     headers: headers,
//                 });

//                 if (!response.data.error) {
//                 }

//                 if (response.data.error) {
//                     Swal.fire('Request Failed, Try Again Later!');
//                     setPaynowLoad(false);
//                 } else {
//                     setUnPaidInv(response.data.data.invoices);
//                     console.log('paynow', response);
//                     setPaynowLoad(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setPaynowLoad(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleInvoice = async (invid: any, invostdID: any, invoyearID: any, due_date: any,amount_due:any) => {
//         localStorage.setItem('InvoiceID', invid);
//         localStorage.setItem('tempschoolYearID', invoyearID);
//         localStorage.setItem('yearStudentID', invostdID);
//         localStorage.setItem('amount_due', amount_due);

//         navigate('/invoice_pay');
//     };
    

//     return (
//         <div>
//             {/* <ToastContainer position="top-center" autoClose={2000} /> */}
//             <div className="space-y-4">
//                 {paynowLoad ? (
//                     <div className="h-screen flex items-center justify-center">
//                         <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
//                     </div>
//                 ) : (
//                     <div className="panel h-full" id="targetElement">
//                         <div className="flex items-center justify-between dark:text-white-light mb-5">
//                             <h5 className="font-semibold text-lg">Kindly Pay Your Dues</h5>
//                         </div>
//                         <div>
//                             <div className="space-y-6">
//                                 {unpaidinv.map((unpaid: any, index: number) => (
//                                     <div
//                                         key={index}
//                                         className="flex bg-gray-100 p-2 cursor-pointer"
//                                         onClick={() => handleInvoice(unpaid.invoiceID, unpaid.invostdID, unpaid.invoyearID, unpaid.due_date,unpaid.amount_due)}
//                                     >
//                                         <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
//                                             Pay
//                                         </span>
//                                         <div className="px-3 flex-1">
//                                             <div>{unpaid.fee_term}</div>
//                                             <div className="text-xs text-white-dark dark:text-gray-500">Due Date:{unpaid.due_date}</div>
//                                         </div>
//                                         <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">₹{unpaid.amount_due}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PayNow;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { MY_PAY_NOW_EASY_URL } from '../query';
import Swal from 'sweetalert2';

const PayNow = () => {
    const navigate = useNavigate();

    const [unpaidinv, setUnPaidInv] = useState([]);
    const [paynowLoad, setPaynowLoad] = useState(false);
    const [togglePage, setTogglePage] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setPaynowLoad(true);
            try {
                localStorage.setItem('invoiceID', '');
                localStorage.setItem('tempschoolYearID', '');
                localStorage.setItem('yearStudentID', '');
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,

                    admno: localStorage.std_regno,
                };
                const response = await axios.post(MY_PAY_NOW_EASY_URL, postData, {
                    headers: headers,
                });

                if (!response.data.error) {
                }

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                    setPaynowLoad(false);
                } else {
                    setUnPaidInv(response.data.data.invoices);
                    console.log('paynow', response);
                    setPaynowLoad(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setPaynowLoad(false);
            }
        };

        fetchData();
    }, []);

    const handleInvoice = async (invid: any, invostdID: any, invoyearID: any, due_date: any,amount_due:any) => {
        setTogglePage(false)
        localStorage.setItem('invoiceID', invid);
        localStorage.setItem('tempschoolYearID', invoyearID);
        localStorage.setItem('yearStudentID', invostdID);
        localStorage.setItem('amount_due', amount_due);

        
    };

    const proceedPay = ()=>{
        navigate('/invoice_pay');

    }

    return (
        <div>
            {/* <ToastContainer position="top-center" autoClose={2000} /> */}
            {togglePage?<div className="space-y-4">
                {paynowLoad ? (
                    <div className="h-screen flex items-center justify-center">
                        <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
                    </div>
                ) : (
                    <div className="panel h-full" id="targetElement">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Kindly Pay Your Dues</h5>
                        </div>
                        <div>
                            <div className="space-y-6">
                                {unpaidinv.map((unpaid: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex bg-gray-100 p-2 cursor-pointer"
                                        onClick={() => handleInvoice(unpaid.invoiceID, unpaid.invostdID, unpaid.invoyearID, unpaid.due_date,unpaid.amount_due)}
                                    >
                                        <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                            Pay
                                        </span>
                                        <div className="px-3 flex-1">
                                            <div>{unpaid.fee_term}</div>
                                            <div className="text-xs text-white-dark dark:text-gray-500">Due Date:{unpaid.due_date}</div>
                                        </div>
                                        <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center">₹{unpaid.amount_due}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>:<><div className=" panel  bg-white shadow-md rounded-md p-6 mt-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <img src={localStorage.school_logo} alt="School Logo" className="w-20 h-auto" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Invoice : {localStorage.InvoiceID}</h1>

                        <p>Date: {new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                </div>

                <div className="mt-6 ">
                    <h2 className="text-lg font-semibold">Payment Details</h2>
                    <div className='table-responsive'>
                        <table className="w-full mt-3 ">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Description</th>
                                    <th className="border px-4 py-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Name</td>
                                    <td className="border px-4 py-2">{localStorage.std_name}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Email</td>
                                    <td className="border px-4 py-2">rajupasunuri1999@gmail.com</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">StudentID</td>
                                    <td className="border px-4 py-2"> {localStorage.studentID}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">SchoolID</td>
                                    <td className="border px-4 py-2"> {localStorage.schoolID}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">School yearID</td>
                                    <td className="border px-4 py-2">{localStorage.schoolyearID}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Admno</td>
                                    <td className="border px-4 py-2">{localStorage.std_regno}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">InvoiceID</td>
                                    <td className="border px-4 py-2">{localStorage.invoiceID}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Due amount</td>
                                    <td className="border px-4 py-2">{localStorage.amount_due}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-6 flex space-x-2">
                    
                    <button onClick={proceedPay} className='btn btn-secondary w-full'>Continue</button>
                    {/* <button onClick={()=>setTogglePage(true)} className='btn btn-primary w-full'>Go back</button> */}



                </div>
            </div></>}
        </div>
    );
};

export default PayNow;
