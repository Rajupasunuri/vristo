import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { PiArrowElbowRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { MY_INVOICE_PAY_URL, MY_PAYU_HASH_URL, MY_PAY_NOW_URL } from '../query';
import axios from 'axios';
import Swal from 'sweetalert2';
const Invoice_pay = () => {
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [payuselected, setPayuSelected] = useState(false);
    const [paygselected, setPaygSelected] = useState(false);
    const [axisselected, setAxisSelected] = useState(false);
    const [axis, setAxis] = useState(0);
    const [payg, setPayg] = useState(0);
    const [payu, setPayu] = useState(0);
    const [payuHashResponse, setPayuHashResponse] = useState<any>();
    const [paygHashResponse, setPaygHashResponse] = useState<any>();
    const [axisHashResponse, setAxisHashResponse] = useState<any>();
    const [hitPayuHash, setHitPayuHash] = useState(false);
    const [hitPaygHash, setHitPaygHash] = useState(false);
    const [hitAxisPayHash, setHitAxisPayHash] = useState(false);

    const handleGatewaySelection = (gateway: any) => {
        if (gateway == 'payu') {
            setPayuSelected(true);
            setPaygSelected(false);
            setAxisSelected(false);
        } else if (gateway == 'payg') {
            setPayuSelected(false);
            setPaygSelected(true);
            setAxisSelected(false);
        } else if (gateway == 'axispay') {
            setPayuSelected(false);
            setPaygSelected(false);
            setAxisSelected(true);
        }
        setSelectedGateway(gateway);
    };

    useEffect(() => {
        const InvoicePay = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,

                    // schoolyearID: localStorage.schoolyearID,
                };
                const response = await axios.post(MY_INVOICE_PAY_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    // Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('INVOICE PAY', response);

                    setAxis(response.data.data.gateways.axis);
                    setPayg(response.data.data.gateways.payg);
                    setPayu(response.data.data.gateways.payu);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        InvoicePay();
    }, []);

    const payuHash = () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            admno: localStorage.std_regno,
            invoiceID: localStorage.InvoiceID,
        };

        axios
            .post(MY_PAYU_HASH_URL, postData, {
                headers: headers,
            })
            .then((response) => {
                // console.log('payu hash', response.data);

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('payu hash', response);
                    setPayuHashResponse(response.data.data.payu);
                    setHitPayuHash(true);
                }
            })
            .catch((err: any) => {
                console.log('payu error', err);
            });
    };

    const paygHash = () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            admno: localStorage.std_regno,
            invoiceID: localStorage.InvoiceID,
        };

        axios
            .post(MY_PAYU_HASH_URL, postData, {
                headers: headers,
            })
            .then((response) => {
                // console.log('payu hash', response.data);

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('payu hash', response);
                    setPaygHashResponse(response.data.data.payg);
                    setHitPaygHash(true);
                }
            })
            .catch((err: any) => {
                console.log('payu error', err);
            });
    };

    const axisPayHash = () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            admno: localStorage.std_regno,
            invoiceID: localStorage.InvoiceID,
        };

        axios
            .post(MY_PAYU_HASH_URL, postData, {
                headers: headers,
            })
            .then((response) => {
                // console.log('payu hash', response.data);

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('payu hash', response);
                    setAxisHashResponse(response.data.data.axispay);
                    setHitAxisPayHash(true);
                }
            })
            .catch((err: any) => {
                console.log('payu error', err);
            });
    };

    useEffect(() => {
        if (hitPayuHash) {
            const afterHash = async () => {
                try {
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.token,
                    };
                    const postData = {
                        studentID: localStorage.studentID,
                        schoolID: localStorage.schoolID,

                        admno: localStorage.std_regno,
                        payumoney_demo: payuHashResponse.payumoney_demo,
                        payumoney_key: payuHashResponse.payumoney_key,
                    };
                    const response = await axios.post(MY_PAY_NOW_URL, postData, {
                        headers: headers,
                    });

                    if (response.data.error) {
                        // Swal.fire('Request Failed, Try Again Later!');
                        console.log('error occured');
                    } else {
                        console.log('After hash', response);
                        setHitPayuHash(false);
                    }
                } catch (error) {
                    console.error('Error ', error);
                }
            };

            afterHash();
        }
    }, [hitPayuHash]);
    useEffect(() => {
        if (hitAxisPayHash) {
            const afterHash = async () => {
                try {
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.token,
                    };
                    const postData = {
                        studentID: localStorage.studentID,
                        schoolID: localStorage.schoolID,

                        admno: localStorage.std_regno,
                        payumoney_demo: axisHashResponse.payumoney_demo,
                        payumoney_key: axisHashResponse.payumoney_key,
                    };
                    const response = await axios.post(MY_PAY_NOW_URL, postData, {
                        headers: headers,
                    });

                    if (response.data.error) {
                        // Swal.fire('Request Failed, Try Again Later!');
                        console.log('error occured');
                    } else {
                        console.log('After hash', response);
                        setHitAxisPayHash(false);
                    }
                } catch (error) {
                    console.error('Error ', error);
                }
            };

            afterHash();
        }
    }, [hitAxisPayHash]);
    useEffect(() => {
        if (hitPaygHash) {
            const afterHash = async () => {
                try {
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.token,
                    };
                    const postData = {
                        studentID: localStorage.studentID,
                        schoolID: localStorage.schoolID,

                        admno: localStorage.std_regno,
                        payumoney_demo: paygHashResponse.payumoney_demo,
                        payumoney_key: paygHashResponse.payumoney_key,
                    };
                    const response = await axios.post(MY_PAY_NOW_URL, postData, {
                        headers: headers,
                    });

                    if (response.data.error) {
                        // Swal.fire('Request Failed, Try Again Later!');
                        console.log('error occured');
                    } else {
                        console.log('After hash', response);
                        setHitPaygHash(false);
                    }
                } catch (error) {
                    console.error('Error ', error);
                }
            };

            afterHash();
        }
    }, [hitPaygHash]);
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Select Payment GateWay</h2>
            <div className="panel flex-col space-y-4">
                <div className=" flex justify-between items-center">
                    {payu > 0 && (
                        <div className={`${payuselected && 'scale-125'}`}>
                            <img className={`w-19 h-12  cursor-pointer`} src="/assets/images/payu.png" alt="logo" onClick={() => handleGatewaySelection('payu')} />
                            {/* <PiArrowElbowRight className="text-green-600 text-lg font-bold absolute  top-[40%] right-[40%]" /> */}
                        </div>
                    )}
                    {payg > 0 && (
                        <div className={`${selectedGateway == 'payg' && paygselected && 'scale-125'}`}>
                            <img className="w-19 h-12  cursor-pointer  " src="/assets/images/payg.png" alt="logo" onClick={() => handleGatewaySelection('payg')} />
                        </div>
                    )}
                    {axis > 0 && (
                        <div className={`${selectedGateway == 'axispay' && axisselected && 'scale-125'}`}>
                            <img className="w-19 h-10 cursor-pointer " src="/assets/images/axisPay.png" alt="logo" onClick={() => handleGatewaySelection('axispay')} />
                        </div>
                    )}
                </div>
            </div>
            {payuselected && (
                <div className=" flex justify-center items-center mt-6">
                    <button type="button" onClick={payuHash} className="btn btn-success btn-sm text-lg ">
                        Proceed With Payu <FaArrowRight className="text-white ml-2" />
                    </button>
                </div>
            )}
            {paygselected && (
                <div className=" flex justify-center items-center mt-6">
                    <button type="button" onClick={paygHash} className="btn btn-success text-lg">
                        Proceed With Payg <FaArrowRight className="text-white ml-2" />
                    </button>
                </div>
            )}
            {axisselected && (
                <div className=" flex justify-center items-center mt-6">
                    <button type="button" onClick={axisPayHash} className="btn btn-success text-lg">
                        Proceed With Axis <FaArrowRight className="text-white ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Invoice_pay;
