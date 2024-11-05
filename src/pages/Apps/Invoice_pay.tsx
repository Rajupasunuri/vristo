


import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { PiArrowElbowRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { MY_GET_HASH_URL, MY_INVOICE_PAY_URL, MY_PAYMENT_RESPONSE_SURL, MY_PAYU_HASH_URL, MY_PAYU_NOW_URL, } from '../query';
import axios from 'axios';
import Swal from 'sweetalert2';
const Invoice_pay = () => {
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [payuselected, setPayuSelected] = useState(false);
    const [paygselected, setPaygSelected] = useState(false);
    const [axisselected, setAxisSelected] = useState(false);
    const [axis, setAxis] = useState(0);
    const [payg, setPayg] = useState(1);
    const [payu, setPayu] = useState(0);
    const [payuHashResponse, setPayuHashResponse] = useState<any>();
    const [paygHashResponse, setPaygHashResponse] = useState<any>();
    const [axisHashResponse, setAxisHashResponse] = useState<any>();
    const [hitPayuHash, setHitPayuHash] = useState(false);
    const [hitPaygHash, setHitPaygHash] = useState(false);
    const [hitAxisPayHash, setHitAxisPayHash] = useState(false);
    const [transactionID, setTransactionID] = useState<any>(null)
    const [transID, setTransID] = useState<any>(null)
    const [hashs, setHash] = useState<any>(null)
    const [keys, setKey] = useState<any>('2oXOOcz6')
    const [togglepay, setTogglepay] = useState<any>(true)
    const [amount, setAmount] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

   

  //let reshash;

    const handleGatewaySelection = (gateway: any) => {
        if (gateway == 'payu') {
            setPayuSelected(true);
            setPaygSelected(false);
            setAxisSelected(false);
            //This method will generate the hashvalue

  const paymentReq = async () => {
    try {
      console.log("localStorage.amount_due",localStorage.amount_due)
      const amountDue = parseFloat(localStorage.amount_due);
      const amountDueStr = parseFloat(localStorage.amount_due);
      console.log("typye float", typeof amountDueStr)
        const data = {
    txnid: transactionID, //String
    amount: amountDue,  //Float
    productinfo: "school_fee",  //String
    firstname: localStorage.std_name,   //String
    email: "rajupasunuri1999@gmail.com",  //String
    studentID: localStorage.studentID,
    invoiceID: localStorage.invoiceID,
  };
     let reshash = await axios.post(MY_GET_HASH_URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHash(reshash.data.hash)
      console.log("reshash",reshash)
    } catch {
      console.log("Payment Error");
    }
  };
  paymentReq();
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
                    Swal.fire('Gateway Down, Try Again Later!');
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

    

    function generateTransactionID() {
        const timestamp = Date.now()
        const randomNum = Math.floor(Math.random() * 1000000)
        const merchantPrefix = 'T';
        const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
        return setTransactionID(transactionID)

    }

    useEffect(() => {
        generateTransactionID()
    }, [])
    //////////////////////////////////
   


    const payuPayment = async ()=>{
      //This method will use that hash value to make the transaction complete
  
    console.log("localStorage.amount_due",localStorage.amount_due)
    
   

    const amountDueStr = parseFloat(localStorage.amount_due);
    const schurl = localStorage.sch_url.replace('/school', '');
        const surl = schurl + "/payment-success";
        const furl = schurl + "/payment-failure";
    // console.log("amountDue pares",amountDue)
 
    const pd = {
     
      txnid: transactionID, //String,
      amount: amountDueStr,  //Float
      
      productinfo: "school_fee",
      firstname: localStorage.std_name,
      
      email: "rajupasunuri1999@gmail.com",
      phone: "9346559640",
      surl: surl, //url called if payment is successful, we have written the code in server.js below in the medium article
      furl: "http://localhost:5173/payment-failure", //url called when payment fails
      hash: hashs,  //hashvalue 
      studentID: localStorage.studentID,
    invoiceID: localStorage.invoiceID,
      // service_provider: "payu_paisa",
    };
    let res;
    try {
      res = await axios.post(MY_PAYU_NOW_URL, JSON.stringify(pd), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // await setSelf(res.data);
      // await handleCheckOpen();
      console.log("url response",res)
       window.location.href = res.data;
        return res;
    } catch (err) {
      console.log("response error");
    }
  
    }


    return (
        <div>
            <div>{togglepay && <> <h2 className="text-lg font-bold mb-4">Select Payment GateWay</h2>
                <div className="panel flex-col space-y-4">
                    <div className=" flex justify-between items-center">
                        {payu > 0 && (
                            <div className={`${payuselected && 'scale-125'}`}>
                                <img className={`w-19 h-12  cursor-pointer`} src="/assets/images/payu.png" alt="logo" onClick={() => handleGatewaySelection('payu')} />
                                {/* <PiArrowElbowRight className="text-green-600 text-lg font-bold absolute  top-[40%] right-[40%]" /> */}
                            </div>
                        )}
                       
                    </div>
                </div>
                {payuselected && (
                    <div className=" flex justify-center items-center mt-6">
                        
                           
                            <button type="button" onClick={payuPayment} className="btn btn-success btn-sm text-lg ">
                                Proceed With Payu <FaArrowRight className="text-white ml-2" />
                            </button>
                        
                    </div>
                )}
               </>}</div>




            
        </div>
    );
};

export default Invoice_pay;
