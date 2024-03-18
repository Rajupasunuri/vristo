import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconSettings from '../../components/Icon/IconSettings';
import Tippy from '@tippyjs/react';
import IconXCircle from '../../components/Icon/IconXCircle';
import TalentShow from './TalentShow';
import { DataTable } from 'mantine-datatable';
import IconEye from '../../components/Icon/IconEye';
import Picker from './Picker';
import EditorMce from './EditorMce';

const rowData = [
    {
        id: 1,
        examtitle: '7th Physics',
        action: <button></button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Date Expired</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        duration: '00:45',
        subject: 'Physics',
        examdate: '14 Oct 2023',
        time: '10:30AM-10:50AM',
        question: '15',
        marks: '15',
    },
    {
        id: 2,
        action: <button></button>,
        status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
        type: 'offline',
        started: '+1 (821) 447-3782',
        finished: '',
        examtitle: '7th Maths',
        duration: '00:45',
        subject: 'Maths',
        examdate: '14 Oct 2023',
        time: '10:51AM-11:11AM',
        question: '10',
        marks: '10',
    },
];

const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

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

    return (
        <div>
            <h2 className="font-bold text-lg">Leave Mangement</h2>
            <div className="space-y-8 pt-5">
                <div className="panel " id="icon">
                    <div className="mb-5 flex flex-col sm:flex-row items-center justify-between border-b-2 pb-6">
                        <h5 className="text-sm font-bold dark:text-white-light mb-4 sm:mb-0">Apply Leave</h5>
                        <div className="flex justify-end space-x-2">
                            <div></div>
                            <div>
                                <Link to="/leave-management" className="bg-white text-[#ffa800] p-2 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
                                    + Leave Management
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <span className="sm:mr-20 mr-4">Leave From*</span>
                            <Picker />
                        </div>
                        <div className="flex items-center ml-4">
                            <span className="sm:mr-20 mr-4 sm:ml-4 md:ml-6 lg:ml-8 ml-2">Leave To*</span>
                            <Picker />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="mr-4">Subject*</span>
                        <input type="text" className=" w-1/2 ml-20 form-input rounded" />
                    </div>
                    <div className="flex mt-8 ">
                        <span className="mr-20">Message*</span>

                        <EditorMce />
                    </div>
                    {/* <div className="flex justify-center items-center mt-4">
                        <button className="mr-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Tabs;
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import Picker from './Picker';
// import EditorMce from './EditorMce';

// const rowData = [
//     {
//         id: 1,
//         examtitle: '7th Physics',
//         action: <button></button>,
//         status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Date Expired</div>,
//         type: 'offline',
//         started: '+1 (821) 447-3782',
//         finished: '',
//         duration: '00:45',
//         subject: 'Physics',
//         examdate: '14 Oct 2023',
//         time: '10:30AM-10:50AM',
//         question: '15',
//         marks: '15',
//     },
//     {
//         id: 2,
//         action: <button></button>,
//         status: <div className="bg-red-300 pl-4 py-1 pr-1 rounded-md text-red-600">Not Started</div>,
//         type: 'offline',
//         started: '+1 (821) 447-3782',
//         finished: '',
//         examtitle: '7th Maths',
//         duration: '00:45',
//         subject: 'Maths',
//         examdate: '14 Oct 2023',
//         time: '10:51AM-11:11AM',
//         question: '10',
//         marks: '10',
//     },
// ];

// const Tabs = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Tabs'));
//     });

//     const [tabs, setTabs] = useState<string[]>([]);
//     const toggleCode = (name: string) => {
//         if (tabs.includes(name)) {
//             setTabs((value) => value.filter((d) => d !== name));
//         } else {
//             setTabs([...tabs, name]);
//         }
//     };

//     useEffect(() => {
//         dispatch(setPageTitle('Skin Tables'));
//     });

//     const PAGE_SIZES = [10, 20, 30, 50, 100];
//     const [page, setPage] = useState(1);
//     const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
//     const [initialRecords, setInitialRecords] = useState(rowData);
//     const [recordsData, setRecordsData] = useState(initialRecords);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         setPage(1);
//     }, [pageSize]);

//     useEffect(() => {
//         const from = (page - 1) * pageSize;
//         const to = from + pageSize;
//         setRecordsData([...initialRecords.slice(from, to)]);
//     }, [page, pageSize, initialRecords]);

//     useEffect(() => {
//         setInitialRecords(() => {
//             return rowData.filter((item) => {
//                 return item.id.toString().includes(search.toLowerCase()) || item.type.toLowerCase().includes(search.toLowerCase()) || item.started.toLowerCase().includes(search.toLowerCase());
//             });
//         });
//     }, [search]);

//     return (
//         <div className="container mx-auto">
//             <h2 className="font-bold text-lg">Leave Management</h2>
//             <div className="space-y-8 pt-5">
//                 <div className="panel p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12" id="icon">
//                     <div className="mb-5 flex flex-col sm:flex-row items-center justify-between border-b-2 pb-6">
//                         <h5 className="text-sm font-bold dark:text-white-light mb-4 sm:mb-0">Apply Leave</h5>
//                         <div className="flex justify-end space-x-2">
//                             <Link to="/leave-management" className="bg-white text-[#ffa800] p-2 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
//                                 + Leave Management
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="flex items-center">
//                         <div className="flex items-center">
//                             <span className="sm:mr-20 mr-4">Leave From*</span>
//                             <Picker />
//                         </div>
//                         <div className="flex items-center ml-4">
//                             <span className="sm:mr-20 mr-4 sm:ml-4 md:ml-6 lg:ml-8 ml-2">Leave To*</span>
//                             <Picker />
//                         </div>
//                     </div>
//                     <div className="flex items-center mt-4">
//                         <span className="mr-4">Subject*</span>
//                         <input type="text" className="w-1/2 sm:w-full form-input rounded" />
//                     </div>
//                     <div className="flex mt-8 ">
//                         <span className="mr-20">Message*</span>
//                         <EditorMce />
//                     </div>
//                     <div className="flex justify-center items-center mt-4">
//                         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tabs;
