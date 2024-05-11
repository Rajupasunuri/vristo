import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconX from '../../components/Icon/IconX';
import { MY_DIARY_INFO_URL, MY_DIARY_URL } from './query';
import axios from 'axios';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import moment from 'moment';

const Tabs = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [loadDiary, setloadDiary] = useState('');
    const [nowmonth, setnowmonth] = useState('');
    const [myDiariesMonth, setmyDiariesMonth] = useState<any>([]);
    const [myDiariesDays, setmyDiariesDays] = useState<any>([]);
    const [diaryInfo, setmyDiaryInfo] = useState<any>([]);
    const [diaryModal, setdiaryModal] = useState(false);
    const [diaryID, setDairyID] = useState('');
    const [diaryDate, setDairyDate] = useState('');
    const [diaryTitle, setDairyTitle] = useState('');
    const [diaryHome, setDairyHome] = useState('');
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
                    classesID: localStorage.classesID,
                    sectionID: localStorage.sectionID,
                    nowmonth: '0',
                };
                const response = await axios.post(MY_DIARY_URL, postData, {
                    headers: headers,
                });

                console.log('diary', response);

                setmyDiariesMonth(response.data.data.dairy_months);
                setmyDiariesDays(response.data.data.dairy_days);
                setloadDiary(response.data.data.dairy_months[0].monthName);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,
                    classesID: localStorage.classesID,
                    sectionID: localStorage.sectionID,
                    nowmonth: nowmonth,
                    //sectionID: localStorage.sectionID,
                };
                const response = await axios.post(MY_DIARY_URL, postData, {
                    headers: headers,
                });

                console.log('diary days', response);
                setmyDiariesDays(response.data.data.dairy_days);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetch();
    }, [nowmonth]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: localStorage.schoolyearID,

                    did: diaryID,
                };
                const response = await axios.post(MY_DIARY_INFO_URL, postData, {
                    headers: headers,
                });

                console.log('diary info', response);
                setmyDiaryInfo(response.data.data.dairy_info);
                setDairyDate(response.data.data.dairy_info.dairy_date);
                setDairyTitle(response.data.data.dairy_info.title);
                setDairyHome(response.data.data.dairy_info.homework);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetch();
    }, [diaryID]);

    const handleDiaryDay = (dairyID: any) => {
        setdiaryModal(true);
        setDairyID(dairyID);
    };

    const handleMonth = (monthno: any, monthName: any) => {
        //setSubID(subID);
        setloadDiary(monthName);
        setnowmonth(monthno);
    };

    return (
        <div>
            <>
                <div className="space-y-8 pt-5">
                    <div className="panel" id="icon">
                        {/* <h5 className="text-lg font-bold dark:text-white-light">Diary</h5> */}
                        <div className="mb-5 flex items-center justify-between border-b-2 pb-6">
                            <span className="text-lg font-bold">
                                Diary Month : <span className="text-md font-semibold"> {loadDiary}</span>
                            </span>
                            <div className="flex justify-end space-x-2">
                                <div className="mb-2">
                                    <div className="flex flex-wrap w-full gap-7 justify-around">
                                        <div className="flex items-center justify-center">
                                            <div className="dropdown">
                                                <Dropdown
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="btn btn-success  w-full  dropdown-toggle"
                                                    button={
                                                        <>
                                                            {loadDiary}
                                                            <span>
                                                                <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                            </span>
                                                        </>
                                                    }
                                                >
                                                    <ul className="!min-w-[170px]">
                                                        {myDiariesMonth &&
                                                            myDiariesMonth.map((month: any) => (
                                                                <li key={month.id}>
                                                                    <button type="button" onClick={() => handleMonth(month.monthno, month.monthName)}>
                                                                        {month.monthName}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-6">
                                {myDiariesDays &&
                                    myDiariesDays.map((day: any) => (
                                        <div className="flex bg-gray-100 p-2 cursor-pointer" onClick={() => handleDiaryDay(day.dairyID)}>
                                            {/* <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                            Pay
                                        </span> */}
                                            <div className="px-3 flex-1">
                                                <div className="text-sm">{day.title}</div>
                                                <div className="text-xs text-white-dark dark:text-gray-500">Diary Date:{moment(day.dairy_date).format('DD-MM-YYYY')}</div>
                                            </div>
                                            <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                                view
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <div>
                <Transition appear show={diaryModal} as={Fragment}>
                    <Dialog as="div" open={diaryModal} onClose={() => setdiaryModal(false)}>
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
                                        <h5 className="text-lg font-bold">{diaryTitle}</h5>
                                        <button onClick={() => setdiaryModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="flex flex-col space-y2 p-2">
                                        <div>Date:{moment(diaryDate).format('DD-MM-YYYY')}</div>
                                        <div dangerouslySetInnerHTML={{ __html: diaryHome }} />
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default Tabs;
