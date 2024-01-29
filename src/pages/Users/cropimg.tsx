// import React, { ChangeEvent,useState,useEffect } from "react";
// import { IMG_URL, NO_IMG} from "../Apps/query";

// import axios from "axios";
// export const Uploadfile=(props)=>{

//     const [img,setImg]=useState(null);
//     // function handlefile(event: ChangeEvent<HTMLInputElement>): void {
//     //    // throw new Error("Function not implemented.");

//     // }
//     const handleFile=(event)=>{
//      //  if (event.target.files && event.target.files[0]) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             if (e.target && e.target.result) {
//               setImg(e.target.result.toString());
//               //e.target.result.toString()
//             }
//           };
//           console.log('yghjnhgfdsfghjk',reader.readAsDataURL(event.target.files[0]));

// }

//       const fileupload=()=>{
//         const formdata=new FormData();
//         formdata.append("file",img);
//         formdata.append('item', props.onwhich);
//         formdata.append('uid', localStorage.usercode);
//         formdata.append('w', props.imgw);
//         formdata.append('h', props.imgh);
//         formdata.append('token', localStorage.token);
//         //formdata.append('uid', localStorage.usercode);
//         //formdata.append('token', localStorage.token);
//         axios.post(IMG_URL,formdata)
//         .then((response)=>{
//             console.log('response',response.data)
//         })
//         .catch((error)=>console.log("error",error))
//       }

//     return(
//         <>
//         <input type="file" onChange={handleFile}/>
//         {img && <img src={img} alt="image" style={{ maxWidth: "100%" }} />}

//         <input type='button' onClick={fileupload} className="submit" value="upload"/>

//         </>

//     );
// }
// export default Uploadfile;
//
// import React, { useState } from "react";
// import { IMG_URL } from "../Apps/query";
// import axios from "axios";

// export const Uploadfile = (props) => {
//   const [img, setImg] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleFile = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target && e.target.result) {
//           setImg(event.target.files[0]);
//         }
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const fileUpload = () => {
//     const formData = new FormData();
//     formData.append("file", img);
//     formData.append("item", props.onwhich);
//     formData.append("uid", localStorage.usercode);
//     formData.append("w", props.imgw);
//     formData.append("h", props.imgh);
//     formData.append("token", localStorage.token);

//     axios
//       .post(IMG_URL, formData)
//       .then((response) => {
//         console.log("response", response.data);
//         localStorage.setItem('url-img', response.data.urlimage);
//       })
//       .catch((error) => console.log("error", error));
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//      <input type="file" onChange={handleFile} />
//      if (img==null) {
//       <img src="https://placekitten.com/200/300" alt="alternative"/>
//      }
//      else{
//  {img && <img src={URL.createObjectURL(img)} alt="image" style={{ maxWidth: "80%" }} />}
//      }

//             <input type="button" onClick={fileUpload} className="submit" value="upload" />
//       {/* <div className="card" onClick={openModal}>
//         You can customize the card content
//         {img && <img src={URL.createObjectURL(img)} alt="image" style={{ maxWidth: "80%" }} />}
//       </div>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>&times;</span>

//             Your existing file upload code
//             <input type="file" onChange={handleFile} />
//             {img && <img src={URL.createObjectURL(img)} alt="image" style={{ maxWidth: "80%" }} />}
//             <input type="button" onClick={fileUpload} className="submit" value="upload" />
//           </div>
//         </div>
//       )} */}
//     </>
//   );
// };

// export default Uploadfile;

import React, { useState } from 'react';
import { IMG_URL } from '../Apps/query';
import axios from 'axios';
//import { Modal } from "@mantine/core";
import Modal from 'react-modal';

export const Uploadfile = (props) => {
    const [img, setImg] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [upload, setUpload] = useState('');

    const handleFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setImg(event.target.files[0]);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const fileUpload = () => {
        const formData = new FormData();
        formData.append('file', img);
        formData.append('item', props.onwhich);
        formData.append('uid', localStorage.usercode);
        formData.append('w', props.imgw);
        formData.append('h', props.imgh);
        formData.append('token', localStorage.token);

        axios
            .post(IMG_URL, formData)
            .then((response) => {
                console.log('response', response.data);
                localStorage.setItem('url-img', response.data.urlimage);
            })
            .catch((error) => console.log('error', error));
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const opened = () => {
        setShowModal(true);
    };

    const isUploaded = () => {
        setUpload('Please Select An Image');
        setShowModal(false);
    };

    return (
        <>
            {img == null ? (
                <img src="https://placekitten.com/200/300" alt="alternative" onClick={opened} />
            ) : (
                <img src={URL.createObjectURL(img)} alt="image" style={{ maxWidth: '80%' }} onClick={opened} />
            )}

            <Modal
                isOpen={showModal}
                onClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                style={{
                    content: {
                        background: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '100%',
                        margin: 'auto',
                        maxHeight: '30%', // Adjust the height as needed
                        // margin:'100px auto auto auto',
                    },
                    overlay: {
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: '9999',
                    },
                }}
                onRequestClose={closeModal}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #ddd' }}>
                    <h5 style={{ color: 'blue' }}>Image Upload</h5>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={closeModal}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&times;</span>
                    </button>
                </div>

                <input type="file" onChange={handleFile} />

                {/* //<button onClick={closeModal} style={{display:'flex',top:'30px',left:'50px'}}>close</button> */}
                <div>
                    {' '}
                    <input
                        type="button"
                        onClick={() => {
                            fileUpload();
                            closeModal();
                            isUploaded();
                        }}
                        className="submit"
                        value="upload"
                        style={{ display: 'flex', justifyContent: 'flex-end', border: '1px solid grey', margin: '10px 0px', padding: '1px', color: 'white', backgroundColor: 'pink' }}
                    />
                </div>
                <div>{upload}</div>
            </Modal>
            {/* <div className="card" onClick={openModal}>
        You can customize the card content
        {img && <img src={URL.createObjectURL(img)} alt="image" style={{ maxWidth: "80%" }} />}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>

            Your existing file upload code
            <input type="file" onChange={handleFile} />
            {img && <img src={URL.createObjectURL(img)} alt="image" style={{ maxWidth: "80%" }} />}
            <input type="button" onClick={fileUpload} className="submit" value="upload" />
          </div>
        </div>
      )} */}
        </>
    );
};

export default Uploadfile;
