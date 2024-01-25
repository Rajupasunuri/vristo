import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { SetStateAction, useEffect, useState } from 'react';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconMail from '../../components/Icon/IconMail';
import IconPhone from '../../components/Icon/IconPhone';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconDribbble from '../../components/Icon/IconDribbble';
import IconGithub from '../../components/Icon/IconGithub';
import IconShoppingBag from '../../components/Icon/IconShoppingBag';
import IconTag from '../../components/Icon/IconTag';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import IconClock from '../../components/Icon/IconClock';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
//import CropImg from '../Pages/cropimg';
//import CropImgUpload from '../Pages/cropimg';
import axios from 'axios';
//import {u=U_URL}
import { U_URL } from '../Apps/query';
import Select from 'react-select';
import swal from 'sweetalert';
import { Alert, Row, Col, Card, CardBody, CardTitle, CardImg, CardText, CardSubtitle, Modal, Button, FormGroup, InputGroup, Label, Table } from 'reactstrap';
//import UploadAvtar from './UploadAvtar';
import Uploadfile from './cropimg';
import IconLock from '../../components/Icon/IconLock';
import Tippy from '@tippyjs/react';

const Profile = () => {
    const dispatch = useDispatch();
    const [itempageabout, setItemPageAbout] = useState('Add  User | Management');
    const [itemlablename, setItemLablename] = useState(' Manager Name');
    const [tname, setTname] = useState('u');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [selectUsertype, setSelectUsertype] = useState([
        {
            value: '',
            label: <div>Select Venue Type</div>,
        },
    ]);
    const [itemvalue, setItemValue] = useState('');
    const [cuMobile, setCuMobile] = useState('');
    const [cuEmail, setCuEmail] = useState('');
    const [cuImageUrl, setCuImageUrl] = useState('');
    const [usertypeValue, setUsertypeValue] = useState('');
    const [venueName, setVenueName] = useState('');
    const [venueDescription, setVenueDescription] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [hlatlong, setHlatlong] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [timings, setTimings] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState('');

    useEffect(() => {
        handleGetkeys();
    }, []);

    //   const handleBkey = () => {
    //     localStorage.setItem('uuid', '');
    //     history.push('/users');
    //   };

    const handleGetkeys = () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            uid: localStorage.usercode,
            table: tname,
            id: localStorage.uuid,
        };

        const getuurl = U_URL + 'getudetails';
        axios
            .post(getuurl, postData, { headers: headers })
            .then((response) => {
                console.log('response', response.data);
                if (response.status === 400) {
                }
                if (!response.data.error) {
                    localStorage.setItem('token', response.data.token);
                    const cudata = response.data.allitems;
                    const allusertypes = [...response.data.usertypes];

                    if (localStorage.uuid) {
                        setEditMode(true);
                        setEditId(cudata.id);
                        setItemValue(cudata.itemname);
                        setCuMobile(cudata.cu_mobile);
                        setCuEmail(cudata.cu_email);
                        setCuImageUrl(cudata.cu_image_url);
                        setShowAlert(false);
                        setSelectUsertype(allusertypes);
                    } else {
                        setEditMode(false);
                        setSelectUsertype(allusertypes);
                    }
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleValidSubmit = (
        event: { preventDefault: () => void },
        values: { item: string; venue_name: any; cu_mobile: any; cu_email: any; venue_description: any; venue_address: any; hlatlong: any; opening_time: any; closing_time: any; timings: any }
    ) => {
        event.preventDefault();
        console.log('values', values);
        let noerrors = false;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };
        let addkeyurl = U_URL + 'additemcu';
        let postData;

        if (editMode) {
            if (!localStorage.cu_image_url) {
                swal('Select Profile Picture', {
                    icon: 'warning',
                });
            } else {
                noerrors = true;
            }
        } else {
            if (!localStorage.venue_logo || !localStorage.cu_image_url || !localStorage.venue_building || !localStorage.venue_banner || !usertypeValue) {
                swal('Please fill all required fields', {
                    icon: 'warning',
                });
            } else {
                noerrors = true;
            }
        }

        if (noerrors) {
            if (editMode) {
                addkeyurl = U_URL + 'edititemcu';
                postData = {
                    itemid: editId,
                    item: values.item,
                    uid: localStorage.usercode,
                    table: tname,
                    venue_name: values.venue_name,
                    cu_mobile: values.cu_mobile,
                    cu_email: values.cu_email,
                    cu_image_url: localStorage.cu_image_url,
                };
            } else {
                postData = {
                    item: values.item,
                    uid: localStorage.usercode,
                    table: tname,
                    usertype: usertypeValue,
                    venue_name: values.venue_name,
                    cu_mobile: values.cu_mobile,
                    cu_email: values.cu_email,
                    venue_description: values.venue_description,
                    venue_address: values.venue_address,
                    hlatlong: values.hlatlong,
                    opening_time: values.opening_time,
                    closing_time: values.closing_time,
                    timings: values.timings,
                    cu_image_url: localStorage.cu_image_url,
                    venue_logo: localStorage.venue_logo,
                    venue_building: localStorage.venue_building,
                    venue_banner: localStorage.venue_banner,
                };
            }

            axios
                .post(addkeyurl, postData, { headers: headers })
                .then((response) => {
                    console.log(response.data.message);
                    if (response.data.error) {
                        setShowAlert(true);
                        setAlertType('warning');
                        setAlertText(response.data.message);
                    } else {
                        setShowAlert(false);
                        setAlertType('warning');
                        setAlertText('');
                        localStorage.setItem('token', response.data.token);

                        swal(values.item + ' ' + response.data.message, {
                            icon: 'success',
                        });
                        //  history.push('/users');
                    }
                })
                .catch((error) => {
                    console.log('Error is ', error);
                    setShowAlert(true);
                    setAlertType('danger');
                    setAlertText('Failed Try Again Later!');
                });
        }
    };

    const handleSelectUsertypeChange = (selectedOption: { value: SetStateAction<string> }) => {
        console.log('selectedOption', selectedOption);
        setUsertypeValue(selectedOption.value);
    };
    const user = useSelector((state: IRootState) => state.themeConfig.user);
    let yes;
    let yes1;
    let yes2;
    let yes3;
    let yes4;
    if (user !== null) {
        yes = user.email;
        yes1 = user.name;
        yes2 = user.mobile;
        yes3 = user.role;
        yes4 = user.img_url;
        console.log('hvbjsdncnxjvxnv', user);
    }
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            {/* <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul> */}
            <h2 className="font-bold text-lg">My Account</h2>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Student Profile</h5>
                            <Tippy content="Edit Profile">
                                <Link to="/users/user-account-settings" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                                    <IconPencilPaper />
                                </Link>
                            </Tippy>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                {/* <CropImg imgsrc={localStorage.cu_image_url} className="img-thumbnail onclicklink" onwhich='cu_image_url' imgtitle='Profile Picture' imgw={250}></CropImg> */}
                                {/* <UploadAvtar></UploadAvtar> */}
                                {/* <Uploadfile
                                    imgsrc={localStorage.cu_image_url}
                                    className="img-thumbnail onclicklink"
                                    onwhich="cu_image_url"
                                    imgtitle="Profile Picture"
                                    imgw={250}
                                    imgh={250}
                                ></Uploadfile> */}
                                {/* <CropImgUpload imgsrc="path/to/image.jpg" className="img-thumbnail onclicklink" onwhich='cu_image_url' imgtitle='Profile Picture' imgcropw={1} imgcroph={1} imgw={250} imgh={250} /> */}
                                <p className="font-semibold text-primary text-xl">Joe Doe</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconCoffee className="shrink-0" />
                                    {yes3}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    Jan 20, 1989
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconMapPin className="shrink-0" />
                                    New York, USA
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">Joe@gmail.com</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        {yes2}
                                    </span>
                                </li>
                                <Link to="/change-password" className=" ">
                                    <span className="flex gap-2">
                                        <IconLock />
                                        <div className=" active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1">
                                            Change Password
                                        </div>
                                    </span>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Parents Information</h5>
                        </div>
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
                                            <td>Father Name</td>
                                            <td>Ramesh</td>
                                        </tr>
                                        <tr>
                                            <td>Mother Name</td>
                                            <td>Rani</td>
                                        </tr>
                                        <tr>
                                            <td>Father's Profession</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Mother's Profession</td>
                                            <td></td>
                                        </tr>

                                        <tr>
                                            <td>Father Name</td>
                                            <td>Ramesh</td>
                                        </tr>
                                        <tr>
                                            <td>Guardian Name</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Guardian Profession</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Summary</h5>
                        </div>
                        <div className="space-y-4">
                            <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                <div className="flex items-center justify-between p-4 py-2">
                                    <div className="grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                                        <IconShoppingBag />
                                    </div>
                                    <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                                        <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                                            Income
                                            <span className="block text-base text-[#515365] dark:text-white-light">$92,600</span>
                                        </h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-secondary">90%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                <div className="flex items-center justify-between p-4 py-2">
                                    <div className="grid place-content-center w-9 h-9 rounded-md bg-info-light dark:bg-info text-info dark:text-info-light">
                                        <IconTag />
                                    </div>
                                    <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                                        <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                                            Profit
                                            <span className="block text-base text-[#515365] dark:text-white-light">$37,515</span>
                                        </h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-info">65%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                <div className="flex items-center justify-between p-4 py-2">
                                    <div className="grid place-content-center w-9 h-9 rounded-md bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                                        <IconCreditCard />
                                    </div>
                                    <div className="ltr:ml-4 rtl:mr-4 flex items-start justify-between flex-auto font-semibold">
                                        <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                                            Expenses
                                            <span className="block text-base text-[#515365] dark:text-white-light">$55,085</span>
                                        </h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-warning">80%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-10">
                            <h5 className="font-semibold text-lg dark:text-white-light">Pro Plan</h5>
                            <button className="btn btn-primary">Renew Now</button>
                        </div>
                        <div className="group">
                            <ul className="list-inside list-disc text-white-dark font-semibold mb-7 space-y-2">
                                <li>10,000 Monthly Visitors</li>
                                <li>Unlimited Reports</li>
                                <li>2 Years Data Storage</li>
                            </ul>
                            <div className="flex items-center justify-between mb-4 font-semibold">
                                <p className="flex items-center rounded-full bg-dark px-2 py-1 text-xs text-white-light font-semibold">
                                    <IconClock className="w-3 h-3 ltr:mr-1 rtl:ml-1" />5 Days Left
                                </p>
                                <p className="text-info">$25 / month</p>
                            </div>
                            <div className="rounded-full h-2.5 p-0.5 bg-dark-light overflow-hidden mb-5 dark:bg-dark-light/10">
                                <div className="bg-gradient-to-r from-[#f67062] to-[#fc5296] w-full h-full rounded-full relative" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Payment History</h5>
                        </div>
                        <div>
                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                <div className="flex items-center justify-between py-2">
                                    <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                        March
                                        <span className="block text-white-dark dark:text-white-light">Pro Membership</span>
                                    </h6>
                                    <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                        <p className="font-semibold">90%</p>
                                        <div className="dropdown ltr:ml-4 rtl:mr-4">
                                            <Dropdown
                                                offset={[0, 5]}
                                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                btnClassName="hover:text-primary"
                                                button={<IconHorizontalDots className="opacity-80 hover:opacity-100" />}
                                            >
                                                <ul className="!min-w-[150px]">
                                                    <li>
                                                        <button type="button">View Invoice</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Download Invoice</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                <div className="flex items-center justify-between py-2">
                                    <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                        February
                                        <span className="block text-white-dark dark:text-white-light">Pro Membership</span>
                                    </h6>
                                    <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                        <p className="font-semibold">90%</p>
                                        <div className="dropdown ltr:ml-4 rtl:mr-4">
                                            <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="opacity-80 hover:opacity-100" />}>
                                                <ul className="!min-w-[150px]">
                                                    <li>
                                                        <button type="button">View Invoice</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Download Invoice</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between py-2">
                                    <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                        January
                                        <span className="block text-white-dark dark:text-white-light">Pro Membership</span>
                                    </h6>
                                    <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                        <p className="font-semibold">90%</p>
                                        <div className="dropdown ltr:ml-4 rtl:mr-4">
                                            <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="opacity-80 hover:opacity-100" />}>
                                                <ul className="!min-w-[150px]">
                                                    <li>
                                                        <button type="button">View Invoice</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Download Invoice</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Card Details</h5>
                        </div>
                        <div>
                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex-none">
                                        <img src="/assets/images/card-americanexpress.svg" alt="img" />
                                    </div>
                                    <div className="flex items-center justify-between flex-auto ltr:ml-4 rtl:mr-4">
                                        <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                            American Express
                                            <span className="block text-white-dark dark:text-white-light">Expires on 12/2025</span>
                                        </h6>
                                        <span className="badge bg-success ltr:ml-auto rtl:mr-auto">Primary</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex-none">
                                        <img src="/assets/images/card-mastercard.svg" alt="img" />
                                    </div>
                                    <div className="flex items-center justify-between flex-auto ltr:ml-4 rtl:mr-4">
                                        <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                            Mastercard
                                            <span className="block text-white-dark dark:text-white-light">Expires on 03/2025</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex-none">
                                        <img src="/assets/images/card-visa.svg" alt="img" />
                                    </div>
                                    <div className="flex items-center justify-between flex-auto ltr:ml-4 rtl:mr-4">
                                        <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                            Visa
                                            <span className="block text-white-dark dark:text-white-light">Expires on 10/2025</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Profile;
