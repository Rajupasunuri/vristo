import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { setPageTitle, setUpdateDtls } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
//import CropImg from '../Pages/cropimg';
//import CropImgUpload from '../Pages/cropimg';
import axios from 'axios';
//import {u=U_URL}
import { MY_PROFILE_URL, MY_PROFILE_EDIT_URL, AWS_S3_IMG } from '../query';
//import UploadAvtar from './UploadAvtar';
import IconLock from '../../components/Icon/IconLock';
import Tippy from '@tippyjs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaPhone, FaLock, FaUserTie } from 'react-icons/fa6';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);

    const studentdtls = useSelector((state: IRootState) => state.themeConfig);
    const studentdtls1 = useSelector((state: IRootState) => state.themeConfig.std_email);

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

    const [profile, setProfile] = useState({
        name: '',
        sex: '',
        phone: '',
        registerNO: '',
        doa: '',
        roll: '',
        mother_email: '',
        mother_name: '',
        mother_phone: '',
        mother_profession: '',
        mother_qualification: '',
        father_email: '',
        father_name: '',
        father_phone: '',
        father_profession: '',
        father_qualification: '',
        guardian_email: '',
        guardian_name: '',
        guardian_phone: '',
        guardian_profession: '',
        guardian_qualification: '',
        guardian_relationship: '',
        secondary_phone: '',
        dob: '',
        state: '',
        country: '',
        district: '',
        bloodgroup: '',
        address: '',
    });
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
    const [pEditErr, setPEditErr] = useState('');
    const [changedph, setchangedph] = useState('');
    const [changedem, setchangedem] = useState('');
    const [changedstate, setchangedstate] = useState('');
    const [changeddist, setchangeddist] = useState('');
    const [changedadd, setchangedadd] = useState('');
    const [addresserr, setAddressErr] = useState('');
    const [stateerr, setStateErr] = useState('');
    const [emailerr, setEmailErr] = useState('');
    const [phoneerr, setPhoneErr] = useState('');
    const [disterr, setDistErr] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Student Profile'));
        // Retrieve the image URL from local storage when the component mounts
        const storedImg = localStorage.getItem('profileImage');

        if (storedImg) {
            setImg(storedImg);
        }
        if (isLoggedinuser) {
        } else {
            navigate('/');
            console.log('isloggedin Profile', isLoggedinuser);
        }
        // getProfile();
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
                    parentID: localStorage.parentID,
                };
                const response = await axios.post(MY_PROFILE_URL, postData, {
                    headers: headers,
                });
                if (response.data.error) {
                    // setUsererror(response.data.message);
                } else {
                    const profiledtls = response.data.data;
                    console.log('profiledtls:', profiledtls);

                    localStorage.setItem('father', profiledtls.father_name);
                    localStorage.setItem('mother', profiledtls.mother_name);

                    setFormData({ ...formData, district: profiledtls.district, phoneNumber: profiledtls.phone, state: profiledtls.state, address: profiledtls.address, email: profiledtls.email });

                    setchangedph(profiledtls.phone);
                    setchangedem(profiledtls.email);
                    setchangedadd(profiledtls.address);
                    setchangeddist(profiledtls.district);
                    setchangedstate(profiledtls.state);

                    dispatch(setUpdateDtls(profiledtls));

                    setProfile(profiledtls);

                    // navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();

        return () => {
            // Cancel the API request using Axios cancel token mechanism
            // This prevents the component from updating state after unmounting
            // This is optional but recommended to prevent memory leaks and avoid unnecessary network requests
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            console.log('Canceling request: Component unmounted');
            source.cancel('Component unmounted');
        };
    }, [profilebox, profileinfobox]);
    console.log('profiledtls profile:', profile);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            name: formData.name,
            section: formData.section,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            state: formData.state,
            district: formData.district,
            country: formData.country,
            email: formData.email,
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            // parentID: localStorage.parentID,
        };
        const loginurl = MY_PROFILE_EDIT_URL;
        axios
            .post(loginurl, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('Response is----- ', response.data.message);
                if (!response.data.error) {
                    toast.success('Profile Edited Successfully');
                    handleProfileinfo();
                }
                if (response.data.error) {
                    var errors = response.data.message;
                    errors.forEach((error: any) => {
                        switch (error.path) {
                            case 'address':
                                setAddressErr(error.msg);
                                break;
                            case 'state':
                                setStateErr(error.msg);
                                break;
                            case 'district':
                                setDistErr(error.msg);
                                break;
                            case 'email':
                                setEmailErr(error.msg);
                                break;
                            case 'phoneNumber':
                                setPhoneErr(error.msg);
                                break;
                            default:
                                break;
                        }
                    });
                }
            })
            .catch((error) => {
                console.log('Error is ', error.response.data);
                if (error.data.error) {
                    setPEditErr(error.data.message);
                }
            });
    };

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

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        //if (e.target.name === 'phone') setchangedph('');
        if (e.target.name === 'email') {
            setchangedem('');
            setEmailErr('');
        }
        if (e.target.name === 'phoneNumber') {
            setchangedph('');
            setPhoneErr('');
        }
        if (e.target.name === 'address') {
            setchangedadd('');
            setAddressErr('');
        }
        if (e.target.name === 'state') {
            setchangedstate('');
            setStateErr('');
        }
        if (e.target.name === 'district') {
            setchangeddist('');
            setDistErr('');
        }
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
            // toast(res1.data);
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

    return (
        <div>
            <h2 className="font-bold text-lg">Student Profile</h2>
            <div className="pt-5">
                {profilebox ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                        {profileinfobox ? (
                            <>
                                <div className="panel">
                                    {/* <div className="flex items-center justify-between mb-1">
                                        <Tippy content="Edit Profile">
                                            <span onClick={handleProfileRequest} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 cursor-pointer rounded-full">
                                                <IconPencilPaper />
                                            </span>
                                        </Tippy>
                                    </div> */}
                                    <div className="mb-5">
                                        <div className="flex flex-col justify-center items-center">
                                            {/* <img
                                                src="https://crown-school-site.s3.ap-south-1.amazonaws.com/images/small-thumb/images/C2172.jpg"
                                                alt="img"
                                                className="w-48 h-46 md:w-37 md:h-35  overflow-hidden  object-cover  mb-5"
                                            /> */}
                                            {localStorage.std_photo != 'null' || localStorage.std_photo != null || localStorage.std_photo != '' ? (
                                                <img className="w-48 h-46 md:w-37 md:h-35  overflow-hidden  object-cover  mb-5" src={AWS_S3_IMG + localStorage.std_photo} alt="pic" />
                                            ) : (
                                                <FaUserTie className="w-16 h-16   overflow-hidden  object-cover  mb-5 text-blue-400 " />
                                            )}

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
                                            <p className="font-semibold text-primary  text-md">{studentdtls.std_name}</p>
                                        </div>
                                        <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                            <li className="flex items-center gap-2">Class: {studentdtls.classname}</li>
                                            <li className="flex items-center gap-2">Section: {studentdtls.sectionname}</li>
                                            <li className="flex items-center gap-2">Section-ID: {studentdtls.sectionID}</li>
                                            <li className="flex items-center gap-2">Roll No: {studentdtls.std_roll}</li>
                                            <li className="flex items-center gap-2">Registration-ID: {studentdtls.std_regno}</li>

                                            <li className="flex items-center gap-2">
                                                <FaPhone />
                                                <span className="whitespace-nowrap" dir="ltr">
                                                    {studentdtls.std_phone}
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaEnvelope />

                                                <span className="md:whitespace-nowrap whitespace-wrap" dir="ltr">
                                                    {studentdtls.std_email}
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
                                                        <td>{profile.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of Birth</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.dob}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.sex}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Admission No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.registerNO}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Date of Admission</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.doa}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Class</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{localStorage.classname}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Section</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{localStorage.sectionname}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Roll No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.roll}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Secondary Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.secondary_phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Group</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.bloodgroup}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>District</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.district}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>State</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.country}</td>
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
                                                    <tr></tr>
                                                </thead>
                                                <tbody className="dark:text-white-dark border-1.5">
                                                    <tr>
                                                        <td style={{ width: '200px' }}>Father Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.father_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Profession</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.father_profession}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.father_phone}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Father Qualification</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.father_qualification}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.father_email}</td>
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
                                                    <tr></tr>
                                                </thead>
                                                <tbody className="dark:text-white-dark border-1.5">
                                                    <tr>
                                                        <td style={{ width: '200px' }}>Mother Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.mother_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Profession</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.mother_profession}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Phone No</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.mother_phone}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Mother Qualification</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.mother_qualification}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.mother_email}</td>
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
                                                    <tr></tr>
                                                </thead>
                                                <tbody className="dark:text-white-dark border-1.5">
                                                    <tr>
                                                        <td style={{ width: '200px' }}>Guardian Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.guardian_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Relationship</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.guardian_relationship}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Phone </td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.guardian_phone}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Guardian Qualification</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.guardian_qualification}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{profile.guardian_email}</td>
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
                            <div className="mb-5 flex space-x-20">
                                <h5 className="font-semibold text-lg dark:text-white-light">Edit Profile</h5>
                                <p className="font-semibold text-lg dark:text-white-light text-red-500">{pEditErr}</p>
                            </div>
                            <div>
                                <form className="   p-4 mb-5  " onSubmit={handleSubmit}>
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                            {/* Hidden input field */}
                                            {/* <input type="file" name="image" id="imageInput" accept="images/*" onChange={handleChange} style={{ display: 'none' }} /> */}

                                            {/* Clickable image */}
                                            {/* <label htmlFor="imageInput" style={{ cursor: 'pointer' }}> */}
                                            {/* <img
                                                src="https://crown-school-site.s3.ap-south-1.amazonaws.com/images/small-thumb/images/C2172.jpg"
                                                alt="img"
                                                className="w-20 h-18 md:w-31 md:h-28  object-cover mx-auto"
                                            /> */}
                                            {localStorage.std_photo != 'null' || localStorage.std_photo != null || localStorage.std_photo != '' ? (
                                                <img className="w-48 h-46 md:w-37 md:h-35  overflow-hidden  object-cover  mb-5" src={AWS_S3_IMG + localStorage.std_photo} alt="pic" />
                                            ) : (
                                                <FaUserTie className="w-16 h-16   overflow-hidden  object-cover  mb-5 text-blue-400 " />
                                            )}
                                            {/* </label> */}
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="country">Country</label>
                                                <select defaultValue="India" id="country" name="country" value={formData.country} onChange={handleChange} className="form-select text-white-dark">
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
                                                <input
                                                    id="address"
                                                    type="text-space"
                                                    placeholder=""
                                                    name="address"
                                                    value={formData.address || changedadd}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                />
                                                {addresserr && <span className="text-red-500">{addresserr}</span>}
                                            </div>

                                            <div>
                                                <label htmlFor="district">District/City</label>
                                                <input
                                                    id="district"
                                                    type="text"
                                                    placeholder=""
                                                    name="district"
                                                    value={formData.district || changeddist}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    required
                                                />
                                                {disterr && <span className="text-red-500">{disterr}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="state">State</label>
                                                <input
                                                    id="state"
                                                    type="text"
                                                    placeholder=""
                                                    name="state"
                                                    value={formData.state || changedstate}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    required
                                                />
                                                {stateerr && <span className="text-red-500">{stateerr}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    placeholder=""
                                                    required
                                                    value={formData.email || changedem}
                                                    name="email"
                                                    onChange={handleChange}
                                                    className="form-input"
                                                />
                                                {emailerr && <span className="text-red-500">{emailerr}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="phone">Phone</label>
                                                <input
                                                    id="phone"
                                                    required
                                                    type="text"
                                                    placeholder=""
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber || changedph}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                />
                                                {phoneerr && <span className="text-red-500">{phoneerr}</span>}
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
