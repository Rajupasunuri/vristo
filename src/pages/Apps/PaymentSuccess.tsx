import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
   
     const navigate = useNavigate();
   
    

    

    const showAlert = async (type: any) => {
         if (type === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Payment Success!',
                text: '',
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
      showAlert("success")
    },[])

    return (
        <></>
    );
};

export default PaymentSuccess;

