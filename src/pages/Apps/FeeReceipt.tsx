import { useEffect, useRef, RefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSend from '../../components/Icon/IconSend';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import IconEdit from '../../components/Icon/IconEdit';
import IconPlus from '../../components/Icon/IconPlus';
import IconAt from '../../components/Icon/IconAt';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_YEAR_PAYMENTS_URL } from './query';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { IRootState } from '../../store';

const Preview = () => {
    const dispatch = useDispatch();
    const school_logo = useSelector((state: IRootState) => state.themeConfig.school_logo);
    const [logo, setLogo] = useState(localStorage.school_logo);
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
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
                // if (response.data.error) {
                //     // setUsererror(response.data.message);
                // } else {
                //     const profiledtls = response.data.data;
                //     console.log('profiledtls:', profiledtls);

                //     // setProfile(profiledtls);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: '3rd Term',
            paid: '6000',
            payment: '13-09-2024',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'Fee Type',
        },
        {
            key: 'paid',
            label: 'Paid Amount',
        },
        {
            key: 'payment',
            label: 'Payment Date',
            class: '',
        },
    ];

    const pdfref: RefObject<HTMLDivElement> = useRef(null);

    const dates = new Date();
    const local = dates.toLocaleDateString('en-GB');

    // const downloadPDF = () => {
    //     if (logo) {
    //         console.log('img', logo);
    //         const input = document.getElementById('table-container');
    //         if (!input) {
    //             console.error("Element with ID 'table-container' not found.");
    //             return;
    //         }

    //         // Ensure the image is loaded before generating the PDF
    //         const image = new Image();
    //         image.onload = () => {
    //             html2canvas(input, { scale: 2 })
    //                 .then((canvas) => {
    //                     const pdf = new jsPDF('p', 'mm', 'a4');
    //                     const imgData = canvas.toDataURL('image/png');
    //                     const imgWidth = 210;
    //                     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //                     const pdfHeight = (imgHeight * 210) / imgWidth;
    //                     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
    //                     pdf.save('Fee Receipt.pdf');
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error generating canvas:', error);
    //                 });
    //         };
    //         image.src = localStorage.school_logo;
    //         image.onerror = (error) => {
    //             console.error('Error loading image:', error);
    //         };
    //     }
    // };

    // const downloadPDF = () => {
    //     if (logo) {
    //         console.log('img', logo);
    //         const input = document.getElementById('table-container');
    //         if (!input) {
    //             console.error("Element with ID 'table-container' not found.");
    //             return;
    //         }

    //         // Create an image element
    //         // const image = new Image();
    //         // image.src = localStorage.school_logo;

    //         // Event handler to ensure the image is fully loaded

    //         html2canvas(input, { scale: 2 })
    //             .then((canvas) => {
    //                 const pdf = new jsPDF('p', 'mm', 'a4');
    //                 const imgData = canvas.toDataURL('image/png');
    //                 const imgWidth = 210;
    //                 const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //                 const pdfHeight = (imgHeight * 210) / imgWidth;
    //                 pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
    //                 pdf.save('Fee Receipt.pdf');
    //             })
    //             .catch((error) => {
    //                 console.error('Error generating canvas:', error);
    //             });

    //         onerror = (error) => {
    //             console.error('Error loading image:', error);
    //         };
    //     }
    // };

    const downloadPDF = () => {
        if (logo) {
            const input = document.getElementById('table-container');
            if (!input) {
                console.error("Element with ID 'table-container' not found.");
                return;
            }

            const image = new Image();
            image.src = localStorage.school_logo;
            image.onload = () => {
                html2canvas(input, { scale: 2 })
                    .then((canvas) => {
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgData = canvas.toDataURL('image/png');
                        const imgWidth = 210;
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        const pdfHeight = (imgHeight * 210) / imgWidth;
                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
                        pdf.save('Fee Receipt.pdf');
                    })
                    .catch((error) => {
                        console.error('Error generating canvas:', error);
                    });
            };

            image.onerror = (error) => {
                console.error('Error loading image:', error);
            };
        }
    };

    return (
        <div className="">
            <div className="flex justify-start flex-wrap gap-4 mb-6 print:hidden">
                <button type="button" onClick={downloadPDF} className="btn btn-success gap-2">
                    {/* <IconDownload /> */}
                    Download PDF
                </button>
            </div>
            <div className=" bg-white shadow-md rounded-md w-[1200px] h-[650px] p-12 pt-16 m-auto text-base" id="table-container">
                {/* Rest of the code remains unchanged */}

                <div className="flex justify-center items-center flex-col flex-wrap ">
                    <div className="">
                        <img src={localStorage.school_logo} className="mx-auto w-16 " alt="Image Description" />
                    </div>
                    <strong>{localStorage.school_name}</strong>
                    <div className="flex items-center">
                        <FaLocationDot className="relative inline" />: Affiliated to the Council for the I.C.S.E-New Delhi. SILVER JUBILEE SCHOOL(Estd.1982),
                        <IoMdMail className="relative inline" />: 9949752324,
                        <IoMdMail className="relative inline" />: noreply@lfselearn.com
                    </div>
                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                </div>
                <div className="flex justify-between mt-3">
                    <div className="flex flex-col">
                        <div>
                            <strong>Name</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: John Doe
                        </div>
                        <div>
                            <strong>Class</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 10
                        </div>
                        <div>
                            <strong>Reg. No</strong>&nbsp;&nbsp;&nbsp;: 12345
                        </div>
                        <div>
                            <strong>Section</strong>&nbsp;&nbsp;&nbsp;&nbsp;: A
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <strong>Father's Name</strong>&nbsp;&nbsp;&nbsp;: Michael Doe
                        </div>
                        <div>
                            <strong>Mother's Name</strong>&nbsp;&nbsp;: Emily Doe
                        </div>
                        <div>
                            <strong>Email</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: john.doe@example.com
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <strong>Date</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {local}
                        </div>
                        <div>
                            <strong>Roll No</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 54321
                        </div>
                        <div>
                            <strong>Phone No</strong>&nbsp;: 123-456-7890
                        </div>
                    </div>
                </div>
                {/* <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>Date:{local}</div>
                    </div>
                </div> */}

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.paid}</td>
                                        <td className="">{item.payment}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="ltr:text-right rtl:text-left space-y-2">
                    <div className="">
                        <Link to="">
                            <h2 className=" inline-block pt-8 pr-4">------------------------------------</h2>
                            <p className="  pt-2 pr-4">This is a system generated receipt</p>
                            <p className="  pt-0.5 pr-8">so does not require a signature</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
