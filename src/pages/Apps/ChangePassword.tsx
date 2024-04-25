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
