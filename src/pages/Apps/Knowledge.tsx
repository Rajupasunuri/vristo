import { Link } from 'react-router-dom';
import { Dialog, Tab, Transition } from '@headlessui/react';
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
//import {FaYoutube} from 'react-icons';

const tableData = [
    {
        id: 1,
        date: '23-12-2024',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
        state: <Modal1 />,
    },
    {
        id: 2,
        date: '23-12-2024',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
        state: <ModalK2 />,
    },
    {
        id: 3,
        date: '23-12-2024',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
        state: <ModalK3 />,
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

    const handleDownload = () => {
        const imageElement = imgRef.current;

        if (imageElement) {
            // Added this check
            html2canvas(imageElement).then((canvas) => {
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'downloaded-image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
    };

    // const downloadPdf = () => {
    //     const pdfUrl = '/src/Application.pdf';
    //     // Update the path based on your actual PDF file
    //     const link = document.createElement('a');
    //     link.href = pdfUrl;
    //     link.download = 'Application.pdf';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };
    return (
        <div>
            <div className="space-y-8 pt-5">
                <h5 className="text-lg font-semibold dark:text-white-light">Knowledge Bank</h5>
                <div className="panel" id="line">
                    <div className="mb-5 flex items-center justify-between"></div>
                    <div className="mb-5">
                        <Tab.Group>
                            <Tab.List onClick={handleTab} className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                    before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Biology
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Chemistry
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            English1
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Geography
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Hindi
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            HSistory & Civics
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Maths
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Physics
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Telugu
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Others
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <div className="flex justify-end  space-x-2 space-y-2 ">
                                <div className="mt-2">
                                    <button onClick={handleTab} className="bg-white text-[#ffa800] p-1 sm:p-2 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
                                        <IconGrid />
                                    </button>
                                </div>
                                <div>
                                    <button onClick={handleTab1} className="bg-white text-[#ffa800] p-1 sm:p-2 rounded-md hover:shadow-lg  hover:bg-[#ffa800] hover:text-white border-[#ffa800] border">
                                        <IconList />
                                    </button>
                                </div>
                            </div>
                            {tab ? (
                                <>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <ModalK />
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </>
                            ) : null}

                            {tab1 ? (
                                <>
                                    <div>
                                        <div className="flex items-center justify-start mb-5">
                                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                        </div>
                                        <div className="table-responsive mb-5">
                                            <table className="table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>SL.NO</th>
                                                        <th> DATE</th>
                                                        <th>TITLE</th>

                                                        <th>FILE TYPE</th>

                                                        <th className="text-center ">ACTION</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData.map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.id}</td>
                                                                <td>
                                                                    <div className="whitespace-nowrap">{data.date}</div>
                                                                </td>
                                                                <td>{data.type}</td>

                                                                <td>
                                                                    <button className="flex items-center justify-center">
                                                                        <IconDownload />
                                                                    </button>
                                                                </td>

                                                                <td>
                                                                    <div>{data.state}</div>
                                                                    {/* <div>
                                                                        <button onClick={() => setModal10(true)} type="button" className="border border-blue-400 rounded-md">
                                                                            <IconEye />
                                                                        </button>
                                                                        <Transition appear show={modal10} as={Fragment}>
                                                                            <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
                                                                                <Transition.Child
                                                                                    as={Fragment}
                                                                                    enter="ease-out duration-100"
                                                                                    enterFrom="opacity-0"
                                                                                    enterTo="opacity-100"
                                                                                    leave="ease-in duration-100"
                                                                                    leaveFrom="opacity-100"
                                                                                    leaveTo="opacity-0"
                                                                                >
                                                                                    <div className="fixed inset-0" />
                                                                                </Transition.Child>
                                                                                <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/20">
                                                                                    <div className="flex min-h-screen items-start justify-center px-4">
                                                                                        <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                                                                            <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                                                                                <h5 className="text-lg font-bold"></h5>
                                                                                                <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
                                                                                                    <IconX />
                                                                                                </button>
                                                                                            </div>
                                                                         

                                                                                            <div className="p-4 sm:w-full sm:h-full flex items-center justify-center">
                                                                                                <img ref={imgRef} src={img} alt="" width="400px" height="200px" />
                                                                                            </div>

                                                                                            

                                                                                            <div className="panel lg:col-span-2 xl:col-span-3">
                                                                                                <div className="mb-5">
                                                                                                    <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                                                                        <table className="whitespace-nowrap">
                                                                                                            <thead>
                                                                                                                <tr>
                                                    
                                                                                                                   
                                                                                    
                                                                                                                </tr>
                                                                                                            </thead>
                                                                                                            <tbody className="dark:text-white-dark border-1.5">
                                                                                                                <tr>
                                                                                                                    <td className="text-base font-bold">Name</td>
                                                                                                                    <td>Ramesh</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="text-base font-bold">Description</td>
                                                                                                                    <td>Rani</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="text-base font-bold">Date</td>
                                                                                                                    <td>23-11-2023</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="text-base font-bold">Image Download</td>
                                                                                                                    <td>
                                                                                                                        <button onClick={handleDownload}>
                                                                                                                            <IconDownload />
                                                                                                                        </button>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Dialog.Panel>
                                                                                    </div>
                                                                                </div>
                                                                            </Dialog>
                                                                        </Transition>
                                                                    </div> */}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
