import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { MY_DASHBOARD_URL, MY_TALENT_SHOW_URL } from './query';
import axios from 'axios';

const rowData = [
    {
        id: 1,
        action: <button className="bg-blue-900 px-4 py-1 rounded-md text-white">Expired</button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: 39,
        validfrom: '15 NOV 2023',
        validto: '28 NOV 2023',
        duration: '00:45',
    },
    {
        id: 2,
        action: <button className="bg-blue-900 px-4 py-1 rounded-md text-white">Expired</button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: 39,
        validfrom: '15 NOV 2023',
        validto: '28 NOV 2023',
        duration: '00:45',
    },
    {
        id: 3,
        action: <button className="bg-blue-900 px-4 py-1 rounded-md text-white">Expired</button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: 39,
        validfrom: '15 NOV 2023',
        validto: '28 NOV 2023',
        duration: '00:45',
    },
];

const Skin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(rowData);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    //item.action.toLowerCase().includes(search.toLowerCase()) ||
                    // item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.type.toLowerCase().includes(search.toLowerCase()) ||
                    item.started.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    //Skin: Hover
    const [page1, setPage1] = useState(1);
    const [pageSize1, setPageSize1] = useState(PAGE_SIZES[0]);
    const [initialRecords1, setInitialRecords1] = useState(rowData);
    const [recordsData1, setRecordsData1] = useState(initialRecords1);
    const [talentShow, setTalentShow] = useState([]);

    const [search1, setSearch1] = useState('');

    useEffect(() => {
        setPage1(1);
    }, [pageSize1]);

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

                console.log('talent show', response);
                setTalentShow(response.data.data.talent_shows);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        const from = (page1 - 1) * pageSize1;
        const to = from + pageSize1;
        setRecordsData1([...initialRecords1.slice(from, to)]);
    }, [page1, pageSize1, initialRecords1]);

    useEffect(() => {
        setInitialRecords1(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search1.toLowerCase()) ||
                    //item.action.toLowerCase().includes(search1.toLowerCase()) ||
                    //item.status.toLowerCase().includes(search1.toLowerCase()) ||
                    item.type.toLowerCase().includes(search1.toLowerCase()) ||
                    item.started.toLowerCase().includes(search1.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search1]);

    //Skin: Bordered
    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(rowData);
    const [recordsData2, setRecordsData2] = useState(initialRecords2);

    const [search2, setSearch2] = useState('');

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize2;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

    useEffect(() => {
        setInitialRecords2(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search2.toLowerCase()) ||
                    // item.action.toLowerCase().includes(search2.toLowerCase()) ||
                    //item.status.toLowerCase().includes(search2.toLowerCase()) ||
                    item.type.toLowerCase().includes(search2.toLowerCase()) ||
                    item.started.toLowerCase().includes(search2.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search2]);

    //Skin: Compact
    const [page3, setPage3] = useState(1);
    const [pageSize3, setPageSize3] = useState(PAGE_SIZES[0]);
    const [initialRecords3, setInitialRecords3] = useState(rowData);
    const [recordsData3, setRecordsData3] = useState(initialRecords3);

    const [search3, setSearch3] = useState('');

    useEffect(() => {
        setPage3(1);
    }, [pageSize3]);

    useEffect(() => {
        const from = (page3 - 1) * pageSize3;
        const to = from + pageSize3;
        setRecordsData3([...initialRecords3.slice(from, to)]);
    }, [page3, pageSize3, initialRecords3]);

    useEffect(() => {
        setInitialRecords3(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search3.toLowerCase()) ||
                    // item.action.toLowerCase().includes(search3.toLowerCase()) ||
                    //item.status.toLowerCase().includes(search3.toLowerCase()) ||
                    item.type.toLowerCase().includes(search3.toLowerCase()) ||
                    item.started.toLowerCase().includes(search3.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search3]);

    //Skin: All
    const [page4, setPage4] = useState(1);
    const [pageSize4, setPageSize4] = useState(PAGE_SIZES[0]);
    const [initialRecords4, setInitialRecords4] = useState(rowData);
    const [recordsData4, setRecordsData4] = useState(initialRecords4);

    const [search4, setSearch4] = useState('');

    useEffect(() => {
        setPage4(1);
    }, [pageSize4]);

    useEffect(() => {
        const from = (page4 - 1) * pageSize4;
        const to = from + pageSize4;
        setRecordsData4([...initialRecords4.slice(from, to)]);
    }, [page4, pageSize4, initialRecords4]);

    useEffect(() => {
        setInitialRecords4(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search4.toLowerCase()) ||
                    // item.action.toLowerCase().includes(search4.toLowerCase()) ||
                    //item.status.toLowerCase().includes(search4.toLowerCase()) ||
                    item.type.toLowerCase().includes(search4.toLowerCase()) ||
                    item.started.toLowerCase().includes(search4.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search4]);

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
                                        <td>{show.startExamText}</td>
                                        <td>
                                            <span className={`${show.status_msg_btn} whitespace-nowrap  `}>{show.status_msg}</span>
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

export default Skin;
