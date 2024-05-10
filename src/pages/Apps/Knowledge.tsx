import { Link } from 'react-router-dom';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconSettings from '../../components/Icon/IconSettings';
import IconVideo from '../../components/Icon/IconVideo';
import ReactPlayer from 'react-player';
import IconX from '../../components/Icon/IconX';
import ModalK from './ModalK';
import IconDownload from '../../components/Icon/IconDownload';
import IconEye from '../../components/Icon/IconEye';
import html2canvas from 'html2canvas';
import React from 'react';
import img from '/public/crown-logo.png';
import pdf from '../../../public/Application .pdf';
import Modal1 from './Modal1';
import ModalK2 from './Modal2';
import ModalK3 from './Modal3';
import IconGrid from '../../components/Icon/IconGrid';
import IconList from '../../components/Icon/IconList';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_KB_FILE_URL, MY_KNOWLEDGE_BNK_URL, MY_MEDIA } from './query';
//import {FaYoutube} from 'react-icons';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { LuFileVideo } from 'react-icons/lu';
import { ImYoutube } from 'react-icons/im';
import { FaFilePdf } from 'react-icons/fa';
import { FaFileImage } from 'react-icons/fa6';
import { BsFiletypeMp3 } from 'react-icons/bs';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import { BsFiletypeTxt, BsFiletypeXlsx } from 'react-icons/bs';
import { GrDocumentWord } from 'react-icons/gr';

const Tabs = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
    const [mySubjects, setMySubjects] = useState<any>([]);
    const [knowledgeFiles, setKnowledgeFiles] = useState<any>([]);
    const [subID, setSubID] = useState('0');
    const [loadSub, setLoadSub] = useState('');
    const [youtubeModal, setyoutubeModal] = useState(false);
    const [ycode, setYcode] = useState('');
    const [urlModal, setUrlModal] = useState('');
    const [file, setFile] = useState('');
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [mediaModal, setmediaModal] = useState(false);
    const [date, setDate] = useState('');
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
                    subjectID: '0',
                };
                const response = await axios.post(MY_KNOWLEDGE_BNK_URL, postData, {
                    headers: headers,
                });

                console.log('knowledge', response);
                console.log('knowledge', response.data.data.my_subjects);
                setMySubjects(response.data.data.my_subjects);
                setKnowledgeFiles(response.data.data.knowledge_files);
                setLoadSub(response.data.data.my_subjects[0].subject);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
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
                    subjectID: subID,
                };
                const response = await axios.post(MY_KNOWLEDGE_BNK_URL, postData, {
                    headers: headers,
                });

                console.log('knowledge', response);
                setKnowledgeFiles(response.data.data.knowledge_files);
                // console.log('knowledge', response.data.data.my_subjects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [subID]);
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    const imgRef = React.createRef<HTMLImageElement>();
    const [modal10, setModal10] = useState(false);
    const [tab, setTab] = useState(true);
    const [tab1, setTab1] = useState(false);

    const handleTab = () => {
        setTab(true);
        setTab1(false);
    };

    const handleTab1 = () => {
        setTab(false);
        setTab1(true);
    };
    const [search, setSearch] = useState('');

    const handleSubject = (subID: any, subject: any) => {
        setSubID(subID);
        setLoadSub(subject);
    };

    const handleYoutube = (embedcode: any) => {
        const ycode = embedcode.split('/');
        const emcode = ycode.pop();
        setYcode(emcode);
        setyoutubeModal(true);
    };

    const handleVideo = (urlID: any, file: any, title: any, description: any, date: any) => {
        const formattedDate = moment(date).format('DD:MM:YYYY');
        setUrlModal(urlID);
        setFile(file);
        settitle(title);
        setdescription(description);
        setDate(formattedDate);
        setmediaModal(true);
    };

    const handleKBFile = async (syllabusId: any, title: any, ext: any) => {
        const assigntitle = title.toLowerCase();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };
        try {
            // Replace 'YOUR_BUCKET_NAME' and 'YOUR_OBJECT_KEY' with your S3 bucket name and object key
            const response = await axios.get(MY_KB_FILE_URL + localStorage.schoolID + '/' + localStorage.studentID + '/' + syllabusId, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log('url', url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.${ext}`); // Specify the desired file name
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="panel">
            <div className="mb-5">
                <div className="flex flex-wrap w-full gap-7 justify-around">
                    <div className="flex items-center justify-center">
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="btn btn-success  w-full  dropdown-toggle"
                                button={
                                    <>
                                        {loadSub}
                                        <span>
                                            <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                        </span>
                                    </>
                                }
                            >
                                {/* {mySubjects.map((subject: any) => {
                                    <ul className="!min-w-[170px]">
                                        <li>
                                            <button type="button">{subject.subject}</button>
                                        </li>
                                    </ul>;
                                })} */}
                                <ul className="!min-w-[170px]">
                                    {mySubjects.map((subject: any) => (
                                        <li key={subject.id}>
                                            <button type="button" onClick={() => handleSubject(subject.global_subject_id, subject.subject)}>
                                                {subject.subject}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className=" mt-2  sm:grid sm:grid-cols-4 grid-cols-1 gap-2 space-y-2 items-center justify-center ">
                    {knowledgeFiles.map((file: any) => (
                        <div className="panel mt-2  flex  space-y-2 items-center  justify-center  ">
                            {file.is_kb === 'vimeo' ? (
                                <LuFileVideo
                                    className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-blue-400"
                                    onClick={() => handleVideo(file.vimeo_videoID, file.is_kb, file.title, file.description, file.date)}
                                />
                            ) : file.is_kb === 'audio' ? (
                                <BsFiletypeMp3
                                    className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-[#9F6CD9]"
                                    onClick={() => handleVideo(file.file, file.is_kb, file.title, file.description, file.date)}
                                />
                            ) : file.is_kb === 'dwn' && file.fileExt === 'pdf' ? (
                                <FaFilePdf className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-red-300" onClick={() => handleKBFile(file.syllabusID, file.title, file.fileExt)} />
                            ) : file.is_kb === 'image' ? (
                                <FaFileImage
                                    className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-[#68478D]"
                                    onClick={() => handleVideo(file.file, file.is_kb, file.title, file.description, file.date)}
                                />
                            ) : file.is_kb === 'youtube' ? (
                                <ImYoutube className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-red-500" onClick={() => handleYoutube(file.ytb_embedcode)} />
                            ) : file.is_kb === 'dwn' && file.fileExt === 'txt' ? (
                                <BsFiletypeTxt className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-[#959B33]" onClick={() => handleKBFile(file.syllabusID, file.title, file.fileExt)} />
                            ) : file.is_kb === 'dwn' && file.fileExt === 'xlsx' ? (
                                <BsFiletypeXlsx className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-[#41B126]" onClick={() => handleKBFile(file.syllabusID, file.title, file.fileExt)} />
                            ) : file.is_kb === 'dwn' && file.fileExt === 'docx' ? (
                                <GrDocumentWord className="sm:w-[70px] sm:h-[70px] w-[85px] h-[85px]  text-[#4762B0]" onClick={() => handleKBFile(file.syllabusID, file.title, file.fileExt)} />
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-5">
                <Transition appear show={youtubeModal} as={Fragment}>
                    <Dialog as="div" open={youtubeModal} onClose={() => setyoutubeModal(false)}>
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
                        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="my-8 w-full max-w-3xl overflow-hidden">
                                        <div className="text-right">
                                            <button onClick={() => setyoutubeModal(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        <iframe title="youtube-video" src={`https://www.youtube.com/embed/${ycode}`} className="h-[250px] w-full md:h-[550px]"></iframe>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div>
                <Transition appear show={mediaModal} as={Fragment}>
                    <Dialog as="div" open={mediaModal} onClose={() => setmediaModal(false)}>
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
                                        <div>
                                            <h5 className="text-lg font-bold">{title}</h5>
                                            <span className="text-sm">{date}</span>
                                        </div>

                                        <button onClick={() => setmediaModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>

                                    <div className="p-5 flex justify-center items-center">
                                        {file === 'image' ? (
                                            <img src={MY_MEDIA + 'images' + '/' + urlModal} alt="" className="w-full " />
                                        ) : file === 'audio' ? (
                                            <ReactAudioPlayer src={MY_MEDIA + 'images' + '/' + urlModal} controls className="object-cover w-full" />
                                        ) : file === 'video' ? (
                                            ''
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="mt-2 ml-4 mb-2 text-base flex ">
                                        <span className="font-bold mr-2">Description:</span>
                                        {description}
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
