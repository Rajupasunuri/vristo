import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IRootState, rootReducer } from '../../store/index';
import { logout1, setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
//import { fetchUserSuccess } from '../../store/userSlice';
import Dropdown from '../../components/Dropdown';
import i18next, { use } from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import axios from 'axios';
import { MY_LOGIN_URL, MY_OTP_URL } from '../Apps/query';
//import { any } from 'prop-types';
//import { fetchUserSuccess } from '../../redux/actions/loginaction';
//import { userReducer } from '../../redux/reducers/loginreducer';
//import { FETCH_USER_SUCCESS } from '../../redux/actions/actionconstants';
import { fetchUserSuccess } from '../../store/themeConfigSlice';
import IconLock from '../../components/Icon/IconLock';
import { match } from 'assert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Center } from '@mantine/core';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);

    //const realstate = useSelector((state: IRootState) => state);
    //console.log('realstate',realstate);
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
        //console.log("realstate",state)
        console.log('isloggedin login', isLoggedinuser);

        if (isLoggedinuser) {
            navigate('/dashboard');
        }
    });
    const [responseData, setresponseData] = useState({});
    const [values1, setValues1] = useState({
        email1: '',
        password1: '',
        name1: '',
        username1: '',
        // users: localStorage.getItem('username'),
    });

    const [emails1, setEmails1] = useState('');
    const [names1, setNames1] = useState('');
    const [pass1, setPass1] = useState('');
    const [user1, setUser1] = useState('');
    const [usererror, setUsererror] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userpath, setUserpath] = useState('');
    const [passpath, setPasspath] = useState('');
    const [userf, setuserf] = useState('');

    // useEffect(()=>{
    //    console.log('check',useselector)
    // },[useselector])
    //const {auth}=useselector;
    //console.log('authtype',typeof(auth))

    //const dispatch1=useDispatch();

    const [mobilebox, setMobilebox] = useState(true);
    const [mobileerror, setMobileerror] = useState('');
    const [otpbox, setOtpbox] = useState(false);
    const [otperror, setOtperror] = useState('');
    const [minpass, setminpass] = useState('');

    // State variables for form fields and errors
    const [formData, setFormData] = useState({
        mobile: '',
        otp: '',
    });

    const handleSubmit1 = (event: any) => {
        axios
            .post('http://localhost:8081/login', values1)
            .then((res) => {
                console.log('Login Successfully', res.data.token);
                console.log('response', res);
                toast('Logged in Successfully');
                dispatch(logout1());
                navigate('/dashboard');
                setUserPass('');
                localStorage.setItem('uId', user1);
                const ls = localStorage.getItem('uId');
                axios
                    .get(`http://localhost:8081/getuser?username=${ls}`)
                    .then((res) => {
                        console.log('result', res.data[0]);

                        localStorage.setItem('section', res.data[0].section);
                        localStorage.setItem('name', res.data[0].name);
                        localStorage.setItem('phone', res.data[0].phone);
                        localStorage.setItem('state', res.data[0].state);
                        localStorage.setItem('district', res.data[0].district);
                        localStorage.setItem('country', res.data[0].country);
                        localStorage.setItem('email', res.data[0].email);
                        localStorage.setItem('address', res.data[0].address);
                    })
                    .catch((err) => console.log('errors', err));
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    setUserPass(err.response.data);
                }
                if (err.response.status == 404) {
                    setuserf(err.response.data);
                }
                if (err.response.status == 400) {
                    setminpass(err.response.data.errors[0].msg);
                }
                //toast.error("Username or Password doesn't match");
                console.log('superr', err.response.status);
                if (err.response && err.response.data) {
                    console.log('hi error');
                    const { errors } = err.response.data;
                    console.log(errors);
                    console.log('length', errors.length);
                    console.log('error1', err.response.data.errors[0].msg);
                    console.log(errors[0].path);
                    errors.forEach((error: any) => {
                        switch (error.path) {
                            case 'password':
                                setPasspath(error.msg);
                                break;
                            case 'username':
                                setUserpath(error.msg);
                                break;
                            default:
                                break;
                        }
                    });
                } else {
                    console.log('Unexpected error occurred:', err);
                }

                console.log('failed', err);
            });
        event.preventDefault();
    };

    // Event handler for form field changes
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        console.log(name, value);
        // Update the form data with the new value
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the corresponding error when the user starts typing
        setMobileerror('');
        setOtperror('');
    };

    // Form submission handler
    const submitForm = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // Validate the form data

        const mobile = formData.mobile.trim();
        const otp = formData.otp.trim();

        if (!mobile && !otp) {
            setMobileerror('Mobile is required');
            setOtperror('OTP is required');
        } else if (mobile && !otp) {
            if (mobile) {
                if (!isNaN(parseInt(mobile)) && mobile.length == 10) {
                    console.log('Submit Mobile');
                    const headers = {
                        'Content-Type': 'application/json',
                    };
                    const postData = {
                        mobile: mobile,
                        showtab: 'u',
                    };
                    const loginurl = MY_LOGIN_URL;
                    axios
                        .post(loginurl, postData, {
                            headers: headers,
                        })
                        .then((response) => {
                            console.log('Response is ', response.data);
                            console.log(response.data.message);
                            if (response.data.error) {
                                setMobileerror(response.data.message);
                            } else {
                                localStorage.setItem('showtab', response.data.showtab);
                                setMobilebox(false);
                                setOtpbox(true);
                            }
                        })
                        .catch((error) => {
                            console.log('Error is ', error);
                            setMobileerror(error);
                        });
                } else {
                    setMobileerror('Enter Valid Mobile 10 Digits');
                }
            }
        } else if (mobile && otp) {
            if (otp) {
                if (!isNaN(parseInt(otp)) && otp.length == 6) {
                    // If there are no errors, proceed with form submission

                    if (mobileerror == '' && otperror == '') {
                        // Perform form submission logic here
                        const headers = {
                            'Content-Type': 'application/json',
                        };
                        const postData = {
                            otp: otp,
                            mobile: mobile,
                            showtab: localStorage.showtab,
                        };
                        const loginurl = MY_OTP_URL;
                        axios
                            .post(loginurl, postData, {
                                headers: headers,
                            })
                            .then((response) => {
                                console.log('Response is ', response.data);
                                console.log(response.data.message);

                                if (response.data.error) {
                                    setOtperror(response.data.message);
                                    const userdetails = response.data.data;
                                    //setresponseData(userdetails);
                                    // const nes=dispatch(fetchUserSuccess(userdetails));
                                    //console.log('newsea',useselector);
                                    //console.log('nes',nes)
                                } else {
                                    const userdetails = response.data.data;
                                    // console.log('userdetails:', userdetails);
                                    // console.log('Form submitted:', formData);
                                    //setresponseData(userdetails);
                                    //const nes=dispatch(fetchUserSuccess(userdetails));

                                    //const news='/auth/fetchUserSuccess';
                                    console.log('heloooo', userdetails);

                                    console.log('logger', isLoggedinuser);
                                    dispatch(fetchUserSuccess(userdetails));

                                    //console.log('gtr',ser);
                                    //console.log('store data',useselector);
                                    //    localStorage.setItem("id", userdetails.id);//0
                                    //     localStorage.setItem("aid", userdetails.aid);//0
                                    //     localStorage.setItem("mobile", userdetails.mobile);//0
                                    //     localStorage.setItem("email", userdetails.email);//string
                                    //     localStorage.setItem("name", userdetails.name);//string
                                    //     localStorage.setItem("role", userdetails.role);//string
                                    //     localStorage.setItem("profile_completed", userdetails.profile_completed);//0
                                    //     localStorage.setItem("blocked", userdetails.blocked);//0
                                    //     localStorage.setItem("image_url", userdetails.image_url);//string
                                    //     localStorage.setItem("mypin", userdetails.image);
                                    //     localStorage.setItem("createdon", userdetails.createdon);//string
                                    //     localStorage.setItem("updated", userdetails.updated);//string
                                    //     localStorage.setItem("upanel", response.data.upanel);//string
                                    //     localStorage.setItem("usercode", response.data.usercode);//str
                                    //     localStorage.setItem("token", response.data.token);//str
                                    //     localStorage.setItem("isLoggedin",'yes');
                                    //     localStorage.setItem('userData', JSON.stringify(response.data.data));

                                    //dispatch(fetchUserSuccess(userdetails));

                                    //console.log(useselector.user)
                                    navigate('/dashboard');
                                    // let avatar = `${process.env.PUBLIC_URL}/img/fake_avatar.png`;
                                    // if (userdetails.image_url == '') {
                                    //     avatar = userdetails.image_url;
                                    // }

                                    // login({
                                    //     fullName: userdetails.name,
                                    //     avatar: avatar,
                                    //     mobile: userdetails.mobile,
                                    //     email: userdetails.email,
                                    //     userrole: userdetails.role,
                                    //     usercode: response.data.usercode,
                                    //     upanel: response.data.upanel,
                                    //     token: response.data.token
                                    // });
                                }
                            })
                            .catch((error) => {
                                console.log('Error is ', error);
                                setOtperror(error);
                            });
                    }
                } else {
                    setOtperror('OTP  6 Digits');
                }
            }
        }
    };

    const handleChange8 = (event: any) => {
        setValues1({ ...values1, [event.target.name]: [event.target.value] });
        //setEmails("");
        //setNames("");
        setPass1('');
        setUserPass('');
        setPasspath('');
        setminpass('');
        setuserf('');
    };
    const handleChange7 = (event: any) => {
        setValues1({ ...values1, [event.target.name]: [event.target.value] });
        //setEmails("");
        //setNames("");
        const userinput = event.target.value;
        setUsererror(userinput);
        if (userinput.includes(' ')) {
            setUsererror('Username should not contain spaces');
        } else {
            setUsererror('');
        }
        setUserPass('');
        setUser1(event.target.value);
        setUserpath('');
        setuserf('');
        setminpass('');
    };
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your Username and Password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit1}>
                                {mobilebox ? (
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="username"
                                                type="text"
                                                placeholder="Enter Username"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                                name="username"
                                                required
                                                // value={formData.mobile}
                                                onChange={handleChange7}
                                                pattern="\S+$"
                                            />
                                            <p className="text-red-500">{userf}</p>

                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconMail fill={true} />
                                            </span>
                                        </div>
                                        {usererror && <span className="text-red-500">{usererror}</span>}

                                        <label htmlFor="Password">Password</label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Password"
                                                type="password"
                                                placeholder="Enter Password"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                                name="password"
                                                // value={formData.mobile}
                                                onChange={handleChange8}
                                                required
                                            />
                                            {/* <p>{passpath}</p> */}
                                            <p className="text-red-500">{userPass ? <>{userPass}</> : <>{minpass}</>}</p>

                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLock fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                {otpbox ? (
                                    <div>
                                        <label htmlFor="Otp">
                                            Otp <span style={{ color: 'green' }}>(Enter OTP Sent to Mobile)</span> <span style={{ color: 'red', float: 'right' }}>{otperror}</span>
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Otp"
                                                type="number"
                                                placeholder="Enter OTP"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                                name="otp"
                                                value={formData.otp}
                                                onChange={handleInputChange}
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLockDots fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/boxed-signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default LoginBoxed;
