import { useEffect, useState, Fragment } from 'react';
import CodeHighlight from '../../components/Highlight';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconPencil from '../../components/Icon/IconPencil';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconCircleCheck from '../../components/Icon/IconCircleCheck';
import IconSettings from '../../components/Icon/IconSettings';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import IconEye from '../../components/Icon/IconEye';
import IconDownload from '../../components/Icon/IconDownload';
import ReactPlayer from 'react-player';
import img from '/public/crown-logo.png';
import html2canvas from 'html2canvas';
import React from 'react';
import { MY_ASSIGNMENTS_URL, MY_ASSIGNMENT_FILE_URL, MY_DASHBOARD_URL, MY_IMG_URL } from './query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaUpload } from 'react-icons/fa6';
import { preventDefault } from '@fullcalendar/core/internal';

//import print from '/public/Application.pdf';

const tableData = [
    {
        id: 1,
        hostel: 'School Hostel',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
    },
    {
        id: 2,
        hostel: 'School Hostel',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
    },
    {
        id: 3,
        hostel: 'School Hostel',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
    },
];

const Tables = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState<any>([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    const [modal10, setModal10] = useState(false);
    const [assignments, setAssignments] = useState<any>([]);

    const imgRef = React.createRef<HTMLImageElement>();

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
                    sectionID: localStorage.sectionID,
                    classesID: localStorage.classesID,
                    schoolyearID: localStorage.schoolyearID,
                    //admno: localStorage.std_regno,
                };
                const response = await axios.post(MY_ASSIGNMENTS_URL, postData, {
                    headers: headers,
                });

                console.log('assignments', response);
                setAssignments(response.data.data.assignments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const handleDownload = () => {
        const imageElement = imgRef.current;

        if (imageElement) {
            // Added this check
            html2canvas(imageElement).then((canvas) => {
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'downloaded-image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
    };
    // const download = (url) => {
    //     const filename = url.split('/').pop();
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.setAttribute('download1', filename);
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    // };
    const downloadPdf = () => {
        const pdfUrl = '/src/Application.pdf';
        // Update the path based on your actual PDF file
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Application.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadFile = () => {
        const url = 'https://example.com/your-file-url'; // Replace this URL with your file URL
        const link = document.createElement('a');
        link.href = url;
        // link.setAttribute('download', true);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // const handlefile = (event: any) => {
    //     //setFile(event.target.files[0]);
    //     setFile(Array.from(event.target.files));
    // };

    // const handleupload = async (e: any) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     file.forEach((file: any) => {
    //         formData.append('files', file);
    //     });
    //     try {
    //         const response = await axios.post(MY_IMG_URL, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         console.log('Files uploaded successfully:', response);
    //     } catch (error) {
    //         console.error('Error uploading files:', error);
    //     }
    // };

    const handleFileChange = (e: any) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(MY_IMG_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const handleFileDownload = async (assgnID: any, ext: any, title: any) => {
        const assigntitle = title.toLowerCase();
        try {
            // Replace 'YOUR_BUCKET_NAME' and 'YOUR_OBJECT_KEY' with your S3 bucket name and object key
            const response = await axios.get(MY_ASSIGNMENT_FILE_URL + localStorage.schoolID + '/' + localStorage.studentID + '/' + assgnID, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log('url', url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${assigntitle}.${ext}`); // Specify the desired file name
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    return (
        <div className="space-y-6">
            <form onSubmit={handleFormSubmit}>
                <input type="file" onChange={handleFileChange} multiple />
                <button>upload</button>
            </form>
            {/* Simple */}

            {/* Hover Table  */}
            <h3 className="font-bold text-lg">Assignments</h3>
            {/* <div className="panel">
                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th> CREATED DATE</th>
                                <th>TITLE</th>
                                <th>SUBJECT</th>
                                <th>LAST DATE</th>

                                <th>
                                    <button>
                                        <IconDownload />
                                    </button>
                                </th>

                                <th>STATUS</th>
                                <th className="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data.hostel}</div>
                                        </td>
                                        <td>{data.type}</td>
                                        <td>{data.rooms}</td>
                                        <td>{data.members}</td>
                                        <td>
                                            <button>
                                                <IconDownload />
                                            </button>
                                        </td>

                                        <td>{data.availability}</td>
                                        <td>
                                            <div>
                                                <button onClick={() => setModal10(true)} type="button" className="border border-blue-400 rounded-md">
                                                    <IconEye />
                                                </button>
                                                <Transition appear show={modal10} as={Fragment}>
                                                    <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-100"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <div className="fixed inset-0" />
                                                        </Transition.Child>
                                                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/20">
                                                            <div className="flex min-h-screen items-start justify-center px-4">
                                                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                                                    <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                                                        <h5 className="text-lg font-bold">Book School Hotel</h5>
                                                                        <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
                                                                            <IconX />
                                                                        </button>
                                                                    </div>
                                                                   
                                                                    <ReactPlayer
                                                                        url="https://youtu.be/N2d7puNyPqw?si=fKY2WghPTEFRzlpR"
                                                                        controls
                                                                        width="700"
                                                                        height="800"
                                                                        className="p-4 w-full h-full"
                                                                    />

                                                                    <img ref={imgRef} src={img} alt="" width="400px" height="300px" />
                                                                    <button onClick={handleDownload}>Download Image</button>
                                                                    <button onClick={downloadPdf}>Download PDF</button>

                                                                    <div className="p-5 ">
                                                                        <div className="font-bold flex items-center justify-center">School Hostel</div>
                                                                        <div className="font-bold flex items-center justify-center">Combine Hostel</div>
                                                                        <div className="font-bold flex items-center justify-center">Balaji Hostel</div>
                                                                    </div>
                                                                    <div className="mb-5 mr-0 ml-6 flex items-center ">
                                                                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                            <div className="py-7 px-6">
                                                                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light border-b">Simple</h5>
                                                                                <p className="text-white-dark">No Of Rooms:30</p>
                                                                                <p className="text-white-dark">Max. Members per Rooms:5</p>
                                                                                <p className="text-white-dark">Members filled:38</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Dialog.Panel>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div> */}

            <div className="panel h-full w-full">
                <div className="flex items-center justify-between mb-5">{/* <h5 className="font-semibold text-lg dark:text-white-light">Top Selling Product</h5> */}</div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr className="border-b-0">
                                <th className="ltr:rounded-l-md rtl:rounded-r-md">Sl.No</th>
                                <th className="whitespace-nowrap">Created Date</th>
                                <th>Title</th>
                                <th>Subject</th>
                                <th className="ltr:rounded-r-md rtl:rounded-l-md whitespace-nowrap">Last Date</th>
                                <th>
                                    <IconDownload />
                                </th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assign: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{assign.created_on}</td>
                                        <td className="whitespace-nowrap">{assign.title}</td>
                                        <td className="whitespace-nowrap">{assign.subject_name}</td>
                                        <td className="whitespace-nowrap">{assign.deadlinedate}</td>
                                        <td>
                                            <button onClick={() => handleFileDownload(assign.assignmentID, assign.fileExt, assign.title)}>
                                                <IconDownload />
                                            </button>
                                        </td>
                                        <td>
                                            <span
                                                className={`whitespace-nowrap p-1 rounded-md ${
                                                    assign.astatus === 'Date Expired'
                                                        ? '  bg-red-200 text-red-400'
                                                        : assign.astatus === 'Submitted'
                                                        ? 'bg-blue-200 text-blue-400'
                                                        : ' bg-orange-200  text-orange-400'
                                                }`}
                                            >
                                                {assign.astatus}
                                            </span>
                                        </td>
                                        <td className="flex space-x-1">
                                            <button type="button" onClick={downloadFile} className=" rounded-md">
                                                <FaEye className="text-blue-400 w-8 h-4" />
                                            </button>
                                            {assign.ddays > 0 && assign.astatus != 'Submitted' ? (
                                                <button type="button" className="btn btn-secondary btn-sm">
                                                    <FaUpload className="mr-2" /> Upload
                                                </button>
                                            ) : assign.astatus === 'Submitted' ? null : null}
                                        </td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tables;
