import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ReactPlayer from 'react-player';
import IconVideo from '../../components/Icon/IconVideo';
import IconX from '../../components/Icon/IconX';
import IconFile from '../../components/Icon/IconFile';
import IconTxtFile from '../../components/Icon/IconTxtFile';
import pdf from '../../../public/Application .pdf';
import IconDownload from '../../components/Icon/IconDownload';
import IconEye from '../../components/Icon/IconEye';

const ModalK2 = () => {
    const [modal10, setModal10] = useState(false);

    return (
        <>
            <button onClick={() => setModal10(true)} type="button" className="flex justify-start ">
                <IconEye />
            </button>
            <Transition appear show={modal10} as={Fragment}>
                <Dialog as="div" open={modal10} onClose={() => setModal10(false)} className="sm:w-[300px] w-[100px]">
                    <Transition.Child as={Fragment} enter="ease-out duration-100" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
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
        </>
    );
};

export default ModalK2;
