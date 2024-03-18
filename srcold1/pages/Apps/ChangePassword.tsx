import { Link } from 'react-router-dom';
import IconLock from '../../components/Icon/IconLock';
import IconLogout from '../../components/Icon/IconLogout';
import IconUser from '../../components/Icon/IconUser';
import { NavLink } from '@mantine/core';

const ChangePassword = () => {
    return (
        <div>
            <h2 className="font-bold text-lg  mb-6 ">My Account</h2>
            <div className="  grid grid-col-2 gap-y-2 gap-x-4  md:grid-cols-12 md:gap-x-6 flex-flow-col md:grid-flow-row ">
                <div className="panel  md:col-span-4 object-cover">
                    <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                        <li>
                            <div className="flex  items-center px-4 py-4">
                                <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                                <div className="ltr:pl-4 rtl:pr-4 truncate">
                                    <h4 className="text-base">
                                        crown tech
                                        <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                                    </h4>
                                    <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                        crown@gmail.com
                                    </button>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link to="/users/profile" className="">
                                <span className="flex gap-2">
                                    <IconUser className="  w-7 h-7  ml-4" />
                                    <div className="ml-5  border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1">Profile Information</div>
                                </span>
                            </Link>
                        </li>

                        <li className="mt-4">
                            {/* <Link to="/change-password" className=" ">
                                <span className="flex">
                                    <IconLock className="sm:w-10 sm:h-9 w-7 h-6 ml-3 shrink-0" />
                                    <div className="ml-5 active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-2 rounded-md hover:bg-blue-400 hover:text-white sm:text-sm p-1">
                                        
                                        Change Password
                                    </div>
                                </span>
                            </Link> */}
                            <Link to="/change-password" className=" ">
                                <span className="flex gap-2">
                                    <IconLock className=" w-7 h-7 ml-4" />
                                    <div className=" ml-5 border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1">Change Password</div>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="panel  md:col-span-8 object-cover space-y-6">
                    <h2 className="font-bold text-lg border-b-2 mb-6">Change Password</h2>
                    <div className="flex sm:flex-row flex-col items-center justify-between gap-x-2">
                        <label htmlFor="profession">Current Password:</label>
                        <input id="profession" type="password" placeholder="" className="form-input w-1/2 mr-8" />
                    </div>
                    <div className="flex sm:flex-row flex-col items-center justify-between gap-x-2">
                        <label htmlFor="profession">New Password:</label>
                        <input id="profession" type="password" placeholder="" className="form-input w-1/2 mr-8 " />
                    </div>
                    <div className="flex sm:flex-row flex-col items-center justify-between gap-x-2">
                        <label htmlFor="profession">Confirm New Password:</label>
                        <input id="profession" type="password" placeholder="" className="form-input w-1/2 mr-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
// import { Link } from 'react-router-dom';
// import CodeHighlight from '../../components/Highlight';
// import { useState, Fragment, useEffect } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import { Tab } from '@headlessui/react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Navigation, Pagination } from 'swiper';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import IconBell from '../../components/Icon/IconBell';
// import IconCode from '../../components/Icon/IconCode';
// import IconX from '../../components/Icon/IconX';
// import IconUser from '../../components/Icon/IconUser';
// import IconAt from '../../components/Icon/IconAt';
// import IconLock from '../../components/Icon/IconLock';
// import IconFacebook from '../../components/Icon/IconFacebook';
// import IconGithub from '../../components/Icon/IconGithub';
// import IconCaretDown from '../../components/Icon/IconCaretDown';

// const Modals = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Modals'));
//     });

//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     const [modal10, setModal10] = useState(false);

//     const themeConfig = useSelector((state: IRootState) => state.themeConfig);

//     return (
//         <div>
//             {/* Animation Style Modal */}
//             <div className="panel md:col-span-2">

//                 <div className="mb-5">
//                     <div className="flex flex-wrap items-center justify-center gap-2">
//                         {/* FadeIn */}

//                         {/* SlideIn Down */}
//                         <div>
//                             <button onClick={() => setModal10(true)} type="button" className="btn btn-info">
//                                 SlideIn Down
//                             </button>
//                             <Transition appear show={modal10} as={Fragment}>
//                                 <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
//                                     <Transition.Child
//                                         as={Fragment}
//                                         enter="ease-out duration-300"
//                                         enterFrom="opacity-0"
//                                         enterTo="opacity-100"
//                                         leave="ease-in duration-200"
//                                         leaveFrom="opacity-100"
//                                         leaveTo="opacity-0"
//                                     >
//                                         <div className="fixed inset-0" />
//                                     </Transition.Child>
//                                     <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
//                                         <div className="flex min-h-screen items-start justify-center px-4">
//                                             <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
//                                                 <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
//                                                     <h5 className="text-lg font-bold">Modal Title</h5>
//                                                     <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
//                                                         <IconX />
//                                                     </button>
//                                                 </div>
//                                                 <div className="p-5">
//                                                     <p>
//                                                         Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et
//                                                         magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi.
//                                                     </p>
//                                                     <div className="mt-8 flex items-center justify-end">
//                                                         <button onClick={() => setModal10(false)} type="button" className="btn btn-outline-danger">
//                                                             Discard
//                                                         </button>
//                                                         <button onClick={() => setModal10(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
//                                                             Save
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </Dialog.Panel>
//                                         </div>
//                                     </div>
//                                 </Dialog>
//                             </Transition>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Custom */}
//         </div>
//     );
// };

// export default Modals;
