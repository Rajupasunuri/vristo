import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle,logout } from '../store/themeConfigSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const isLoggedinuser = useSelector((state: IRootState) => state.themeConfig.isLoggedinuser);

    useEffect(() => {
        
        
     
            dispatch(logout());
            navigate('/');
           // console.log('isloggedin dashboard',isLoggedinuser);
          
        },[]
    );
    dispatch(setPageTitle('Logout '));
    
   
   


   

    

    return (
        <div>
            Logout page       </div>
    );
};

export default Logout
