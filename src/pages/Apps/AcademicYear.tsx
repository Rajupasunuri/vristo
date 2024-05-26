import { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { MY_DASHBOARD_URL } from './query';
import axios from 'axios';

const tableData = [
    {
        id: 1,
        year: '2023-2024',
        title: '2023-2024',
        status: 'Active',
        progress: '40%',
        admission: 'Closed',
    },
    {
        id: 2,
        year: '2022-2023',

        progress: '23%',
        admission: 'Closed',
    },
    {
        id: 3,
        year: '2021-2022',

        progress: '80%',
        position: 'Accountant',
        office: 'Amazon',
        admission: 'Closed',
    },
    {
        id: 4,
        year: '2020-2021',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,

        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
        admission: 'Closed',
    },
];

const Tables = () => {
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            {/* Simple */}

            {/* Hover Table  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Academic Year</h5>
                </div>
                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th>School Year</th>
                                <th>Title</th>
                                <th>Admission Status</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data.year}</div>
                                        </td>
                                        <td>{data.title}</td>
                                        <td>{data.admission}</td>
                                        <td>
                                            <div>
                                                <span>{data.status === 'Active' ? <span className="bg-green-600 text-white p-2 rounded-md hover:shadow-lg">Active</span> : ''}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Tippy content="Delete">
                                                <button type="button">
                                                    <IconTrashLines className="m-auto" />
                                                </button>
                                            </Tippy>
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

export default Tables;
