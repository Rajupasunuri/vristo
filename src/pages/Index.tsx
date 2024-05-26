import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { FaRupeeSign, FaBookReader, FaBook, FaLaptop } from 'react-icons/fa';
import { MdHomeWork } from 'react-icons/md';
import { FaPenToSquare, FaCalendarDays } from 'react-icons/fa6';
import { MY_ATTENDANCE_URL, MY_DASHBOARD_URL } from './Apps/query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { HiViewfinderCircle } from 'react-icons/hi2';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../components/Icon/IconX';
import { RiGraduationCapFill } from 'react-icons/ri';
import { TbBrandZoom } from 'react-icons/tb';
import { FcConferenceCall } from 'react-icons/fc';

const Index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);

    const [unpaidinvCount, setUnPaidInvCount] = useState(0);
    const [liveClass, setLiveClass] = useState(0);
    const [talentShowDash, setTalentShowDash] = useState([]);
    const [monthWiseAtt, setMonthWiseAtt] = useState<any>([]);
    const [hitAttendance, setHitAttendance] = useState(false);
    const [modalAttd, setModalAttd] = useState(false);
    const [monthName, setMonthName] = useState<any>('');

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
                    admno: localStorage.std_regno,
                };
                const response = await axios.post(MY_DASHBOARD_URL, postData, {
                    headers: headers,
                });
                //const res = JSON.parse(response.data.data.invoices[0].comps);

                if (!response.data.error) {
                    setUnPaidInvCount(response.data.data.invoices);
                    setLiveClass(response.data.data.liveclasses);
                    console.log('dashboard', response);
                }

                console.log('unpaid invoices', response.data.data.invoices);
                console.log('live classes', response.data.data.liveclasses);
                console.log('dashboard', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        if (hitAttendance) {
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
                        on_dash: 1,
                    };
                    const response = await axios.post(MY_ATTENDANCE_URL, postData, {
                        headers: headers,
                    });

                    if (response.data.error) {
                        Swal.fire('Request Failed, Try Again Later!');
                    } else {
                        setMonthWiseAtt(response.data.data.atdmonthwise);
                    }

                    console.log('attendance', response);
                } catch (error) {
                    Swal.fire('Server Issue, Try Again Later!');
                    console.error('Error fetching data:', error);
                }
            };

            // Call the fetchData function when the component mounts
            fetchData();
        }
    }, [hitAttendance]);

    const dates: any = [];

    useEffect(() => {
        console.log('jhjdhj', isLoggedinuser);
        if (!isLoggedinuser) {
            navigate('/');
            console.log('isloggedin dashboard', isLoggedinuser);
        }
        //toast.success('Logged in Successfully');
    }, []);
    dispatch(setPageTitle('Sales Admin'));
    const [loading] = useState(false);

    useEffect(() => {
        const date = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        setMonthName(monthNames[date.getMonth()]);
    }, []);

    const handleInvoice = async (invid: any, invostdID: any, invoyearID: any, due_date: any) => {
        localStorage.setItem('InvoiceID', invid);
        localStorage.setItem('tempschoolYearID', invoyearID);
        localStorage.setItem('yearStudentID', invostdID);
        // const hasSmallerDate = await dates.some((date: any) => date < due_date);

        navigate('/preview');
    };

    const handleAttendance = () => {
        //console.log('hello icon');
        setHitAttendance(true);
        setModalAttd(true);
    };

    return (
        <div>
            <div className="pt-5">
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 grid-cols-2 gap-6 mb-6">
                    <Link to="/paynow">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <span className="flex right-3  top-2 z-10 justify-center items-center w-6 h-6 text-center absolute rounded-full object-cover bg-[#55ef7c] animate-ping text-md"></span>
                            <span className="flex right-3  top-2 z-10 justify-center items-center w-6 h-6 text-center absolute rounded-full text-white object-cover bg-[#d22d1d]  text-md">
                                {unpaidinvCount}
                            </span>
                            <FaRupeeSign className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500 text-center">PayFee</p>
                        </div>
                    </Link>

                    <Link to="/knowledge-bank">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y2 relative">
                            <span className="flex right-3  top-2 z-10 justify-center items-center w-6 h-6 text-center absolute rounded-full object-cover bg-[#55ef7c] animate-ping text-md"></span>
                            <span className="flex right-3  top-2 z-10 justify-center items-center w-6 h-6 text-center absolute rounded-full text-white object-cover bg-[#d22d1d]  text-md">3</span>
                            <FaBookReader className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500 text-center">Knowledge Bank</p>
                        </div>
                    </Link>
                    <Link to="/homework">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <MdHomeWork className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500 text-center">Home Work</p>
                        </div>
                    </Link>
                    <Link to="/diary">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2 ">
                            <FaBook className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500 text-center">Diary</p>
                        </div>
                    </Link>
                    <Link to="/online-exam">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <FaLaptop className=" sm:w-12 sm:h-12 w-8 h-8 text-blue-500 " />
                            <p className="text-blue-500 text-center">Online Exam</p>
                        </div>
                    </Link>
                    <Link to="/assignments">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <FaPenToSquare className="text-blue-500 sm:w-12 sm:h-12 w-8 h-8  " />
                            <p className="text-blue-500 text-center">Assignments</p>
                        </div>
                    </Link>
                    <Link to="/talent-show">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <RiGraduationCapFill className="text-blue-500 sm:w-12 sm:h-12 w-8 h-8  " />
                            <p className="text-blue-500 text-center">Talent Shows</p>
                        </div>
                    </Link>
                    <Link to="/live-class">
                        <div className="panel h-full  hover:bg-gray-100 cursor-pointer flex justify-center rounded-3xl items-center flex-col gap-y-2">
                            <span className="flex right-3  top-2 z-10 justify-center items-center w-6 h-6 text-center absolute rounded-full object-cover bg-[#55ef7c] animate-ping text-md"></span>
                            <span className="flex right-3  top-2 z-10 justify-center items-center w-6 h-6 text-center absolute rounded-full text-white object-cover bg-[#d22d1d]  text-md">
                                {liveClass}
                            </span>
                            <FcConferenceCall className="text-blue-500 sm:w-12 sm:h-12 w-8 h-8  " />
                            <p className="text-blue-500 text-center">Live Classes</p>
                        </div>
                    </Link>
                </div>
                <div className="panel h-full my-4">
                    <div className="flex items-center justify-between dark:text-white-light ">
                        <h5 className="font-semibold text-lg">{monthName} Month Attendance</h5>
                        <FaCalendarDays className="w-6 h-6" onClick={handleAttendance} />
                    </div>
                </div>
            </div>
            {/* <ToastContainer position="top-center" autoClose={2000} /> */}
            <div className="space-y-4"></div>
            <Transition appear show={modalAttd} as={Fragment}>
                <Dialog as="div" open={modalAttd} onClose={() => setModalAttd(false)} className="sm:w-[300px] w-[100px]">
                    <Transition.Child as={Fragment} enter="ease-out duration-10" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/20">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-md font-bold">{monthName} Month Attendance</h5>
                                    <button onClick={() => setModalAttd(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>

                                <div className="flex items-center justify-center  bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-sm ">
                                        <>
                                            <div className=" panel card-body justify-center flex flex-col space-y-2">
                                                <div className="mb-5 ">
                                                    <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                        <table className="table-hover table-striped">
                                                            <thead>
                                                                <tr></tr>
                                                            </thead>
                                                            <tbody className="dark:text-white-dark border-1.5 ">
                                                                <tr>
                                                                    <td style={{ width: '200px' }}>Present</td>
                                                                    <td style={{ width: '10px' }}>:</td>
                                                                    <td>{monthWiseAtt.length > 0 ? <>{monthWiseAtt[0].p}</> : ''} </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '200px' }} className="">
                                                                        Absent
                                                                    </td>
                                                                    <td style={{ width: '10px' }}>:</td>
                                                                    <td>{monthWiseAtt.length > 0 ? <>{monthWiseAtt[0].A}</> : ''} </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '200px' }}>Halfday Present</td>
                                                                    <td style={{ width: '10px' }}>:</td>
                                                                    <td>{monthWiseAtt.length > 0 ? <>{monthWiseAtt[0].hp}</> : ''} </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '200px' }}>Holidays</td>
                                                                    <td style={{ width: '10px' }}>:</td>
                                                                    <td>{monthWiseAtt.length > 0 ? <>{monthWiseAtt[0].hd}</> : ''} </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '200px' }}>On Leave</td>
                                                                    <td style={{ width: '10px' }}>:</td>
                                                                    <td>{monthWiseAtt.length > 0 ? <>{monthWiseAtt[0].ol}</> : ''} </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '200px' }}>Came Late</td>
                                                                    <td style={{ width: '10px' }}>:</td>
                                                                    <td>{monthWiseAtt.length > 0 ? <>{monthWiseAtt[0].l}</> : ''} </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </h5>
                                </div>
                                <div className="flex justify-end items-end m-4 ">
                                    <button className="p-2 bg-gray-300 rounded-md" onClick={() => setModalAttd(false)}>
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Index;
