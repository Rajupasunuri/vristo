import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IRootState } from '../../store/index';
import { setPageTitle, setStudentLoginDtls } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';

import axios from 'axios';
import { MY_LOGIN_URL } from '../Apps/query';
import IconLock from '../../components/Icon/IconLock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);
    const schoolID = useSelector((state: IRootState) => state.themeConfig.schoolID);
    const school_name = useSelector((state: IRootState) => state.themeConfig.school_name);
    const school_logo = useSelector((state: IRootState) => state.themeConfig.school_logo);

    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
        //console.log("realstate",state)
        console.log('isloggedin login', isLoggedinuser);

        if (localStorage.schoolID == '') {
            console.log('schoolID on login page no', schoolID);
            navigate('/');
        } else {
            console.log('schoolID on login page yes', schoolID);
            // navigate('/');
        }
        if (isLoggedinuser) {
            navigate('/dashboard');
        }
    });

    const [usererror, setUsererror] = useState('');
    const [passerror, setPasserror] = useState('');

    // State variables for form fields and errors
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    // Event handler for form field changes
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        console.log(name, value);
        // Update the form data with the new value
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the corresponding error when the user starts typing
        setUsererror('');
        setPasserror('');
    };

    // Form submission handler
    const submitForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Validate the form data
        const username = formData.username.trim();
        const password = formData.password.trim();

        if (!username && !password) {
            setUsererror('username is required');
            setPasserror('password is required');
        } else if (username && !password) {
            setPasserror('password is required');
        } else if (!username && password) {
            setUsererror('username is required');
        } else if (username && password) {

            if (username.length < 2) {
                setUsererror('username is Invalid');
            } else if (password.length < 5) {
                setPasserror('Password Length Invalid');
            }
            console.log('Submit username');
            // If there are no errors, proceed with form submission

            if (usererror == '' && passerror == '') {
                // Perform form submission logic here
                const headers = {
                    'Content-Type': 'application/json',
                };
                const postData = {
                    password: password,
                    username: username,
                    schoolID: localStorage.schoolID,
                };
                const loginurl = MY_LOGIN_URL;
                axios
                    .post(loginurl, postData, {
                        headers: headers,
                    })
                    .then((response) => {
                        console.log('Response is ', response.data);
                        // console.log(response.data.message);
                        if (response.data.error) {
                            setUsererror(response.data.message);
                        } else {
                            const studentdtls = response.data.data;
                            console.log('studentdtls:', studentdtls);
                            // console.log('Form submitted:', formData); 



                            // localStorage.setItem("token", response.data.token);
                            dispatch(setStudentLoginDtls(studentdtls));
                            // navigate('/dashboard');

                        }
                    })
                    .catch((error) => {
                        console.log('Error is ', error);
                        setPasserror(error);
                    });



            }

        }


    }







    return (
        <div>
            <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[700px] py-20">
                <div className="mx-auto w-full max-w-[440px]">
                    <div className="mb-5">
                        <img src={localStorage.school_logo} className="mx-auto w-12 sm:w-16 md:w-24 lg:w-32 xl:w-40" alt="Image Description" />


                        <p className="text-base font-bold leading-normal text-white-dark">{school_name}</p>
                    </div>
                    <form className="space-y-5 dark:text-white" onSubmit={submitForm}>

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
                                    // value={formData.username}
                                    onChange={handleInputChange}
                                    pattern="\S+$"
                                />


                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconMail fill={true} />
                                </span>
                            </div>
                            {usererror && <span className="text-red-500">{usererror}</span>}

                            <label htmlFor="password">Password</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                    name="password"
                                    // value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                                {passerror && <span className="text-red-500">{passerror}</span>}

                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLock fill={true} />
                                </span>
                            </div>
                        </div>



                        <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                            Sign in
                        </button>
                    </form>



                </div>
            </div>


            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default LoginBoxed;
