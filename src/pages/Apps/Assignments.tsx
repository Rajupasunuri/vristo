import { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import IconDownload from '../../components/Icon/IconDownload';
//import React from 'react';
import { MY_ASSIGNMENTS_FILES_URL, MY_ASSIGNMENTS_URL, MY_ASSIGNMENT_FILE_URL, MY_DELETE_FILE_URL, MY_DOWNLOAD_ASSIGNMENTS_FILE_URL, MY_IMG_URL } from '../query';
import axios from 'axios';
import { FaArrowDownLong } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FaFilePdf, FaFileAlt } from 'react-icons/fa';
//import print from '/public/Application.pdf';

const Assignments = () => {
    const dispatch = useDispatch();
    const [fileErr, setFileErr] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [assignID, setAssignID] = useState(0);
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });

    const [assignModal, setAssignModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [assignments, setAssignments] = useState<any>([]);
    const [refresh, setRefresh] = useState(false);
    const [selectFlMsg, setSelectFlMsg] = useState(false);
    const [invalidType, setInvalidType] = useState(false);
    const [selectFlLng, setSelectFlLng] = useState(0);

    const [ddays, setDdays] = useState('');
    const [showAssignFiles, setShowAssignFiles] = useState<any>([]);
    const [showAssignFilesUp, setShowAssignFilesUp] = useState<any>([]);

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
                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setAssignments(response.data.data.assignments);
                }
                console.log('assignments', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [refresh]);

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setSelectFlMsg(true);
            setSelectFlLng(selectedFiles.length);
        }
    }, [selectedFiles]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            assignmentID: assignID,
            // parentID: localStorage.parentID,
        };
        const loginurl = MY_ASSIGNMENTS_FILES_URL;
        axios
            .post(loginurl, postData, {
                headers: headers,
            })
            .then((response) => {
                if (response.data.error) {
                    // Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setShowAssignFiles(response.data.data.assignment_files);
                }
            })
            .catch((err: any) => {
                console.log('files received error', err);
            });
    }, [refresh]);

    const handleAssignModal = (assgnID: any, title: any, ddays: any) => {
        setDdays(ddays);
        localStorage.setItem('assTitle', title);
        setAssignID(assgnID);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            assignmentID: assgnID,
            // parentID: localStorage.parentID,
        };
        const loginurl = MY_ASSIGNMENTS_FILES_URL;
        axios
            .post(loginurl, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('files received', response.data);

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setShowAssignFiles(response.data.data.assignment_files);
                }
            })
            .catch((err: any) => {
                console.log('files received error', err);
            });
        setAssignModal(true);
    };

    const handleFileChange = (event: any) => {

        const allowedTypes = ["image/jpeg", "image/png", "application/x-zip-compressed", "image/gif", "image/bmp", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "text/plain", "application/zip"];
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log("file type", file.type)
            if (!allowedTypes.includes(file.type)) {
                // Not a valid file type, handle accordingly (e.g., show error message)
                console.log("Invalid file type:", file.name);
                setSelectFlMsg(false)
                setFileErr(false)
                setInvalidType(true)
                setSelectedFiles([]);
                // Optionally, clear the input field
                event.target.value = '';
            } else {
                setInvalidType(false)
                // Valid file type, handle the file (e.g., upload)
                console.log("Valid file:", file.name);
                setFileErr(false);
                setSelectedFiles(Array.from(event.target.files));
            }
        }



    };

    const uploadClick = () => {
        // setLoading(true)
        if (selectedFiles.length == 0) {
            // toast.error('Select files to upload');
            return;
        }
    };
    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        if (selectedFiles.length == 0) {
            // If no files are selected, display an error message or take appropriate action
            console.log('Please select a file.');
            setFileErr(true);
            setInvalidType(false)
            return;
        }
        setSelectFlMsg(false);
        setLoading(true);

        let formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('schoolID', localStorage.schoolID);
        formData.append('studentID', localStorage.studentID);
        formData.append('schoolyearID', localStorage.schoolyearID);
        formData.append('assignmentID', localStorage.assignmentID);
        console.log('formData', formData);
        try {
            const response = await axios.post(MY_IMG_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.token,
                },
            });

            console.log('Upload successful:', response.data);
            //setValue(100);
            setSelectedFiles([]);
            setRefresh(!refresh);
            setLoading(false);

            if (!response.data.error) toast.success('uploaded successfully');
            if (response.data.error) toast.success('uploade Failed');
        } catch (error) {
            setLoading(false);
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

    const handleAssgnAwsFileDownload = async (assgnID: any, file_name: any) => {
        //const assigntitle = title.toLowerCase();
        console.log('filename', file_name);
        console.log('filename id', assgnID);

        //let fileExt = file_name.split('.').pop();
        try {
            // Replace 'YOUR_BUCKET_NAME' and 'YOUR_OBJECT_KEY' with your S3 bucket name and object key
            const response = await axios.get(MY_DOWNLOAD_ASSIGNMENTS_FILE_URL + localStorage.schoolID + '/' + localStorage.studentID + '/' + assgnID, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log('url', url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file_name); // Specify the desired file name
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const showUploadModal = (assgnID: any, ddays: any) => {
        setDdays(ddays);
        setSelectFlMsg(false);
        setFileErr(false);
        setInvalidType(false)
        setAssignID(assgnID);
        localStorage.setItem('assignmentID', assgnID);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            assignmentID: assgnID,
            // parentID: localStorage.parentID,
        };

        axios
            .post(MY_ASSIGNMENTS_FILES_URL, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('files received', response.data);

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setShowAssignFilesUp(response.data.data.assignment_files);
                }
            })
            .catch((err: any) => {
                console.log('files received error', err);
            });
        setUploadModal(true);
    };

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            schoolyearID: localStorage.schoolyearID,
            assignmentID: assignID,
            // parentID: localStorage.parentID,
        };

        axios
            .post(MY_ASSIGNMENTS_FILES_URL, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('files received', response.data);

                if (response.data.error) {
                    //Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setShowAssignFilesUp(response.data.data.assignment_files);
                }
            })
            .catch((err: any) => {
                console.log('files received error', err);
            });
    }, [refresh]);

    const handleDeleteFile = async (assID: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.value) {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };

                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,
                    assignmentID: assignID,
                    assgn_ansid: assID,
                    // parentID: localStorage.parentID,
                };
                try {
                    // Make an API call to delete the file
                    const response = await axios.post(MY_DELETE_FILE_URL, postData, {
                        headers: headers,
                    });
                    if (!response.data.error) {
                        console.log('file deleted', response);
                        setRefresh(!refresh);
                        Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                    } else {
                        Swal.fire({ title: 'Error!', text: 'Failed to delete the file.', icon: 'error', customClass: 'sweet-alerts' });
                    }
                } catch (error) {
                    console.error('Error deleting file:', error);
                    Swal.fire({ title: 'Error!', text: 'Failed to delete the file.', icon: 'error', customClass: 'sweet-alerts' });
                }
                // Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className=" space-y-4">
                <h2 className="mb-4 text-lg font-bold">Assignments</h2>
                {assignments.map((assign: any, index: number) => {
                    return (
                        <div key={index} className="panel h-full p-0 border-0 overflow-hidden">
                            <div className="p-6 bg-gradient-to-r from-[#4361ee] to-[#160f6b] min-h-[140px]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="bg-black/50 rounded-md p-1 ltr:pr-3 rtl:pl-3 flex items-center justify-center text-white font-semibold">
                                        {/* <img className="w-8 h-8 rounded-full border-2 border-white/50 block object-cover ltr:mr-1 rtl:ml-1" src="/assets/images/profile-34.jpeg" alt="avatar" /> */}
                                        {assign.subject_name}
                                    </div>
                                    <button onClick={() => handleFileDownload(assign.assignmentID, assign.fileExt, assign.title)}>
                                        <IconDownload className="text-white w-8 h-8" />
                                    </button>
                                </div>
                                <div className="text-white flex justify-between items-center">
                                    <p className="text-lg">{assign.title}</p>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="mb-5">
                                    <span
                                        className={` px-4 py-1.5 before:bg-black before:w-1.5 before:h-1.5 before:rounded-full ltr:before:mr-2 rtl:before:ml-2 before:inline-block whitespace-nowrap p-1 rounded-md ${assign.astatus === 'Date Expired'
                                                ? '  bg-red-200 text-red-600'
                                                : assign.astatus === 'Submitted'
                                                    ? 'bg-blue-200 text-blue-600'
                                                    : ' bg-orange-200  text-orange-600'
                                            }`}
                                    >
                                        {assign.astatus}
                                    </span>
                                </div>
                                <div className="mb-5 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#515365] font-semibold">Created On</p>
                                        <p className="text-base">
                                            <span className="font-semibold">{assign.created_on}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#515365] font-semibold">Last Date</p>
                                        <p className="text-base">
                                            <span className="font-semibold ">{assign.deadlinedate}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center px-2 flex justify-around">
                                    <button type="button" onClick={() => handleAssignModal(assign.assignmentID, assign.title, assign.ddays)} className="btn btn-secondary ltr:mr-2 rtl:ml-2">
                                        View Details
                                    </button>
                                    {(assign.ddays > 0 || assign.astatus === 'Submitted') && assign.ddays > 0 ? (
                                        <button type="button" onClick={() => showUploadModal(assign.assignmentID, assign.ddays)} className="btn btn-success">
                                            Upload
                                        </button>
                                    ) : assign.astatus === 'Submitted' ? null : null}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                <Transition appear show={assignModal} as={Fragment}>
                    <Dialog as="div" open={assignModal} onClose={() => setAssignModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Assignment Details</h5>
                                        <button onClick={() => setAssignModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <h2 className="mb-4 text-[#4ec5ff]">General Information</h2>
                                            <table className="table-hover table-striped">
                                                <thead>
                                                    <tr></tr>
                                                </thead>
                                                {assignments.map((file: any, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            {file.assignmentID == assignID ? (
                                                                <tbody className="dark:text-white-dark border-1.5 ">
                                                                    <tr>
                                                                        <td style={{ width: '200px' }}>Title</td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td className="whitespace-nowrap">{file.title} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Subject
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td className="whitespace-nowrap">{file.subject_name} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Description
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td className="whitespace-nowrap">{file.description} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Last Submission Date
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td className="whitespace-nowrap">{file.deadlinedate} </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Assignment File
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleFileDownload(file.assignmentID, file.fileExt, file.title)}
                                                                                className="btn btn-outline-secondary btn-sm"
                                                                            >
                                                                                Download
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Created Date
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td className="whitespace-nowrap"> {file.created_on}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Created By
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td className="whitespace-nowrap"> {file.created_by}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '200px' }} className="whitespace-nowrap">
                                                                            Status
                                                                        </td>
                                                                        <td style={{ width: '10px' }}>:</td>
                                                                        <td>
                                                                            <span
                                                                                className={`whitespace-nowrap p-1 rounded-md ${file.astatus === 'Date Expired'
                                                                                        ? '  bg-red-200 text-red-400'
                                                                                        : file.astatus === 'Submitted'
                                                                                            ? 'bg-blue-200 text-blue-400'
                                                                                            : ' bg-orange-200  text-orange-400'
                                                                                    }`}
                                                                            >
                                                                                {file.astatus}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </table>
                                        </div>
                                        <div className="p-5 mt-2">
                                            {showAssignFiles.length > 0 ? (
                                                <div className="flex items-center justify-between mb-5">
                                                    <h2 className=" text-[#4ec5ff]">Submitted Files</h2>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            <div className="space-y-2">
                                                {showAssignFiles.map((file: any, index: number) => (
                                                    <div key={index} className="flex justify-between bg-gray-100 p-2 ">
                                                        <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                                            {file.file_name.endsWith('.pdf') ||
                                                                file.file_name.endsWith('.ppt') ||
                                                                file.file_name.endsWith('.pptx') ||
                                                                file.file_name.endsWith('.doc') ||
                                                                file.file_name.endsWith('.docx') ||
                                                                file.file_name.endsWith('.xlsx') ||
                                                                file.file_name.endsWith('.xls') ||
                                                                file.file_name.endsWith('.zip') ||
                                                                file.file_name.endsWith('.mp4') ||
                                                                file.file_name.endsWith('.mp3') ||
                                                                file.file_name.endsWith('.txt') ||
                                                                file.file_name.endsWith('.csv') ? (
                                                                // Render PDF button if file is PDF
                                                                <button onClick={() => handleAssgnAwsFileDownload(file.assgn_ansid, file.file_name)}>
                                                                    <FaFileAlt />
                                                                </button>
                                                            ) : (
                                                                // Render image if file is an image
                                                                <img
                                                                    src={`https://crown-school-site.s3.ap-south-1.amazonaws.com/${file.file_path}`}
                                                                    className="w-6 cursor-pointer"
                                                                    onClick={() => handleAssgnAwsFileDownload(file.assgn_ansid, file.file_name)}
                                                                    alt="File"
                                                                />
                                                            )}
                                                        </span>
                                                        <div className="px-3 flex-1  overflow-x-auto">
                                                            <div className="text-xs break-words">{file.file_name}</div>
                                                        </div>

                                                        {ddays != '0' ? (
                                                            <span
                                                                className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center"
                                                                onClick={() => handleDeleteFile(file.assgn_ansid)}
                                                            >
                                                                <MdDelete />
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div>
                <Transition appear show={uploadModal} as={Fragment}>
                    <Dialog as="div" open={uploadModal} onClose={() => setUploadModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold"> Upload Assignment Files</h5>
                                        <button onClick={() => setUploadModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        {fileErr && uploadModal ? (
                                            <div className="flex items-center justify-between mb-5 text-red-500 animate-pulse  ">Select the File or Files before uploading</div>
                                        ) : (
                                            ''
                                        )}
                                        {selectFlMsg && !fileErr ? (
                                            <div className="flex items-center justify-between mb-5 text-green-500 animate-pulse  ">
                                                {selectFlLng} {selectFlLng > 1 ? 'files' : 'file'} imported, Please click Upload!
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {invalidType && (
                                            <div className="flex items-center justify-between mb-5 text-red-500 animate-pulse  ">Not a Valid File to Upload</div>
                                        )}
                                        <form onSubmit={handleFormSubmit}>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                hidden
                                                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                                                multiple
                                                id="upload"

                                            />
                                            <label
                                                htmlFor="upload"
                                                className=" border-[2px] border-spacing-8 cursor-pointer border-dashed panel flex flex-col space-y-2 justify-center items-center border-gray-500 "
                                            >
                                                <FaArrowDownLong className="w-8 h-8" />
                                                <div>Browse Files Here</div>
                                            </label>
                                            <button type="submit" className="btn btn-secondary mb-2" onClick={uploadClick}>
                                                {loading && <span className="animate-spin border-[5px] border-[#f1f2f3] border-l-primary rounded-full w-6 h-6 inline-block align-middle mx-2"></span>}{' '}
                                                upload
                                            </button>
                                        </form>

                                        {showAssignFilesUp.length > 0 ? (
                                            <div className="flex items-center justify-between mb-5">
                                                <h2 className=" text-[#4ec5ff]">Submitted Files</h2>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        <div className="space-y-2">
                                            {showAssignFilesUp.map((file: any, index: number) => (
                                                <div key={index} className="flex bg-gray-100 p-2 ">
                                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                                        {file.file_name.endsWith('.pdf') ||
                                                            file.file_name.endsWith('.ppt') ||
                                                            file.file_name.endsWith('.pptx') ||
                                                            file.file_name.endsWith('.doc') ||
                                                            file.file_name.endsWith('.docx') ||
                                                            file.file_name.endsWith('.xlsx') ||
                                                            file.file_name.endsWith('.xls') ||
                                                            file.file_name.endsWith('.zip') ||
                                                            file.file_name.endsWith('.mp4') ||
                                                            file.file_name.endsWith('.mp3') ||
                                                            file.file_name.endsWith('.csv') ? (
                                                            // Render PDF button if file is PDF
                                                            <button onClick={() => handleAssgnAwsFileDownload(file.assgn_ansid, file.file_name)}>
                                                                <FaFileAlt />
                                                            </button>
                                                        ) : (
                                                            // Render image if file is an image
                                                            <img
                                                                src={`https://crown-school-site.s3.ap-south-1.amazonaws.com/${file.file_path}`}
                                                                className="w-6 cursor-pointer"
                                                                onClick={() => handleAssgnAwsFileDownload(file.assgn_ansid, file.file_name)}
                                                                alt="File"
                                                            />
                                                        )}
                                                    </span>
                                                    <div className="px-3 flex-1 overflow-x-auto">
                                                        <div className="text-sm break-words ">{file.file_name}</div>
                                                    </div>
                                                    {ddays != '0' ? (
                                                        <span
                                                            className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex justify-center items-center"
                                                            onClick={() => handleDeleteFile(file.assgn_ansid)}
                                                        >
                                                            <MdDelete />
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </div>
    );
};

export default Assignments;
