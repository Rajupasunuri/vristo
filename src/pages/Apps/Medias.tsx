import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MY_CAT_MEDIA_URL, MY_MEDIA, MY_MEDIA_URL } from './query';
import ReactPlayer from 'react-player';
import 'tippy.js/dist/tippy.css';
//import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Swal from 'sweetalert2';
import { FaFileImage } from 'react-icons/fa6';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { BsFiletypeMp3 } from 'react-icons/bs';
import { LuFileVideo } from 'react-icons/lu';

const Skin = () => {
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [mcategoryID, setMcategoryID] = useState(0);
    const [schoolyearID, setSchoolyearID] = useState(localStorage.schoolyearID);
    const [mediaRes, setMediaRes] = useState([]);
    const [mediaCats, setMediaCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [urlModal, setUrlModal] = useState('');
    const [type, setType] = useState('');
    const [mediaModal, setmediaModal] = useState(false);
    const audioRef = useRef<any>(null); // Corrected

    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    const handlePlay = (index: any) => {
        if (currentlyPlaying === index) {
            setCurrentlyPlaying(null); // Pause if the same audio is clicked again
        } else {
            setCurrentlyPlaying(index);
        }
    };

    const imgRef = React.createRef<HTMLImageElement>();

    const fetchData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: localStorage.token,
            };
            const postData = {
                studentID: localStorage.studentID,
                schoolID: localStorage.schoolID,
                schoolyearID: schoolyearID,
                classesID: localStorage.classesID,
                sectionID: localStorage.sectionID,
            };
            const response = await axios.post(MY_MEDIA_URL, postData, {
                headers: headers,
            });

            if (response.data.error) {
                Swal.fire('Request Failed, Try Again Later!');
            } else {
                setMediaRes(response.data.data.media_years);
                setMediaCats(response.data.data.media_cats);
            }

            console.log('media Response', response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log('media_years', mediaCats);
    useEffect(() => {
        fetchData();
    }, [schoolyearID]);

    const loadCatData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: localStorage.token,
            };
            const postData = {
                studentID: localStorage.studentID,
                schoolID: localStorage.schoolID,
                schoolyearID: schoolyearID,
                mcategoryID: mcategoryID,
                classesID: localStorage.classesID,
                sectionID: localStorage.sectionID,
            };
            const response = await axios.post(MY_CAT_MEDIA_URL + `?page=${page}`, postData, {
                headers: headers,
            });

            if (response.data.error) {
                Swal.fire('Request Failed, Try Again Later!');
            } else {
                if (response.data.data.now_media) {
                    setData((prevData: any) => [...prevData, ...response.data.data.now_media]);
                    setLoading(false);
                }
            }

            console.log('response.data.data.now_media', response.data.data.now_media);
            console.log('cat_media Response', response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadCatData();
    }, [page, schoolyearID, mcategoryID]);

    const loadMore = () => {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
    };

    const loadyear = (schyearid: any) => {
        if (schoolyearID == schyearid) {
        } else {
            setSchoolyearID(schyearid);
            setMcategoryID(0);
            setPage(1);
            setData([]);
        }
    };

    const loadcat = (mcatid: any) => {
        if (mcategoryID == mcatid) {
        } else {
            setMcategoryID(mcatid);
            setPage(1);
            setData([]);
        }
    };

    const handlecatg1 = () => {};

    const handleImage = (file: any, type: any) => {
        // const formattedDate = moment(date).format('DD:MM:YYYY');
        setUrlModal(file);
        setType(type);
        //   setFile(file);
        //   settitle(title);
        //   setdescription(description);
        //   setDate(formattedDate);
        setmediaModal(true);
    };

    console.log('Stored Data', data);
    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg">Facilities / Media Gallery</h4>
            </div>

            <div className="panel">
                <div className="flex  items-center justify-between pb-5 mb-4 border-b-2 overflow-x-auto space-x-1.5">
                    {mediaRes.map((year: any, index) => (
                        <div key={index}>
                            <button className={`btn whitespace-nowrap ${schoolyearID == year.schoolyearID ? ' btn-info' : 'btn-outline-info'}`} onClick={() => loadyear(year.schoolyearID)}>
                                {year.schoolyear}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-start space-x-4 items-center"></div>
                <div className="mt-4">
                    <div className="flex justify-start space-x-1.5 items-center overflow-x-auto pb-5">
                        <button className={`btn whitespace-nowrap ${mcategoryID == 0 ? ' btn-secondary' : 'btn-outline-secondary'}`} onClick={() => loadcat(0)}>
                            General
                        </button>

                        {mediaCats.map((cat: any, index) => (
                            <div key={index}>
                                <button className={`btn whitespace-nowrap ${mcategoryID == cat.mcategoryID ? ' btn-secondary' : 'btn-outline-secondary'}`} onClick={() => loadcat(cat.mcategoryID)}>
                                    {cat.folder_name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" space-x-1  sm:grid sm:grid-cols-2 grid-cols-1 gap-2 space-y-2 items-center justify-center   mt-4">
                    {data.map((data: any, index: any) => (
                        <div key={index} className="flex  justify-center items-center space-x-1 space-y-1  panel">
                            <div className="flex  items-center justify-center">
                                {data.type === 'Image' ? (
                                    <FaFileImage className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-[#68478D] cursor-pointer" onClick={() => handleImage(data.file_name, data.type)} />
                                ) : data.type === 'Audio' ? (
                                    <BsFiletypeMp3 className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-[#9F6CD9] cursor-pointer" onClick={() => handleImage(data.file_name, data.type)} />
                                ) : data.type === 'Video' ? (
                                    <LuFileVideo className="sm:w-[70px] sm:h-[70px] w-[110px] h-[100px]  text-blue-400 cursor-pointer" onClick={() => handleImage(data.file_name, data.type)} />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={loadMore} className="btn btn-info w-full mt-4">
                    {loading && <span className="animate-spin border-[5px] border-[#f1f2f3] border-l-primary rounded-full w-6 h-6 inline-block align-middle mx-2"></span>} Load More
                </button>
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
                                            <h5 className="text-lg font-bold"> </h5>
                                        </div>

                                        <button onClick={() => setmediaModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>

                                    <div className="p-4 flex justify-center items-center">
                                        {type === 'Image' ? (
                                            <img src={MY_MEDIA + urlModal} alt={urlModal} className="object-cover " />
                                        ) : type === 'Audio' ? (
                                            <ReactAudioPlayer
                                                src={MY_MEDIA + urlModal}
                                                controls
                                                className="object-cover w-full"
                                                // autoPlay={index === currentlyPlaying}
                                                //controls={index === currentlyPlaying}
                                                //onPlay={() => handlePlay(index)}
                                                onPause={() => setCurrentlyPlaying(null)}
                                            />
                                        ) : type === 'Video' ? (
                                            <ReactPlayer url={MY_MEDIA + urlModal} controls className="object-cover w-full" />
                                        ) : (
                                            ''
                                        )}
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

export default Skin;
