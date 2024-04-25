import axios from 'axios';
import { MY_DASHBOARD_URL } from './query';
import { useEffect } from 'react';

const Child = () => {
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
    return (
        <div>
            <div className="pb-5 text-lg text-black font-bold">MI Of Your Child</div>
            <div className="panel h-18">
                <h2 className="text-base">NOTE: Date expired, Please contact to admin for the details.</h2>
            </div>
        </div>
    );
};

export default Child;
