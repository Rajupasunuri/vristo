import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const PaymentFailure = () => {
   
     const navigate = useNavigate();

     useEffect(()=>{

        axios.get(window.location.href)
        .then((res)=>{
            console.log("results payu",res)

        }).catch((err)=>{
            console.log("something went wrong", err)
        })

     },[])
    

    

    const showAlert = async (type: any) => {
          if (type === "fail") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                padding: '2em',
                customClass: 'sweet-alerts',
                confirmButtonText: 'Go to payments',
                allowOutsideClick: false,
                
            }).then((result) => {
                if (result.isConfirmed) {
                  
                    navigate('/paynow');
                }
            });
        }
    };
    useEffect(()=>{
    //   showAlert("fail")
    },[])

    const backPayments = () =>{
         navigate('/paynow');
    }

    return (
        <>

       
        <button type="button" onClick={backPayments} className="btn btn-success btn-sm gap-2">
                   Go to payments
                </button>
       
        </>
    );
};

export default PaymentFailure;

