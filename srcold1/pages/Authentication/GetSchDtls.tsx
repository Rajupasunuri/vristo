import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';

import axios from 'axios';
import { setSchoolDtls } from '../../store/themeConfigSlice';

const GetSchDtls = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(setPageTitle('School Details'));
        //console.log("realstate",state)


        if (localStorage.schoolID && localStorage.school_name) {
            navigate('/login');
        } else {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: localStorage.token,
            };
            axios
                .post('https://stdapi.crownelearn.com/', { schoolID: localStorage.schoolID }, {
                    headers: headers,
                })
                .then((res) => {
                    // console.log('response', res.data.data);
                    var schdtls = res.data.data[0];
                    console.log('school_logo', schdtls['schoolID']);
                    // const jsonData = JSON.stringify(schdtls);
                    dispatch(setSchoolDtls(schdtls));
                    navigate('/login');



                })
                .catch((err) => {
                    console.log('failed', err);
                });
        }
    }, []);

    return (
        <div>
            School Details
        </div>
    );

};

export default GetSchDtls;
