import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark, toggleIsLoggedin, toggleIsschoolID, toggleIsschool_name, toggleIsschool_logo, toggleStudentLoginDtls } from './store/themeConfigSlice';
import store from './store';
import { Navigate } from 'react-router';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));


    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    useEffect(() => {
        dispatch(toggleIsLoggedin(localStorage.getItem('isLoggedinuser') || themeConfig.isLoggedinuser));
    }, [dispatch, themeConfig.isLoggedinuser]);
    useEffect(() => {
        dispatch(toggleIsschoolID(localStorage.getItem('schoolID') || themeConfig.schoolID));
        dispatch(toggleIsschool_name(localStorage.getItem('school_name') || themeConfig.school_name));
        dispatch(toggleIsschool_logo(localStorage.getItem('school_logo') || themeConfig.school_logo));
    }, [dispatch, themeConfig.schoolID, themeConfig.school_name, themeConfig.school_logo]);
    useEffect(() => {
        dispatch(toggleStudentLoginDtls({
            schoolyearID: localStorage.getItem('schoolyearID') || themeConfig.schoolyearID,
            studentID: localStorage.getItem('studentID') || themeConfig.studentID,
            parentID: localStorage.getItem('parentID') || themeConfig.parentID,
            package_type: localStorage.getItem('package_type') || themeConfig.package_type,
            std_leave_apply: localStorage.getItem('std_leave_apply') || themeConfig.std_leave_apply,
            receipt_logo: localStorage.getItem('receipt_logo') || themeConfig.receipt_logo,
            school_appname: localStorage.getItem('school_appname') || themeConfig.school_appname,
            school_phone: localStorage.getItem('school_phone') || themeConfig.school_phone,
            school_addphone: localStorage.getItem('school_addphone') || themeConfig.school_addphone,
            school_email: localStorage.getItem('school_email') || themeConfig.school_email,
            invoice_type: localStorage.getItem('invoice_type') || themeConfig.invoice_type,
            classesID: localStorage.getItem('classesID') || themeConfig.classesID,
            sectionID: localStorage.getItem('sectionID') || themeConfig.sectionID,
            classname: localStorage.getItem('classname') || themeConfig.classname,
            sectionname: localStorage.getItem('sectionname') || themeConfig.sectionname,
            user_type: localStorage.getItem('user_type') || themeConfig.user_type,
            std_name: localStorage.getItem('std_name') || themeConfig.std_name,
            std_email: localStorage.getItem('std_email') || themeConfig.std_email,
            std_phone: localStorage.getItem('std_phone') || themeConfig.std_phone,
            std_roll: localStorage.getItem('std_roll') || themeConfig.std_roll,
            std_photo: localStorage.getItem('std_photo') || themeConfig.std_photo,
            std_dob: localStorage.getItem('std_dob') || themeConfig.std_dob,
            std_regno: localStorage.getItem('std_regno') || themeConfig.std_regno
        }));
    }, [dispatch, themeConfig.schoolyearID, themeConfig.studentID, themeConfig.parentID, themeConfig.package_type, themeConfig.std_leave_apply, themeConfig.receipt_logo, themeConfig.school_appname, themeConfig.school_phone, themeConfig.school_addphone, themeConfig.school_email, themeConfig.invoice_type, themeConfig.classesID, themeConfig.sectionID, themeConfig.classname, themeConfig.sectionname, themeConfig.user_type, themeConfig.std_name, themeConfig.std_email, themeConfig.std_phone, themeConfig.std_roll, themeConfig.std_photo, themeConfig.std_dob, themeConfig.std_regno]);


    return (
        <div
            className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass
                } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
