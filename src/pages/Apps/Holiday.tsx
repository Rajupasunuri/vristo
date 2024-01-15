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
            <h2 className="font-bold text-lg">Announcements</h2>
            <div className="space-y-8 pt-5">
                <div className="panel" id="icon">
                    <div className="mb-5 flex items-center justify-between border-b-2 pb-6">
                        <h5 className="text-lg font-bold dark:text-white-light">Holidays</h5>
                        <div className="flex justify-end space-x-2">
                            <div>
                                <Link to="/notices" className="bg-[#6993ff] text-white p-2 rounded-md">
                                    Notices
                                </Link>
                            </div>
                            <div>
                                <Link to="/events" className="bg-[#ffa800] text-white p-2 rounded-md">
                                    Events
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="space-y-6">
                            {/* Skin: Striped  */}
                            <div className="panel">
                                <div className="flex items-center justify-end mb-5">
                                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div className="datatables">
                                    <DataTable
                                        striped
                                        className="whitespace-nowrap table-striped"
                                        records={recordsData}
                                        columns={[
                                            { accessor: 'id', title: '#' },

                                            { accessor: 'subject', title: 'TITLE' },
                                            { accessor: 'examdate', title: 'DATE' },

                                            {
                                                accessor: 'action',
                                                title: 'ACTION',
                                                render: () => (
                                                    <div className="flex  justify-start text-center pl-3 ">
                                                        <Tippy content="Delete" className="flex justify-start">
                                                            <button type="button" className="border  border-blue-400 rounded-md" onClick={() => alert('hello')}>
                                                                <IconEye />
                                                            </button>
                                                        </Tippy>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        totalRecords={initialRecords.length}
                                        recordsPerPage={pageSize}
                                        page={page}
                                        onPageChange={(p) => setPage(p)}
                                        recordsPerPageOptions={PAGE_SIZES}
                                        onRecordsPerPageChange={setPageSize}
                                        minHeight={200}
                                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
