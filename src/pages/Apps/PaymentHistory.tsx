import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { MY_YEAR_PAYMENTS_URL } from './query';
import FeeReceipt from './FeeReceipt';
import Swal from 'sweetalert2';

const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
    const [payments, setPayments] = useState([]);
    const [feeReceipt, setFeeReceipt] = useState<boolean>(false);
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

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setPayments(response.data.data.payments);
                }

                console.log('payments', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
    const [tabs, setTabs] = useState<string[]>([]);

    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });

    const handleReceipt = () => {
        setFeeReceipt(true);
    };

    return (
        <>
            {feeReceipt ? (
                <FeeReceipt payments={payments} setFeeReceipt={setFeeReceipt} feereceipt={true} />
            ) : (
                <div className="panel">
                    <h2 className="mb-4 font-bold">Payment History</h2>

                    <div className="flex justify-end flex-wrap gap-4 mb-6 print:hidden">
                        <button onClick={handleReceipt} type="button" className="btn btn-success btn-sm gap-2">
                            {/* <IconDownload /> */}
                            Payment History
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
            )}
        </>
    );
};

export default Tabs;
