import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconXCircle from '../Icon/IconXCircle';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconBellBing from '../Icon/IconBellBing';
import { MY_NOTICES_URL } from '../../pages/query';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { FaMicrophone } from "react-icons/fa6";
const Header = () => {
    const location = useLocation();
    const [dataNotices, setDataNotices] = useState<any>([]);
    const navigate = useNavigate()


    ///////



    const [isListening, setIsListening] = useState(false);
    const [go, setGo] = useState(true);
    const [texts, setTexts] = useState<any>([]);
    const recognitionRef = useRef<any>(null); // Reference to SpeechRecognition object
    const menuref = useRef<any>(null);
    let stopvoice = true;
    const [showSpeaker, setShowSpeaker] = useState(true)
    const [micAniamte, setMicAniamte] = useState(false)

    useEffect(() => {
        if (!recognitionRef.current) {
            window.SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            if (window.SpeechRecognition) {
                recognitionRef.current = new window.SpeechRecognition();
                recognitionRef.current = new window.SpeechRecognition();
                recognitionRef.current.interimResults = true;

                recognitionRef.current.addEventListener('result', handleSpeechResult);
                recognitionRef.current.addEventListener('end', handleSpeechEnd);
            }
            else {
                setShowSpeaker(false)
            }


        }
    }, []);

    const handleSpeechResult = (e: any) => {
        const text = Array.from(e.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
        console.log("res", text)
        const currentUrl = window.location.href.split('/').pop();

        setTexts((prevTexts: any) => [...prevTexts, text]);

        // Check if wake word "Crown Tech" is spoken
        if (text.toLowerCase().includes('crown tech')) {
            //addTextToChat('How can I assist you?', 'replay');
            speak('How can I assist you?');
            //setIsListening(true);
        }

        if (e.results[0].isFinal) {
            if (text.includes("stop")) {
                stopvoice = false;
            }
            else {
                stopvoice = true;
            }
            if (text.includes('how are you')) {
                // addTextToChat('I am fine', 'replay');
                speak("I'm fine. Hope you are good");
            }

            else if (text.includes("what's your name") || text.includes('what is your name')) {
                // addTextToChat('My Name is Cifar', 'replay');
                speak('My name is Crown technologies');
            }

            else if (text.toLowerCase().includes('pending payments') || text.toLowerCase().includes('pending payment')) {
                //addTextToChat('Opening YouTube', 'replay');
                if (currentUrl == "paynow") {
                    speak('You are on due list page');
                }
                else {
                    navigate('/paynow')
                    speak('Opening due list page');
                }

            }
            else if (text.includes('dashboard')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "dashboard") {
                    speak('You are on dashboard page');
                }
                else {
                    navigate('/dashboard')
                    speak('Opening dashboard');
                }

            }

            else if (text.toLowerCase().includes('knowledge bank')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "knowledge-bank") {
                    speak('You are on knowledge bank');
                }
                else {
                    navigate('/knowledge-bank')
                    speak('Opening knowledge bank');
                }

            }
            else if (text.toLowerCase().includes('homework')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "homework") {
                    speak('You are on homework');
                }
                else {
                    navigate('/homework')
                    speak('Opening homework');
                }

            }
            else if (text.toLowerCase().includes('diary')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "diary") {
                    speak('You are on diary');
                }
                else {
                    navigate('/diary')
                    speak('Opening diary');
                }

            }

            else if (text.toLowerCase().includes('online exam')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "online-exam") {
                    speak('You are on online exam');
                }
                else {
                    navigate('/online-exam')
                    speak('Opening online exam');
                }

            }

            else if (text.toLowerCase().includes('assignment')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "assignments") {
                    speak('You are on assignments page');
                }
                else {
                    navigate('/assignments')
                    speak('Opening assignments page');
                }

            }

            else if (text.toLowerCase().includes('talent show')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "talent-show") {
                    speak('You are on talent show');
                }
                else {
                    navigate('/talent-show')
                    speak('Opening talent show');
                }

            }
            else if (text.toLowerCase().includes('live class')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "live-class") {
                    speak('You are on live class');
                }
                else {
                    navigate('/live-class')
                    speak('Opening live class');
                }

            }
            else if (text.toLowerCase().includes('time table')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "timetable") {
                    speak('You are on time table');
                }
                else {
                    navigate('/timetable')
                    speak('Opening time table');
                }

            }

            else if (text.toLowerCase().includes('attendance')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "attendance") {
                    speak('You are on attendance');
                }
                else {
                    navigate('/attendance')
                    speak('Opening attendance');
                }

            }

            else if (text.toLowerCase().includes('mi of your child')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "mi-child") {
                    speak('You are on MI child');
                }
                else {
                    navigate('/mi-child')
                    speak('Opening MI of your child');
                }

            }

            else if (text.toLowerCase().includes('exam schedule')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "exam_schedule") {
                    speak('You are on exam schedule');
                }
                else {
                    navigate('/exam_schedule')
                    speak('Opening exam schedule');
                }

            }
            else if (text.toLowerCase().includes('mark')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "mark") {
                    speak('You are on marks page');
                }
                else {
                    navigate('/mark')
                    speak('Opening marks page');
                }

            }
            else if (text.toLowerCase().includes('invoice')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "invoice") {
                    speak('You are on invoice page');
                }
                else {
                    navigate('/invoice')
                    speak('Opening invoice page');
                }

            }

            else if (text.toLowerCase().includes('payment history') || text.toLowerCase().includes('payments history')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "payment-history") {
                    speak('You are on payment history');
                }
                else {
                    navigate('/payment-history')
                    speak('Opening paymnets history');
                }

            }

            else if (text.toLowerCase().includes('media') || text.toLowerCase().includes('gallery')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "media") {
                    speak('You are on media page');
                }
                else {
                    navigate('/media')
                    speak('Opening media page');
                }

            }

            else if (text.toLowerCase().includes('dictionary')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "dictionary") {
                    speak('You are on dictionary page');
                }
                else {
                    navigate('/dictionary')
                    speak('Opening dictionary page');
                }

            }

            else if (text.toLowerCase().includes('payment history') || text.toLowerCase().includes('payments history')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "payment-history") {
                    speak('You are on payment history');
                }
                else {
                    navigate('/payment-history')
                    speak('Opening paymnets history');
                }

            }

            else if (text.toLowerCase().includes('book') || text.toLowerCase().includes('books')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "books") {
                    speak('You are on books page');
                }
                else {
                    navigate('/books')
                    speak('Opening books page');
                }

            }

            else if (text.toLowerCase().includes('notices') || text.toLowerCase().includes('notice')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "notices") {
                    speak('You are on notices');
                }
                else {
                    navigate('/notices')
                    speak('Opening notices');
                }

            }
            else if (text.toLowerCase().includes('holiday') || text.toLowerCase().includes('holidays')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "holiday") {
                    speak('You are on holiday page');
                }
                else {
                    navigate('/holiday')
                    speak('Opening holiday page');
                }

            }
            else if (text.toLowerCase().includes('event') || text.toLowerCase().includes('events')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "events") {
                    speak('You are on events page');
                }
                else {
                    navigate('/events')
                    speak('Opening events page');
                }

            }
            else if (text.toLowerCase().includes('profile')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "profile") {
                    speak('You are on profile page');
                }
                else {
                    navigate('/users/profile')
                    speak('Opening profile page');
                }

            }

            else if (text.toLowerCase().includes('query request') || text.toLowerCase().includes('query request')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "query-request") {
                    speak('You are on query request');
                }
                else {
                    navigate('/query-request')
                    speak('Opening query request');
                }

            }
            else if (text.toLowerCase().includes('leave list') || text.toLowerCase().includes('leaves list') || text.toLowerCase().includes('list')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "leave_list") {
                    speak('You are on leave list');
                }
                else {
                    navigate('/leave_list')
                    speak('Opening leave list');
                }

            }
            else if (text.toLowerCase().includes('pending leaves') || text.toLowerCase().includes('pending leave')) {
                //addTextToChat('Opening YouTube', 'replay');


                console.log("url", currentUrl)
                if (currentUrl == "pending_leaves") {
                    speak('You are on pending leaves');
                }
                else {
                    navigate('/pending_leaves')
                    speak('Opening pending leaves');
                }

            }

            else if (text.toLowerCase().includes('side menu') || text.toLowerCase().includes('menu') || text.toLowerCase().includes('menu bar')) {
                //addTextToChat('Opening YouTube', 'replay');


                menuref.current.click();

            }


            else if (text.includes('stop')) {
                //setGo(false);
                setMicAniamte(false)
                stopvoice = false
                speak('Thanks for using Crown Tech');
                recognitionRef.current.stop();
                //stopvoice=true
                // setIsListening(false);
            }
            //   else{
            //     speak("sorry,i can't hear you properly");

            //   }
        }
    };

    const handleSpeechEnd = () => {

        console.log("out")
        console.log("stop", stopvoice)

        if (stopvoice) {
            console.log("inside")

            //recognitionRef.current.start();



            setTimeout(() => {
                recognitionRef.current.start();

            }, 1000);

        }

    };

    const speak = (text: any) => {
        recognitionRef.current.stop();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        //recognitionRef.current.start();
    };

    const addTextToChat = (text: any, className: any) => {
        setTexts((prevTexts: any) => [...prevTexts, { text, className }]);
    };

    const startListening = () => {
        // setIsListening(false);
        setMicAniamte(true)
        stopvoice = true;
        console.log("listen")
        console.log("stop", stopvoice)
        //setGo(true);

        recognitionRef.current.start();
    };




    ////////

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [hitNotice, setHitNotice] = useState(false);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            profile: 'user-profile.jpeg',
            message: '<strong className="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
            time: '45 min ago',
        },
        {
            id: 2,
            profile: 'profile-34.jpeg',
            message: '<strong className="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
            time: '9h Ago',
        },
        {
            id: 3,
            profile: 'profile-16.jpeg',
            message: '<strong className="text-sm mr-1">Anna Morgan</strong>Upload a file',
            time: '9h Ago',
        },
    ]);

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
                };
                const response = await axios.post(MY_NOTICES_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('Notices', response.data.data.notices);
                    setDataNotices(response.data.data.notices);
                }
            } catch (error) {
                Swal.fire('Server Issue, Try Again Later!');
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [hitNotice]);

    const handleNotice = () => {
        console.log('hello icon');
        setHitNotice(true);
    };

    return (
        <header className={`z-40 print:hidden ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/dashboard" className="main-logo flex items-center shrink-0">
                            <img className="w-17 h-8 ltr:-ml-1 rtl:-mr-1 inline" src={localStorage.school_logo} alt="logo" />
                            {/* <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300"></span> */}
                        </Link>
                    </div>

                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto" style={{ border: '1px solid red' }}></div>

                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={
                                    <span onClick={handleNotice}>
                                        <IconBellBing />
                                        <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                            <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                        </span>
                                    </span>
                                }
                            >
                                <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 className="text-lg">Notification</h4>
                                            {dataNotices.length ? <span className="badge bg-primary/80">{dataNotices.length} New</span> : <span className="badge bg-primary/80">0 New</span>}
                                        </div>
                                    </li>
                                    {dataNotices.length > 0 ? (
                                        <>
                                            {dataNotices.map((notice: any, index: number) => {
                                                return (
                                                    <li key={index} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                                                        <div className="group flex items-center px-4 py-2">
                                                            <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                                <div className="ltr:pr-3 rtl:pl-3">
                                                                    <h6
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: notice.title,
                                                                        }}
                                                                    ></h6>
                                                                    <span className="text-xs block font-normal dark:text-gray-500">{moment(notice.date).format('DD-MM-YYYY')}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                            <li>
                                                <div className="p-4">
                                                    <Link to="/notices">
                                                        <button className="btn btn-primary block w-full btn-small">Read All Notifications</button>
                                                    </Link>
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <li onClick={(e) => e.stopPropagation()}>
                                            <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <IconInfoCircle fill={true} className="w-10 h-10" />
                                                </div>
                                                No New Notifications.
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </Dropdown>
                        </div>

                        <button
                            ref={menuref}
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                        {showSpeaker && <div className={`  dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex  ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-blue-400 dark:bg-dark/40  dark:hover:bg-dark/60 ${micAniamte && 'animate-pulse'} `} onClick={startListening}><FaMicrophone className={`w-5 h-5 text-[#5C5B5A] ${micAniamte && 'w-6 h-6'}`} /></div>}                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
