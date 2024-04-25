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
import Accordians from '../Components/Accordians';
import DictionaryAccordian from './DictionaryAccordian';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_DICTIONARY_URL } from './query';

const Tabs = () => {
    const [word, setWord] = useState('');
    const [show, setShow] = useState(false);
    const [resWord, setResWord] = useState('');
    const [wordMeaning, setWordMeaning] = useState<any>({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
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
                };
                const response = await axios.post(MY_DASHBOARD_URL, postData, {
                    headers: headers,
                });

                console.log('dashboard', response);
                // if (response.data.error) {
                //     // setUsererror(response.data.message);
                // } else {
                //     const profiledtls = response.data.data;
                //     console.log('profiledtls:', profiledtls);

                //     // setProfile(profiledtls);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            // name: formData.name,
            // section: formData.section,
            // address: formData.address,
            // phoneNumber: formData.phoneNumber,
            // state: formData.state,
            // district: formData.district,
            // country: formData.country,
            // email: formData.email,
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            diction: word,
            // parentID: localStorage.parentID,
        };
        const loginurl = MY_DICTIONARY_URL;
        axios
            .post(loginurl, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('Response is----- ', response);
                if (!response.data.error) {
                    const meaningObject = JSON.parse(response.data.data.dictioninfo[0].meaning);

                    const resWord = response.data.data.dictioninfo[0].word;
                    setWordMeaning(meaningObject);
                    setShow(true);
                    console.log('parse ', meaningObject);
                    console.log('resword', resWord);
                    setResWord(resWord);
                }
                if (response.data.error) {
                    var errors = response.data.message;
                    errors.forEach((error: any) => {
                        switch (error.path) {
                            case 'address':
                                // setAddressErr(error.msg);
                                break;
                            case 'state':
                                //setStateErr(error.msg);
                                break;
                            case 'district':
                                //setDistErr(error.msg);
                                break;
                            case 'email':
                                // setEmailErr(error.msg);
                                break;
                            case 'phoneNumber':
                                // setPhoneErr(error.msg);
                                break;
                            default:
                                break;
                        }
                    });
                }
            })
            .catch((error) => {
                console.log('Error is ', error);
            });
    };
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const handleword = (e: any) => {
        setWord(e.target.value);
        setWordMeaning('');
        setShow(false);
    };

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="panel" id="line">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Dictionary</h5>
                    </div>
                    <div className="mb-5">
                        <Tab.Group>
                            <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                {/* <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                    before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Today Words
                                        </button>
                                    )}
                                </Tab> */}
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >
                                            Dictionary
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                {/* <Tab.Panel>
                                    <DictionaryAccordian />
                                </Tab.Panel> */}
                                <Tab.Panel>
                                    <div>
                                        <div className="flex items-start pt-5">
                                            <div className="flex-auto">
                                                <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-1">
                                                    <input
                                                        type="text"
                                                        value={word}
                                                        onChange={handleword}
                                                        placeholder="Some Text..."
                                                        className="block w-1/2 rounded-md border-0 py-1.5 pl-2  text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                                        required
                                                    />
                                                    <button type="submit" className="border border-gray-300 py-1.5 bg-white px-4 rounded-md">
                                                        Search
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            {show && (
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex space-x-2">
                                                        <p className="text-md font-bold">Word:</p>
                                                        <p>{resWord}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-md font-bold">Meaning and Uses:</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            {Object.keys(wordMeaning).map((item, key) => (
                                                <div key={key}>
                                                    <p></p>
                                                    <p className="space-x-2">
                                                        {item}
                                                        {wordMeaning[item]}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
