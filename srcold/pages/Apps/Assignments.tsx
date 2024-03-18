import { useEffect, useState, Fragment } from 'react';
import CodeHighlight from '../../components/Highlight';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconPencil from '../../components/Icon/IconPencil';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconCircleCheck from '../../components/Icon/IconCircleCheck';
import IconSettings from '../../components/Icon/IconSettings';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import IconEye from '../../components/Icon/IconEye';
import IconDownload from '../../components/Icon/IconDownload';
import ReactPlayer from 'react-player';
import img from '/public/crown-logo.png';
import html2canvas from 'html2canvas';
import React from 'react';
//import print from '/public/Application.pdf';

const tableData = [
    {
        id: 1,
        hostel: 'School Hostel',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
    },
    {
        id: 2,
        hostel: 'School Hostel',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
    },
    {
        id: 3,
        hostel: 'School Hostel',
        type: 'Combine',
        rooms: '30',
        members: '38',
        address: 'Balaji Nagar',
        note: '',
        availability: <span className="bg-red-300 text-red-600 p-1 rounded-md">Date Expired</span>,
        action: '',
    },
];

const Tables = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
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

    const imgRef = React.createRef<HTMLImageElement>();

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
    // const download = (url) => {
    //     const filename = url.split('/').pop();
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.setAttribute('download1', filename);
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    // };
    const downloadPdf = () => {
        const pdfUrl = '/src/Application.pdf';
        // Update the path based on your actual PDF file
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Application.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="space-y-6">
            {/* Simple */}

            {/* Hover Table  */}
            <h3 className="font-bold text-lg">Assignments</h3>
            <div className="panel">
                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th> CREATED DATE</th>
                                <th>TITLE</th>
                                <th>SUBJECT</th>
                                <th>LAST DATE</th>

                                <th>
                                    <button>
                                        <IconDownload />
                                    </button>
                                </th>

                                <th>STATUS</th>
                                <th className="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data.hostel}</div>
                                        </td>
                                        <td>{data.type}</td>
                                        <td>{data.rooms}</td>
                                        <td>{data.members}</td>
                                        <td>
                                            <button>
                                                <IconDownload />
                                            </button>
                                        </td>

                                        <td>{data.availability}</td>
                                        <td>
                                            <div>
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
                                                                        <h5 className="text-lg font-bold">Book School Hotel</h5>
                                                                        <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
                                                                            <IconX />
                                                                        </button>
                                                                    </div>
                                                                    {/* <iframe
                                                                        width="560"
                                                                        height="315"
                                                                        // src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                        src=".././public/assets/crown-logo.png"
                                                                        title="Video Title"
                                                                        //  frameBorder="0"

                                                                        allowFullScreen
                                                                        className="p-6 w-full "
                                                                    ></iframe> */}
                                                                    <ReactPlayer
                                                                        url="https://youtu.be/N2d7puNyPqw?si=fKY2WghPTEFRzlpR"
                                                                        controls
                                                                        width="700"
                                                                        height="800"
                                                                        className="p-4 w-full h-full"
                                                                    />

                                                                    <img ref={imgRef} src={img} alt="" width="400px" height="300px" />
                                                                    <button onClick={handleDownload}>Download Image</button>
                                                                    <button onClick={downloadPdf}>Download PDF</button>

                                                                    <div className="p-5 ">
                                                                        <div className="font-bold flex items-center justify-center">School Hostel</div>
                                                                        <div className="font-bold flex items-center justify-center">Combine Hostel</div>
                                                                        <div className="font-bold flex items-center justify-center">Balaji Hostel</div>
                                                                    </div>
                                                                    <div className="mb-5 mr-0 ml-6 flex items-center ">
                                                                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                            <div className="py-7 px-6">
                                                                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light border-b">Simple</h5>
                                                                                <p className="text-white-dark">No Of Rooms:30</p>
                                                                                <p className="text-white-dark">Max. Members per Rooms:5</p>
                                                                                <p className="text-white-dark">Members filled:38</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Dialog.Panel>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </div>
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
