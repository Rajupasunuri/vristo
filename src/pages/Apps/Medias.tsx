import { DataTable } from 'mantine-datatable';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import axios from 'axios';
import { MY_CAT_MEDIA_URL, MY_DASHBOARD_URL, MY_MEDIA, MY_MEDIA_URL, MY_YEAR_MEDIA_URL } from './query';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import IconEye from '../../components/Icon/IconEye';
import IconDownload from '../../components/Icon/IconDownload';
import ReactPlayer from 'react-player';
import img from '/public/crown-logo.png';
import html2canvas from 'html2canvas';
import 'tippy.js/dist/tippy.css';
//import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const tableData = [
    {
        id: 1,

        type: 'Audio',

        action: '',
    },
    {
        id: 2,

        type: 'Video',

        action: '',
    },
    {
        id: 3,

        type: 'Image',

        action: '',
    },
];
const Skin = () => {
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [mcategoryID, setMcategoryID] = useState(0);
    const [schoolyearID, setSchoolyearID] = useState(localStorage.schoolyearID);
    const [mediaRes, setMediaRes] = useState([]);
    const [mediaCats, setMediaCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const audioRef = useRef<any>(null); // Corrected

    // const playAudio = () => {
    //     if (currentlyPlaying) {
    //         audioRef.current.audioEl.pause(); // Pause the audio
    //         setCurrentlyPlaying(false); // Update state to indicate audio is not playing
    //     } else {
    //         audioRef.current.audioEl.play(); // Play the audio
    //         setCurrentlyPlaying(true); // Update state to indicate audio is playing
    //     }
    // };
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

            console.log('media Response', response);
            setMediaRes(response.data.data.media_years);
            setMediaCats(response.data.data.media_cats);
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
            if (response.data.data.now_media) {
                setData((prevData: any) => [...prevData, ...response.data.data.now_media]);
                setLoading(false);
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
                            <button className={`btn whitespace-nowrap ${schoolyearID == year.schoolyearID ? 'btn-outline-info' : 'btn-info'}`} onClick={() => loadyear(year.schoolyearID)}>
                                {year.schoolyear}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-start space-x-4 items-center"></div>
                <div className="mt-4">
                    <div className="flex justify-start space-x-1.5 items-center overflow-x-auto pb-5">
                        <button className={`btn whitespace-nowrap ${mcategoryID == 0 ? 'btn-outline-secondary' : 'btn-secondary'}`} onClick={() => loadcat(0)}>
                            General
                        </button>

                        {mediaCats.map((cat: any, index) => (
                            <div key={index}>
                                <button className={`btn whitespace-nowrap ${mcategoryID == cat.mcategoryID ? 'btn-outline-secondary' : 'btn-secondary'}`} onClick={() => loadcat(cat.mcategoryID)}>
                                    {cat.folder_name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" space-x-1 space-y-3 grid sm:grid-cols-1 grid-cols-1 mt-4">
                    {data.map((data: any, index: any) => (
                        <div key={index} className="flex flex-row justify-center items-center space-x-1 space-y-1">
                            {data.type === 'Image' && <img src={MY_MEDIA + data.file_name} alt={data.file_name} className="object-cover " />}
                            {data.type === 'Audio' && (
                                <>
                                    <ReactAudioPlayer
                                        src={MY_MEDIA + data.file_name}
                                        controls
                                        className="object-cover w-full"
                                        autoPlay={index === currentlyPlaying}
                                        //controls={index === currentlyPlaying}
                                        onPlay={() => handlePlay(index)}
                                        onPause={() => setCurrentlyPlaying(null)}
                                    />
                                </>
                            )}
                            {data.type === 'Video' && <ReactPlayer url={MY_MEDIA + data.file_name} controls className="object-cover w-full" />}
                        </div>
                    ))}
                </div>

                <button onClick={loadMore} className="btn btn-info w-full mt-4">
                    {loading && <span className="animate-spin border-[5px] border-[#f1f2f3] border-l-primary rounded-full w-6 h-6 inline-block align-middle mx-2"></span>} Load More
                </button>
            </div>
        </div>
    );
};

export default Skin;
