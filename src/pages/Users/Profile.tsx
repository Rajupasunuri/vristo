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
import { MY_PROFILE_URL } from '../Apps/query';
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
import { FaEnvelope, FaPhone, FaLock } from 'react-icons/fa6';

const Profile = () => {
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);

    const schoolyearID = useSelector((state: IRootState) => state.themeConfig.schoolyearID);
    const studentID = useSelector((state: IRootState) => state.themeConfig.studentID);
    //const school_address = useSelector((state: IRootState) => state.themeConfig.school_address);
    const school_phone = useSelector((state: IRootState) => state.themeConfig.school_phone);
    const school_email = useSelector((state: IRootState) => state.themeConfig.school_email);
    const classesID = useSelector((state: IRootState) => state.themeConfig.classesID);
    const sectionID = useSelector((state: IRootState) => state.themeConfig.sectionID);
    const sectionname = useSelector((state: IRootState) => state.themeConfig.sectionname);
    const classname = useSelector((state: IRootState) => state.themeConfig.classname);
    const std_name = useSelector((state: IRootState) => state.themeConfig.std_name);
    const std_email = useSelector((state: IRootState) => state.themeConfig.std_email);
    const std_phone = useSelector((state: IRootState) => state.themeConfig.std_phone);
    const std_roll = useSelector((state: IRootState) => state.themeConfig.std_roll);
    const std_photo = useSelector((state: IRootState) => state.themeConfig.std_photo);
    const std_dob = useSelector((state: IRootState) => state.themeConfig.std_dob);
    const std_regno = useSelector((state: IRootState) => state.themeConfig.std_regno);

    let name1;
    let section1;
    let phone1;
    let state2;
    let district1;
    let country1;
    let address1;
    let email1;

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
    const [change, setchange] = useState(0);

    const [fatherEmail, setfatherEmail] = useState('');
    const [fatherName, setfatherName] = useState('');
    const [fatherPhone, setfatherPhone] = useState('');
    const [fatherProfess, setfatherProfess] = useState('');
    const [fatherQuali, setfatherQuali] = useState('');
    const [guardian_email, setguardian_email] = useState('');
    const [guardian_name, setguardian_name] = useState('');
    const [guardian_phone, setguardian_phone] = useState('');
    const [guardian_profession, setguardian_profession] = useState('');
    const [guardian_qualification, setguardian_qualification] = useState('');
    const [guardian_relationship, setguardian_relationship] = useState('');
    const [identification_mark, setidentification_mark] = useState('');
    const [mother_email, setmother_email] = useState('');
    const [mother_name, setmother_name] = useState('');
    const [mother_phone, setmother_phone] = useState('');
    const [mother_profession, setmother_profession] = useState('');
    const [mother_qualification, setmother_qualification] = useState('');
    const [phonestd, setphonestd] = useState('');
    const [registerNO, setregisterNO] = useState('');
    const [roll, setroll] = useState('');
    const [secondary_phone, setsecondary_phone] = useState('');
    const [sex, setsex] = useState('');
    const [namestd, setnamestd] = useState('');
    const [dob, setdob] = useState('');
    const [doa, setdoa] = useState('');

    useEffect(() => {
        // Retrieve the image URL from local storage when the component mounts
        const storedImg = localStorage.getItem('profileImage');

        if (storedImg) {
            setImg(storedImg);
        }
        if (isLoggedinuser) {
            getProfile();
        }
    });

    const getProfile = async () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            parentID: localStorage.parentID,
        };

        axios
            .post(MY_PROFILE_URL, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('Response is ', response.data);
                // console.log(response.data.message);
                if (response.data.error) {
                    // setUsererror(response.data.message);
                } else {
                    const profiledtls = response.data.data;
                    console.log('profiledtls:', profiledtls);

                    setfatherEmail(response.data.data.father_email);
                    setfatherName(response.data.data.father_name);
                    setfatherPhone(response.data.data.father_phone);
                    setfatherProfess(response.data.data.father_profession);
                    setfatherQuali(response.data.data.father_qualification);
                    setguardian_email(response.data.data.guardian_email);
                    setguardian_name(response.data.data.guardian_name);
                    setguardian_phone(response.data.data.guardian_phone);
                    setguardian_profession(response.data.data.guardian_profession);
                    setguardian_qualification(response.data.data.guardian_qualification);
                    setguardian_relationship(response.data.data.guardian_relationship);
                    setidentification_mark(response.data.data.identification_mark);
                    setmother_email(response.data.data.mother_email);
                    setmother_name(response.data.data.mother_name);
                    setmother_phone(response.data.data.mother_phone);
                    setmother_profession(response.data.data.mother_profession);
                    setmother_qualification(response.data.data.mother_qualification);
                    setphonestd(response.data.data.phone);
                    setregisterNO(response.data.data.registerNO);
                    setroll(response.data.data.roll);
                    setsecondary_phone(response.data.data.secondary_phone);
                    setsex(response.data.data.sex);
                    setdob(response.data.data.dob);
                    setdoa(response.data.data.doa);
                    setnamestd(response.data.data.name);
                    // navigate('/dashboard');
                }
            })
            .catch((error) => {
                console.log('Error is ', error.response.data);
            });
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

            setchange(Math.random());
            console.log('Data uploaded successfully', res.data);
            toast.success('Profile Udated Successfully');
            setprofilebox(true);
            setprofileinfobox(true);
            setprofilerequestbox(false);
            // window.location.reload();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem('uId');
                const res2 = await axios.get(`http://localhost:8081/data?username=${username}`);
                const jsonData = JSON.stringify(res2.data[0]);
                console.log('fetch', jsonData);
                // dispatch1(fetchUserSuccess(jsonData));
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
    }, [change]);
    const handleChange10 = (e: any) => {
        setData2({ ...data2, [e.target.name]: e.target.value });
        setmatch('');
        setpassvalid('');
        setCurr('');

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
                                            <p className="font-semibold text-primary  text-md">{std_name}</p>
                                        </div>
                                        <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                            <li className="flex items-center gap-2">Class: {classname}</li>
                                            <li className="flex items-center gap-2">Section: {sectionname}</li>
                                            <li className="flex items-center gap-2">Section-ID: {sectionID}</li>
                                            <li className="flex items-center gap-2">Roll No: {std_roll}</li>
                                            <li className="flex items-center gap-2">Registration-ID: {std_regno}</li>

                                            <li className="flex items-center gap-2">
                                                <FaPhone />
                                                <span className="whitespace-nowrap" dir="ltr">
                                                    {std_phone}
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaEnvelope />

                                                <span className="whitespace-nowrap" dir="ltr">
                                                    {std_email}
                                                </span>
                                            </li>
                                            <li className="flex items-center  gap-2">
                                                <span onClick={handlePwd} className="flex gap-2">
                                                    <FaLock className="mt-2" />
                                                    <div className=" active:bg-gray-400 border-blue-400 border text-blue-400 sm:p-0.5 rounded-md hover:bg-blue-400 hover:text-white sm:text-xs p-1 cursor-pointer">
                                                        Change Password
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="panel lg:col-span-2 xl:col-span-3">
                                    <div className="mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Student Information</h5>
                                    </div>
                                    <div className="mb-5">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="table-hover table-striped">
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
                                                        <td style={{ width: '200px' }}>Student Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{namestd}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of Birth</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{dob}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{sex}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Admission No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Date of Admission</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{doa}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Class</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Section</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Roll No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{roll}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{phonestd}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Secondary Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{secondary_phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Aadhar No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Student Aadhar Photo</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Class of Admission</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Tongue</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nationality</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Category</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Religion</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{country1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Caste</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sub-Caste</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of Birth</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hospital Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ration Card No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Group</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Father Details</h5>
                                    </div>
                                    <div className="mb-5">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="table-hover table-striped">
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
                                                        <td style={{ width: '200px' }}>Father Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{fatherName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Profession</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{fatherProfess}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{fatherPhone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Aadhar No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Father Qualification</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{fatherQuali}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{fatherEmail}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Annual Income</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Aadhar Copy</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Mother Details</h5>
                                    </div>
                                    <div className="mb-5">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="table-hover table-striped">
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
                                                        <td style={{ width: '200px' }}>Mother Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{mother_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Profession</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{mother_profession}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{mother_phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Aadhar No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Mother Qualification</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{mother_qualification}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{mother_email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Office Address</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Aadhar Copy</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Guardian Details</h5>
                                    </div>
                                    <div className="mb-5">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="table-hover table-striped">
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
                                                        <td style={{ width: '200px' }}>Guardian Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{guardian_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Relationship</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Phone </td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{guardian_phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Aadhar No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Guardian Qualification</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{guardian_qualification}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{guardian_email}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Guardian Aadhar Copy</td>
                                                        <td style={{ width: '10px' }}>:</td>
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
