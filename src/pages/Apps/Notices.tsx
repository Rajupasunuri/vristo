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

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/components/tabs" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Tabs</span>
                </li>
            </ul>
            <div className="space-y-8 pt-5">
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                    <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://headlessui.com/react/tabs" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://headlessui.com/react/tabs
                    </a>
                </div>

                <div className="panel" id="icon">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Icon Tabs</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <Tab.Group>
                            <Tab.List className="mt-3 mr-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger border-b-white`}
                                        >
                                            <IconHome className="ltr:mr-2 rtl:ml-2" />
                                            Home
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
                                        >
                                            <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Profile
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <h4 className="mb-4 text-2xl font-semibold">We move your world!</h4>
                                        <p className="mb-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div>
                                        <div className="flex items-start pt-5">
                                            <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                                                <img src="/assets/images/profile-34.jpeg" alt="img" className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark" />
                                            </div>
                                            <div className="flex-auto">
                                                <h5 className="mb-4 text-xl font-medium">Media heading</h5>
                                                <p className="text-white-dark">
                                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                                    viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>

                                <Tab.Panel>Disabled</Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
