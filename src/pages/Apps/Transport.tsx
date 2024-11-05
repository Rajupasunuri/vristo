import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { MY_DASHBOARD_URL } from '../query';

const tableData = [
    {
        id: 1,
        route: 'Sri Nagar',
        vehicles: '1',
        root: '25',
        seats: '11',
        fare: '600',
        note: '',
    },
    {
        id: 2,
        route: 'Sundar Colony',
        vehicles: '1',
        root: '25',
        seats: '12',
        fare: '600',
        note: '',
    },
    {
        id: 3,
        route: 'RTC',
        vehicles: '1',
        root: '40',
        seats: '21',
        fare: '700',
        note: '',
    },
];

const Transport = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
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
                };
                const response = await axios.post(MY_DASHBOARD_URL, postData, {
                    headers: headers,
                });

                console.log('dashboard', response);
                // if (response.data.error) {
                //     // setUsererror(response.data.message);
                // } else {
                //     const profiledtls = response.data.data;
                //     console.log('profiledtls:', profiledtls);

                //     // setProfile(profiledtls);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
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
    return (
        <div className="space-y-6">
            {/* Simple */}

            {/* Hover Table  */}
            <h3 className="font-bold text-lg">Facilities</h3>
            <div className="panel">
                <div className="flex items-center justify-between mb-5 border-b ">
                    <h5 className="font-semibold text-lg pb-4 dark:text-white-light">Transport</h5>
                </div>

                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th>ROUTE NAME</th>
                                <th>NO. OF VEHICLES</th>
                                <th>ROOT CAPACITY</th>
                                <th>AVAILABLE SEATS</th>

                                <th>ROUTE FARE</th>
                                <th>NOTE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data.route}</div>
                                        </td>
                                        <td>{data.vehicles}</td>
                                        <td>{data.root}</td>
                                        <td>{data.seats}</td>
                                        <td>{data.fare}</td>
                                        <td>{data.note}</td>
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

export default Transport;
