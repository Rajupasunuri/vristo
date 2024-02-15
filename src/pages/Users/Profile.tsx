import { BrowserRouter as Router, Route, useParams, Link } from 'react-router-dom';
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
import state from 'sweetalert/typings/modules/state';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Center } from '@mantine/core';

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
    const [profilebox, setprofilebox] = useState(true);
    const [profileinfobox, setprofileinfobox] = useState(true);
    const [profilerequestbox, setprofilerequestbox] = useState(false);
    const [changepwdbox, setchangepwdbox] = useState(false);
    const [passsucc, setPasssucc] = useState(false);
    const { chpwd } = useParams();
    const [currerr, setCurrerr] = useState('');
    const [match, setmatch] = useState('');
    const [succ, setsucc] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        section: '',
        address: '',
        phoneNumber: '',
        state: '',
        image: '',
        district: '',
        country: 'India',
        email: '',
    });

    const [data2, setData2] = useState({
        current: '',
        newpass: '',
        confirm: '',
    });

    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [section, setSection] = useState('');
    const [state1, setState1] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [new1, setNew1] = useState('');
    const [curr, setCurr] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [length, setlength] = useState('');
    const [passvalid, setpassvalid] = useState('');

    useEffect(() => {
        // Retrieve the image URL from local storage when the component mounts
        const storedImg = localStorage.getItem('profileImage');

        if (storedImg) {
            setImg(storedImg);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem('uId');
                const res2 = await axios.get(`http://localhost:8081/data?username=${username}`);
                console.log('profile', res2.data);
                setNew1(res2.data[0].name);
                setAddress(res2.data[0].address);
                setPhone(res2.data[0].phone);
                setSection(res2.data[0].section);
                setState1(res2.data[0].state);
                setDistrict(res2.data[0].district);
                setCountry(res2.data[0].country);
                setEmail(res2.data[0].email);
            } catch (err) {
                console.error('Error getting data:', err);
            }
        };

        fetchData();
    }, []);
    const handleChange10 = (e: any) => {
        setData2({ ...data2, [e.target.name]: e.target.value });
        setmatch('');
        setpassvalid('');

        if (e.target.value < 6) {
            setlength('Password must be at least 6 characters long');
        } else {
            setlength('');
        }

        //setCurr(e.target.value);
    };
    console.log('password', data2.current);
    const handleChange11 = (e: any) => {
        setData2({ ...data2, [e.target.name]: e.target.value });

        setNewpass(e.target.value);
    };
    const handleChange12 = (e: any) => {
        setData2({ ...data2, [e.target.name]: e.target.value });

        setConfirm(e.target.value);
    };
    const handleChange = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        setNew1(e.target.value);
    };
    const handleChange1 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setAddress(e.target.value);
    };
    const handleChange2 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setPhone(e.target.value);
    };
    const handleChange3 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setSection(e.target.value);
    };
    const handleChange4 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setState1(e.target.value);
    };
    const handleChange5 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setDistrict(e.target.value);
    };
    const handleChange6 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setCountry(e.target.value);
    };
    const handleChange7 = (e: any) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        setEmail(e.target.value);
    };

    const handlePassCh = async (e: any) => {
        // const data1 = new FormData();
        // data1.append('current', data2.current);
        // data1.append('newpass', data2.newpass);
        // data1.append('confirm', data2.confirm);

        // console.log('data12', data1);
        e.preventDefault();

        try {
            const l1 = localStorage.getItem('uId');
            const res1 = await axios.post(`http://localhost:8081/pass?username=${l1}`, data2);

            console.log('Data uploaded successfully');
            toast(res1.data);
            console.log('data4', res1.data);
            setsucc(res1.data);
            setCurr('');
            setmatch('');
            setprofilebox(true);
            setPasssucc(true);
            setprofileinfobox(false);
            setchangepwdbox(false);
            setData2({
                current: '',
                newpass: '',
                confirm: '',
            });
        } catch (err: any) {
            console.error('Error uploading data1:', err);
            if (err.response.status === 401) {
                setCurr(err.response.data);
                setmatch('');
            }
            if (err.response.status === 402) {
                setmatch(err.response.data);
                setCurr('');
            }
            if (err.response.status === 400) {
                console.log('mega', err.response.data.errors[0].msg);
                setpassvalid(err.response.data.errors[0].msg);
            }
        }
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('section', formData.section);
        data.append('address', formData.address);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('state', formData.state);
        //data.append('image', formData.image);
        data.append('district', formData.district);
        data.append('country', formData.country);
        data.append('email', formData.email);

        try {
            const l2 = localStorage.getItem('uId');
            const res = await axios.post(`http://localhost:8081/upload?username=${l2}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Data uploaded successfully');
            toast.success('Profile Udated Successfully');
            setprofilebox(true);
            setprofileinfobox(true);
            setprofilerequestbox(false);
            // console.log('data', res.data.data[0]);
            // const s1 = res.data.data[0].phone;
            //localStorage.setItem('phone1', s1);

            // localStorage.setItem('profileImage', res.data.data[0].image);
            // localStorage.setItem('section', res.data.data[0].section);
            // localStorage.setItem('name', res.data.data[0].name);
            // localStorage.setItem('phone', res.data.data[0].phone);
            // localStorage.setItem('state', res.data.data[0].state);
            // localStorage.setItem('district', res.data.data[0].district);
            // localStorage.setItem('country', res.data.data[0].country);
            // localStorage.setItem('email', res.data.data[0].email);
            // localStorage.setItem('address', res.data.data[0].address);

            // setImg(res.data.data[0].image);
            // setName(res.data.data[0].name);

            // setSection(res.data.data[0].section);

            // setState1(res.data.data[0].state);
            // setDistrict(res.data.data[0].district);
            // setCountry(res.data.data[0].country);
            // setEmail(res.data.data[0].email);
            // setAddress(res.data.data[0].address);
            // setFormData({ ...formData, [e.target.name]: e.target.value });
        } catch (err) {
            console.error('Error uploading data:', err);
        }
    };
    // useEffect(() => {
    //     handleGetkeys();
    //     if (chpwd) {
    //         handlePwd();
    //     } else {
    //         handleProfileinfo();
    //     }
    // }, []);

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8081/data')
    //         .then((res) => {
    //             console.log('data2', res.data);
    //         })
    //         .catch((err) => {
    //             console.log('errored occured');
    //         });
    // }, []);

    //   const handleBkey = () => {
    //     localStorage.setItem('uuid', '');
    //     history.push('/users');
    //   };

    const handleProfileRequest = () => {
        setprofilebox(false);
        setprofilerequestbox(true);
    };
    const handlePwd = () => {
        setprofilebox(true);
        setprofileinfobox(false);
        setprofilerequestbox(false);
        setchangepwdbox(true);
    };

    const handleProfileinfo = () => {
        setprofilebox(true);
        setprofileinfobox(true);
        setprofilerequestbox(false);
        setchangepwdbox(false);
        setPasssucc(false);
    };

    // const handleGetkeys = () => {
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         Authorization: localStorage.token,
    //     };

    //     const postData = {
    //         uid: localStorage.usercode,
    //         table: tname,
    //         id: localStorage.uuid,
    //     };

    //     const getuurl = U_URL + 'getudetails';
    //     axios
    //         .post(getuurl, postData, { headers: headers })
    //         .then((response) => {
    //             console.log('response', response.data);
    //             if (response.status === 400) {
    //             }
    //             if (!response.data.error) {
    //                 localStorage.setItem('token', response.data.token);
    //                 const cudata = response.data.allitems;
    //                 const allusertypes = [...response.data.usertypes];

    //                 if (localStorage.uuid) {
    //                     setEditMode(true);
    //                     setEditId(cudata.id);
    //                     setItemValue(cudata.itemname);
    //                     setCuMobile(cudata.cu_mobile);
    //                     setCuEmail(cudata.cu_email);
    //                     setCuImageUrl(cudata.cu_image_url);
    //                     setShowAlert(false);
    //                     setSelectUsertype(allusertypes);
    //                 } else {
    //                     setEditMode(false);
    //                     setSelectUsertype(allusertypes);
    //                 }
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('error', error);
    //         });
    // };

    // const handleValidSubmit = (
    //     event: { preventDefault: () => void },
    //     values: { item: string; venue_name: any; cu_mobile: any; cu_email: any; venue_description: any; venue_address: any; hlatlong: any; opening_time: any; closing_time: any; timings: any }
    // ) => {
    //     event.preventDefault();
    //     console.log('values', values);
    //     let noerrors = false;
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         Authorization: localStorage.token,
    //     };
    //     let addkeyurl = U_URL + 'additemcu';
    //     let postData;

    //     if (editMode) {
    //         if (!localStorage.cu_image_url) {
    //             swal('Select Profile Picture', {
    //                 icon: 'warning',
    //             });
    //         } else {
    //             noerrors = true;
    //         }
    //     } else {
    //         if (!localStorage.venue_logo || !localStorage.cu_image_url || !localStorage.venue_building || !localStorage.venue_banner || !usertypeValue) {
    //             swal('Please fill all required fields', {
    //                 icon: 'warning',
    //             });
    //         } else {
    //             noerrors = true;
    //         }
    //     }

    //     if (noerrors) {
    //         if (editMode) {
    //             addkeyurl = U_URL + 'edititemcu';
    //             postData = {
    //                 itemid: editId,
    //                 item: values.item,
    //                 uid: localStorage.usercode,
    //                 table: tname,
    //                 venue_name: values.venue_name,
    //                 cu_mobile: values.cu_mobile,
    //                 cu_email: values.cu_email,
    //                 cu_image_url: localStorage.cu_image_url,
    //             };
    //         } else {
    //             postData = {
    //                 item: values.item,
    //                 uid: localStorage.usercode,
    //                 table: tname,
    //                 usertype: usertypeValue,
    //                 venue_name: values.venue_name,
    //                 cu_mobile: values.cu_mobile,
    //                 cu_email: values.cu_email,
    //                 venue_description: values.venue_description,
    //                 venue_address: values.venue_address,
    //                 hlatlong: values.hlatlong,
    //                 opening_time: values.opening_time,
    //                 closing_time: values.closing_time,
    //                 timings: values.timings,
    //                 cu_image_url: localStorage.cu_image_url,
    //                 venue_logo: localStorage.venue_logo,
    //                 venue_building: localStorage.venue_building,
    //                 venue_banner: localStorage.venue_banner,
    //             };
    //         }

    //         axios
    //             .post(addkeyurl, postData, { headers: headers })
    //             .then((response) => {
    //                 console.log(response.data.message);
    //                 if (response.data.error) {
    //                     setShowAlert(true);
    //                     setAlertType('warning');
    //                     setAlertText(response.data.message);
    //                 } else {
    //                     setShowAlert(false);
    //                     setAlertType('warning');
    //                     setAlertText('');
    //                     localStorage.setItem('token', response.data.token);

    //                     swal(values.item + ' ' + response.data.message, {
    //                         icon: 'success',
    //                     });
    //                     //  history.push('/users');
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log('Error is ', error);
    //                 setShowAlert(true);
    //                 setAlertType('danger');
    //                 setAlertText('Failed Try Again Later!');
    //             });
    //     }
    // };

    // const handleSelectUsertypeChange = (selectedOption: { value: SetStateAction<string> }) => {
    //     console.log('selectedOption', selectedOption);
    //     setUsertypeValue(selectedOption.value);
    // };
    const user = useSelector((state: IRootState) => state.themeConfig.user);

    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <h2 className="font-bold text-lg">Student Profile</h2>
            <div className="pt-5">
                {profilebox ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                        {profileinfobox ? (
                            <>
                                <div className="panel">
                                    <div className="flex items-center justify-between mb-1">
                                        <Tippy content="Edit Profile">
                                            <span onClick={handleProfileRequest} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 cursor-pointer rounded-full">
                                                <IconPencilPaper />
                                            </span>
                                        </Tippy>
                                    </div>
                                    <div className="mb-5">
                                        <div className="flex flex-col justify-center items-center">
                                            <img
                                                src="https://crown-school-site.s3.ap-south-1.amazonaws.com/images/small-thumb/images/C2172.jpg"
                                                alt="img"
                                                className="w-48 h-46 md:w-37 md:h-35  overflow-hidden  object-cover  mb-5"
                                            />
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
                                            <p className="font-semibold text-primary  text-xl">{new1}</p>
                                        </div>
                                        <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                            <li className="flex items-center gap-2">Class: Class 1</li>
                                            <li className="flex items-center gap-2">Section: {section}</li>

                                            <li className="flex items-center gap-2">
                                                <IconPhone />
                                                <span className="whitespace-nowrap" dir="ltr">
                                                    {phone}
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span onClick={handlePwd} className="flex gap-2">
                                                    <IconLock />
                                                    <div className=" active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1 cursor-pointer">
                                                        Change Password
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="panel lg:col-span-2 xl:col-span-3">
                                    <div className="mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">General Information</h5>
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
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>{address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>District</td>
                                                        <td>{district}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>State</td>
                                                        <td>{state1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td>{country}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
                            </>
                        ) : null}
                        {changepwdbox ? (
                            <>
                                <div className="panel">
                                    <ul className="mt-0 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                        <li className="flex items-center gap-2">
                                            <span onClick={handleProfileinfo} className="flex gap-2">
                                                <IconLock />
                                                <div className=" active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1 cursor-pointer">
                                                    Back to Profile
                                                </div>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <form className="panel space-y-6 lg:col-span-2 xl:col-span-3" onSubmit={handlePassCh}>
                                    <div className="mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Change Passsword</h5>
                                    </div>
                                    <div className="flex sm:flex-row flex-col items-center justify-between gap-x-2">
                                        <label htmlFor="Current">Current Password:</label>
                                        <input id="Current" type="password" placeholder="" name="current" onChange={handleChange10} value={data2.current} required className="form-input w-1/2 mr-8" />
                                    </div>
                                    <p className="text-red-500 sm:text-sm text-xs flex sm:justify-end justify-center items-center  mr-9">{curr}</p>
                                    <div className="flex sm:flex-row flex-col items-center justify-between gap-x-2">
                                        <label htmlFor="New">New Password:</label>
                                        <input id="New" type="password" placeholder="" name="newpass" onChange={handleChange10} value={data2.newpass} required className="form-input w-1/2 mr-8 " />
                                    </div>
                                    <p className="text-red-500 sm:text-sm text-xs flex sm:justify-end justify-center items-center  mr-9">{passvalid ? <>{passvalid}</> : <>{match}</>}</p>
                                    {/* <p className="text-red-500 sm:text-sm text-xs flex sm:justify-end justify-center items-center  mr-9">{passvalid}</p> */}

                                    <div className="flex sm:flex-row flex-col items-center justify-between gap-x-2">
                                        <label htmlFor="Confirm">Confirm New Password:</label>
                                        <input id="Confirm" type="password" placeholder="" name="confirm" onChange={handleChange10} value={data2.confirm} required className="form-input w-1/2 mr-8" />
                                    </div>
                                    <p className="text-red-500 sm:text-sm text-xs flex sm:justify-end justify-center items-center  mr-9">{match}</p>
                                    <div className=" flex sm:justify-start justify-center items-center gap-x-2 sm:col-span-2 mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Update Profile
                                        </button>
                                        <button type="button" onClick={handleProfileinfo} className="btn btn-primary">
                                            <Link to="/users/profile">Cancel</Link>
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : null}
                        {passsucc ? (
                            <>
                                <>
                                    <div className="panel">
                                        <ul className="mt-0 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                            <li className="flex items-center gap-2">
                                                <span onClick={handleProfileinfo} className="flex gap-2">
                                                    <IconLock />
                                                    <div className=" active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1 cursor-pointer">
                                                        Back to Profile
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="panel space-y-6 lg:col-span-2 xl:col-span-3 flex justify-center items-center text-base">Password Changed Successfully</div>
                                </>
                            </>
                        ) : null}
                    </div>
                ) : null}
                {profilerequestbox ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                        <div className="panel">
                            <ul className="mt-0 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <span onClick={handleProfileinfo} className="flex gap-2">
                                        <IconLock />
                                        <div className=" active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-1 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1 cursor-pointer">
                                            Back to Profile
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="panel lg:col-span-2 xl:col-span-3">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Edit Profile</h5>
                            </div>
                            <div>
                                <form className="   p-4 mb-5  " onSubmit={handleSubmit}>
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                            {/* Hidden input field */}
                                            <input type="file" name="image" id="imageInput" accept="images/*" onChange={handleChange} style={{ display: 'none' }} />

                                            {/* Clickable image */}
                                            <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
                                                <img
                                                    src="https://crown-school-site.s3.ap-south-1.amazonaws.com/images/small-thumb/images/C2172.jpg"
                                                    alt="img"
                                                    className="w-20 h-18 md:w-31 md:h-28  object-cover mx-auto"
                                                />
                                            </label>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name">Full Name</label>
                                                <input id="name" type="text" placeholder="" name="name" value={new1} onChange={handleChange} className="form-input" readOnly={false} />
                                            </div>
                                            <div>
                                                <label htmlFor="section">Section</label>
                                                <input id="section" type="text" placeholder="" name="section" value={section} onChange={handleChange3} className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="country">Country</label>
                                                <select defaultValue="India" id="country" name="country" value={country} onChange={handleChange6} className="form-select text-white-dark">
                                                    <option value="All Countries">All Countries</option>
                                                    <option value="United States">United States</option>
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="China">China</option>
                                                    <option value="Brazil">Brazil</option>
                                                    <option value="Norway">Norway</option>
                                                    <option value="Canada">Canada</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="address">Address</label>
                                                <input id="address" type="text-space" placeholder="" name="address" value={address} onChange={handleChange1} className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="district">District/City</label>
                                                <input id="district" type="text" placeholder="" name="district" value={district} onChange={handleChange5} className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="state">State</label>
                                                <input id="state" type="text" placeholder="" name="state" value={state1} onChange={handleChange4} className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="" value={email} name="email" onChange={handleChange7} className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="phone">Phone</label>
                                                <input id="phone" type="text" placeholder="" name="phoneNumber" value={phone} onChange={handleChange2} className="form-input" />
                                            </div>
                                            {/* <div>
                                                <label className="inline-flex cursor-pointer">
                                                    <input type="checkbox" className="form-checkbox" />
                                                    <span className="text-white-dark relative checked:bg-none">Make this my default address</span>
                                                </label>
                                            </div> */}
                                            <div className=" flex gap-x-2 sm:col-span-2 mt-3">
                                                <button type="submit" className="btn btn-primary">
                                                    Update Profile
                                                </button>
                                                <button type="button" onClick={handleProfileinfo} className="btn btn-primary">
                                                    <Link to="/users/profile">Cancel</Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default Profile;
