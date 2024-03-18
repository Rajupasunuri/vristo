import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ReactPlayer from 'react-player';
import IconVideo from '../../components/Icon/IconVideo';
import IconX from '../../components/Icon/IconX';
import IconFile from '../../components/Icon/IconFile';
import IconTxtFile from '../../components/Icon/IconTxtFile';
import pdf from '../../../public/Application .pdf';
import IconDownload from '../../components/Icon/IconDownload';

const ModalK = () => {
    const [modal10, setModal10] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modal6, setModal6] = useState(false);

    return (
        <>
            <div className="grid sm:grid-cols-4 grid-cols-1 gap-2 space-y-2">
                <div className="panel mt-2 flex flex-col items-center justify-center hover:shadow-black ">
                    <button onClick={() => setModal10(true)} type="button">
                        <IconVideo className="sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] border-b-2" />
                    </button>
                    <Transition appear show={modal10} as={Fragment}>
                        <Dialog as="div" open={modal10} onClose={() => setModal10(false)} className="sm:w-[300px] w-[100px]">
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
                                                                    src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                    //src=".././public/assets/crown-logo.png"
                                                                    title="Video Title"
                                                                    //  frameBorder="0"

                                                                    allowFullScreen
                                                                    className="p-6 w-full "
                                                                ></iframe> */}

                                        {/* <ReactPlayer
                                            url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7"
                                            controls
                                            width="400px"
                                            height="200px"
                                            className="p-4 sm:w-full sm:h-full  flex items-center justify-center object-cover "
                                        /> */}
                                        <div className=" sm:w-full sm:h-full flex items-center justify-center">
                                            <ReactPlayer url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7" controls width="500px" height="250px" className="object-cover" />
                                        </div>

                                        {/* <img ref={imgRef} src={img} alt="" width="400px" height="300px" /> */}
                                        {/* <button onClick={handleDownload}>Download Image</button> */}

                                        <div className="panel lg:col-span-2 xl:col-span-3">
                                            <div className="mb-5">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="whitespace-nowrap">
                                                        <thead>
                                                            <tr>
                                                                {/* <th colSpan={2} className="text-center col-span">
                                                Projects
                                            </th> */}
                                                                {/* <th>Progress</th> */}
                                                                {/* <th>Task Done</th>
                                            <th className="text-center">Time</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5">
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>Ramesh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>Rani</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date</td>
                                                                <td>21-11-2023</td>
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
                    <div className=" panel flex justify-start items-start bg-gray-400 p-1">Chemistry Notes Video</div>
                </div>
                <div className="panel mt-2 flex flex-col items-center justify-center hover:shadow-black">
                    <button onClick={() => setModal2(true)} type="button">
                        <IconFile className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] border-b-2" />
                    </button>
                    <Transition appear show={modal2} as={Fragment}>
                        <Dialog as="div" open={modal2} onClose={() => setModal2(false)} className="sm:w-[300px] w-[100px]">
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
                                            <button onClick={() => setModal2(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        {/* <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                    //src=".././public/assets/crown-logo.png"
                                                                    title="Video Title"
                                                                    //  frameBorder="0"

                                                                    allowFullScreen
                                                                    className="p-6 w-full "
                                                                ></iframe> */}

                                        {/* <div className="p-4 sm:w-full sm:h-full flex items-center justify-center">
                                            <ReactPlayer url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7" controls width="400px" height="200px" className="object-cover" />
                                        </div> */}

                                        {/* <img ref={imgRef} src={img} alt="" width="400px" height="300px" /> */}
                                        {/* <button onClick={handleDownload}>Download Image</button> */}

                                        <div className="panel lg:col-span-2 xl:col-span-3">
                                            <div className="mb-5">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="whitespace-nowrap">
                                                        <thead>
                                                            <tr>
                                                                {/* <th colSpan={2} className="text-center col-span">
                                                Projects
                                            </th> */}
                                                                {/* <th>Progress</th> */}
                                                                {/* <th>Task Done</th>
                                            <th className="text-center">Time</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5">
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>Ramesh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>Rani</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date</td>
                                                                <td>21-11-2023</td>
                                                            </tr>
                                                            <tr>
                                                                <td>pdf</td>
                                                                <td>
                                                                    <a href={pdf} download>
                                                                        <IconDownload />
                                                                    </a>
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
                    <div className=" panel flex  justify-start items-start bg-gray-400 p-1">Chemistry Notes Video</div>
                </div>
                <div className="panel mt-2 flex flex-col items-center justify-center hover:shadow-black ">
                    <button onClick={() => setModal3(true)} type="button">
                        <IconVideo className="sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] border-b-2" />
                    </button>
                    <Transition appear show={modal3} as={Fragment}>
                        <Dialog as="div" open={modal3} onClose={() => setModal3(false)} className="sm:w-[300px] w-[100px]">
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
                                            <button onClick={() => setModal3(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        {/* <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                    //src=".././public/assets/crown-logo.png"
                                                                    title="Video Title"
                                                                    //  frameBorder="0"

                                                                    allowFullScreen
                                                                    className="p-6 w-full "
                                                                ></iframe> */}
                                        <div className=" sm:w-full sm:h-full flex items-center justify-center">
                                            <ReactPlayer url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7" controls width="500px" height="250px" className="object-cover" />
                                        </div>

                                        {/* <img ref={imgRef} src={img} alt="" width="400px" height="300px" /> */}
                                        {/* <button onClick={handleDownload}>Download Image</button> */}

                                        <div className="panel lg:col-span-2 xl:col-span-3">
                                            <div className="mb-5">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="whitespace-nowrap">
                                                        <thead>
                                                            <tr>
                                                                {/* <th colSpan={2} className="text-center col-span">
                                                Projects
                                            </th> */}
                                                                {/* <th>Progress</th> */}
                                                                {/* <th>Task Done</th>
                                            <th className="text-center">Time</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5">
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>Ramesh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>Rani</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date</td>
                                                                <td>21-11-2023</td>
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
                    <div className=" panel flex justify-start items-start bg-gray-400 p-1">Chemistry Notes Video</div>
                </div>
                <div className="panel mt-2 flex flex-col items-center justify-center hover:shadow-black">
                    <button onClick={() => setModal4(true)} type="button">
                        <IconVideo className="sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] border-b-2" />
                    </button>
                    <Transition appear show={modal4} as={Fragment}>
                        <Dialog as="div" open={modal4} onClose={() => setModal4(false)} className="sm:w-[300px] w-[100px]">
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
                                            <button onClick={() => setModal4(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        {/* <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                    //src=".././public/assets/crown-logo.png"
                                                                    title="Video Title"
                                                                    //  frameBorder="0"

                                                                    allowFullScreen
                                                                    className="p-6 w-full "
                                                                ></iframe> */}

                                        <div className=" sm:w-full sm:h-full flex items-center justify-center">
                                            <ReactPlayer url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7" controls width="500px" height="250px" className="object-cover" />
                                        </div>

                                        {/* <img ref={imgRef} src={img} alt="" width="400px" height="300px" /> */}
                                        {/* <button onClick={handleDownload}>Download Image</button> */}

                                        <div className="panel lg:col-span-2 xl:col-span-3">
                                            <div className="mb-5">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="whitespace-nowrap">
                                                        <thead>
                                                            <tr>
                                                                {/* <th colSpan={2} className="text-center col-span">
                                                Projects
                                            </th> */}
                                                                {/* <th>Progress</th> */}
                                                                {/* <th>Task Done</th>
                                            <th className="text-center">Time</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5">
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>Ramesh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>Rani</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date</td>
                                                                <td>21-11-2023</td>
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
                    <div className=" panel flex justify-start items-start bg-gray-400 p-1">Chemistry Notes Video</div>
                </div>
                <div className="panel mt-2 flex flex-col items-center justify-center hover:shadow-black">
                    <button onClick={() => setModal5(true)} type="button">
                        <IconVideo className="sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] border-b-2" />
                    </button>
                    <Transition appear show={modal5} as={Fragment}>
                        <Dialog as="div" open={modal5} onClose={() => setModal5(false)} className="sm:w-[300px] w-[100px]">
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
                                            <button onClick={() => setModal5(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        {/* <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                    //src=".././public/assets/crown-logo.png"
                                                                    title="Video Title"
                                                                    //  frameBorder="0"

                                                                    allowFullScreen
                                                                    className="p-6 w-full "
                                                                ></iframe> */}

                                        <div className=" sm:w-full sm:h-full flex items-center justify-center">
                                            <ReactPlayer url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7" controls width="500px" height="250px" className="object-cover" />
                                        </div>

                                        {/* <img ref={imgRef} src={img} alt="" width="400px" height="300px" /> */}
                                        {/* <button onClick={handleDownload}>Download Image</button> */}

                                        <div className="panel lg:col-span-2 xl:col-span-3">
                                            <div className="mb-5">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="whitespace-nowrap">
                                                        <thead>
                                                            <tr>
                                                                {/* <th colSpan={2} className="text-center col-span">
                                                Projects
                                            </th> */}
                                                                {/* <th>Progress</th> */}
                                                                {/* <th>Task Done</th>
                                            <th className="text-center">Time</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5">
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>Ramesh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>Rani</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date</td>
                                                                <td>21-11-2023</td>
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
                    <div className=" panel flex justify-start items-start bg-gray-400 p-1">Chemistry Notes Video</div>
                </div>
                <div className="panel mt-2 flex flex-col items-center justify-center hover:shadow-black">
                    <button onClick={() => setModal6(true)} type="button">
                        <IconVideo className="sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] border-b-2" />
                    </button>
                    <Transition appear show={modal6} as={Fragment}>
                        <Dialog as="div" open={modal6} onClose={() => setModal6(false)} className="sm:w-[300px] w-[100px]">
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
                                            <button onClick={() => setModal6(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        {/* <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src="https://www.youtube.com/embed/N2d7puNyPqw"
                                                                    //src=".././public/assets/crown-logo.png"
                                                                    title="Video Title"
                                                                    //  frameBorder="0"

                                                                    allowFullScreen
                                                                    className="p-6 w-full "
                                                                ></iframe> */}
                                        <div className=" sm:w-full sm:h-full flex items-center justify-center">
                                            <ReactPlayer url="https://youtu.be/8EKi2dV51TY?si=3j04cTgx-Izk_od7" controls width="500px" height="250px" className="object-cover" />
                                        </div>

                                        {/* <img ref={imgRef} src={img} alt="" width="400px" height="300px" /> */}
                                        {/* <button onClick={handleDownload}>Download Image</button> */}

                                        <div className="panel lg:col-span-2 xl:col-span-3">
                                            <div className="mb-5">
                                                <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                                    <table className="whitespace-nowrap">
                                                        <thead>
                                                            <tr>
                                                                {/* <th colSpan={2} className="text-center col-span">
                                                Projects
                                            </th> */}
                                                                {/* <th>Progress</th> */}
                                                                {/* <th>Task Done</th>
                                            <th className="text-center">Time</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dark:text-white-dark border-1.5">
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>Ramesh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>Rani</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date</td>
                                                                <td>21-11-2023</td>
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
                    <div className=" panel flex justify-start items-start bg-gray-400 p-1">Chemistry Notes Video</div>
                </div>
            </div>
        </>
    );
};

export default ModalK;
