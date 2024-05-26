import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { MY_TALENT_SHOW_URL } from './query';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const TalentRefer = () => {
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
            <div className="panel h-full w-full">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Talent Shows</h5>{' '}
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr className="border-b-0">
                                <th className="ltr:rounded-l-md rtl:rounded-r-md">Sl.No</th>
                                <th className="whitespace-nowrap">ACTION</th>
                                <th>STATUS</th>
                                <th>TYPE</th>
                                <th className="ltr:rounded-r-md rtl:rounded-l-md whitespace-nowrap">STARTED</th>

                                <th>FINISHED</th>
                                <th>EXAM TITLE</th>
                                <th className="whitespace-nowrap">VALID FROM</th>
                                <th>VALID TO</th>
                                <th className="whitespace-nowrap">DURATION HH:MM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {talentShow.map((show: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className={`${show.status_msg_btn}  `}> {show.startExamText}</span>
                                        </td>
                                        <td>
                                            <span className={`   `}>{show.status_msg}</span>
                                        </td>
                                        <td className="whitespace-nowrap">{show.assessment_type == 1 ? 'Offline' : 'Online'}</td>
                                        <td className="whitespace-nowrap"></td>
                                        <td className="whitespace-nowrap"></td>
                                        <td className="whitespace-nowrap">{show.aats_talent}</td>
                                        <td className="whitespace-nowrap">{show.start_date_format}</td>
                                        <td className="whitespace-nowrap">{show.end_date_format}</td>
                                        <td className="whitespace-nowrap ">
                                            <span className="">{show.duration}</span>
                                        </td>
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

// export default TalentRefer;
