import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { MY_TALENT_SHOW_URL } from './query';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const Skin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });
    const [talentShow, setTalentShow] = useState([]);
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
                    on_dash: 0,
                };
                const response = await axios.post(MY_TALENT_SHOW_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    setTalentShow(response.data.data.talent_shows);
                }

                console.log('talent show', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-lg font-bold">Talent Shows</h2>

            {talentShow.map((show: any, index: number) => {
                return (
                    <div key={index} className="panel h-full p-0 border-0 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-[#4DC9E6] to-[#210CAE] min-h-[190px]">
                            <div className="flex justify-between items-center mb-6">
                                <div className="bg-black/50 rounded-md p-1 ltr:pr-3 rtl:pl-3 flex items-center text-white font-semibold">{show.assessment_type == 1 ? 'Offline' : 'Online'}</div>
                                <div className="ltr:ml-auto p-2 rtl:mr-auto  flex items-center justify-center w-16 h-9 bg-black text-white rounded-md hover:opacity-80">{show.duration}</div>
                            </div>
                            <div className="text-white flex justify-between items-center">
                                <p className="text-lg">{show.aats_talent}</p>
                                <h5 className="ltr:ml-auto rtl:mr-auto text-2xl">{/* <span className="text-white-light">$</span>2953 */}</h5>
                            </div>
                        </div>
                        <div className="-mt-12 px-8 grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                                <span className="flex justify-between items-center mb-4 dark:text-white">Started</span>
                                <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">
                                    {/* {moment.unix(Number(show.ts_started)).format('MMMM Do YYYY, h:mm:ss a')} */} 12:00
                                </div>
                            </div>
                            <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                                <span className="flex justify-between items-center mb-4 dark:text-white">Finished</span>
                                <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">11:00</div>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="mb-5 flex justify-between items-center">
                                <span className="bg-[#1b2e4b] text-white text-xs rounded-full px-4 py-1.5 before:bg-white before:w-1.5 before:h-1.5 before:rounded-full ltr:before:mr-2 rtl:before:ml-2 before:inline-block">
                                    {show.status_msg}
                                </span>

                                <button type="button" className={` ltr:mr-2 rtl:ml-2 ${show.status_msg_btn}  `}>
                                    {show.startExamText}
                                </button>
                            </div>
                            <div className="mb-5 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-[#515365] font-semibold">Valid From</p>
                                    <p className="text-base">
                                        <span className="font-semibold">{show.start_date_format}</span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[#515365] font-semibold">ValidTo</p>
                                    <p className="text-base">
                                        <span className="font-semibold ">{show.end_date_format}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Skin;
