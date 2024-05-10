import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import themeConfig from '../theme.config';
import { persistor } from '.';

interface Language {
    code: string;
    name: string;
}

interface ThemeConfigState {
    isDarkMode: boolean;
    mainLayout: string;
    theme: string;
    menu: string;
    layout: string;
    rtlClass: string;
    animation: string;
    navbar: string;
    locale: string;
    sidebar: boolean;
    pageTitle: string;
    languageList: Language[];
    semidark: boolean;
    isLoggedinuser: boolean;
    schoolID: string;
    school_name: string;
    school_logo: string;
    schdtls: string;
    schoolyearID: string;
    studentID: string;
    parentID: string;
    package_type: string;
    std_leave_apply: string;
    receipt_logo: string;
    school_appname: string;
    school_phone: string;
    school_addphone: string;
    school_email: string;
    invoice_type: string;
    classesID: string;
    sectionID: string;
    classname: string;
    sectionname: string;
    user_type: string;
    std_name: string;
    std_email: string;
    std_phone: string;
    std_roll: string;
    std_photo: string;
    std_dob: string;
    std_regno: string;
}
//co
const defaultState: ThemeConfigState = {
    isDarkMode: false,
    mainLayout: 'app',
    theme: 'light',
    menu: 'vertical',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    sidebar: false,
    pageTitle: '',
    languageList: [{ code: 'en', name: 'English' }],
    semidark: false,
    //user: null,
    isLoggedinuser: false,

    schoolID: '',
    school_name: '',
    school_logo: '',
    schdtls: '',
    schoolyearID: '',
    studentID: '',
    parentID: '',
    package_type: '',
    std_leave_apply: '',
    receipt_logo: '',
    school_appname: '',
    school_phone: '',
    school_addphone: '',
    school_email: '',
    invoice_type: '',
    classesID: '',
    sectionID: '',
    classname: '',
    sectionname: '',
    user_type: '',
    std_name: '',
    std_email: '',
    std_phone: '',
    std_roll: '',
    std_photo: '',
    std_dob: '',
    std_regno: '',
};

const initialState: ThemeConfigState = {
    ...defaultState,

    schoolID: localStorage.getItem('schoolID') || themeConfig.schoolID,
    school_name: localStorage.getItem('school_name') || themeConfig.school_name,
    school_logo: localStorage.getItem('school_logo') || themeConfig.school_logo,
    schdtls: localStorage.getItem('school_logo') || themeConfig.schdtls,
    theme: localStorage.getItem('theme') || themeConfig.theme,
    menu: localStorage.getItem('menu') || themeConfig.menu,
    layout: localStorage.getItem('layout') || themeConfig.layout,
    rtlClass: localStorage.getItem('rtlClass') || themeConfig.rtlClass,
    animation: localStorage.getItem('animation') || themeConfig.animation,
    navbar: localStorage.getItem('navbar') || themeConfig.navbar,
    locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
    isDarkMode: false,
    sidebar: localStorage.getItem('sidebar') === 'true' || defaultState.sidebar,
    semidark: localStorage.getItem('semidark') === 'true' || themeConfig.semidark,
    isLoggedinuser: localStorage.getItem('isLoggedinuser') === 'true' || themeConfig.isLoggedinuser,
    schoolyearID: localStorage.getItem('schoolyearID') || themeConfig.schoolyearID,
    studentID: localStorage.getItem('studentID') || themeConfig.studentID,
    parentID: localStorage.getItem('parentID') || themeConfig.parentID,
    package_type: localStorage.getItem('package_type') || themeConfig.package_type,
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
    std_regno: localStorage.getItem('std_regno') || themeConfig.std_regno,
};

const themeConfigSlice = createSlice({
    name: 'auth',

    initialState,
    reducers: {
        toggleTheme(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.theme; // light | dark | system
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
            } else if (payload === 'dark') {
                state.isDarkMode = true;
            } else if (payload === 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    state.isDarkMode = true;
                } else {
                    state.isDarkMode = false;
                }
            }

            if (state.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
            state.sidebar = false; // reset sidebar state
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggleLayout(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRTL(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }: PayloadAction<boolean | string | undefined>) {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload.toString());
            state.semidark = payload;
        },
        // toggleIsLoggedin(state, { payload }: PayloadAction<boolean | string | undefined>) {
        //   payload = payload === true || payload === 'true' ? true : false;
        //   localStorage.setItem('isLoggedinuser', payload.toString());
        //   localStorage.setItem('user', "");
        //   state.isLoggedinuser = false;
        // },

        toggleIsLoggedin(state, { payload }: PayloadAction<boolean | string | undefined | any>) {
            let isLogged = false;
            let isLoggedloc = 'false';
            if (localStorage.isLoggedinuser == 'true') {
                isLogged = true;
                isLoggedloc = 'true';
            }

            payload = payload || isLogged;
            localStorage.setItem('isLoggedinuser', isLoggedloc);
            state.isLoggedinuser = isLogged;
            // return state;
        },

        toggleLocale(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.locale;
            i18next.changeLanguage(payload);
            state.locale = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
        setPageTitle(state, { payload }: PayloadAction<string>) {
            document.title = `${payload} | Crownelearn.com`;
        },
        toggleIsschoolID(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.schoolID; // full, boxed-schoolID
            localStorage.setItem('schoolID', payload);
            state.schoolID = payload;
        },
        toggleIsschool_name(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.school_name; // full, boxed-school_name
            localStorage.setItem('school_name', payload);
            state.school_name = payload;
        },
        toggleIsschool_logo(state, { payload }: PayloadAction<string | undefined>) {
            payload = payload || state.school_logo; // full, boxed-school_logo
            localStorage.setItem('school_logo', payload);
            state.school_logo = payload;
        },
        toggleStudentLoginDtls(state, { payload }: PayloadAction<string | undefined | any>) {
            let studentdtls = payload;
            console.log('toggleStudentLoginDtls schoolyearID', payload.schoolyearID);
            console.log('toggleStudentLoginDtls payload', payload);
            console.log('toggleStudentLoginDtls state', state);

            localStorage.setItem('schoolyearID', studentdtls.schoolyearID);
            localStorage.setItem('studentID', studentdtls.studentID);
            localStorage.setItem('parentID', studentdtls.parentID);
            localStorage.setItem('package_type', studentdtls.package_type);
            localStorage.setItem('school_appname', studentdtls.school_appname);
            localStorage.setItem('school_phone', studentdtls.school_phone);
            localStorage.setItem('school_addphone', studentdtls.school_addphone);
            localStorage.setItem('school_email', studentdtls.school_email);
            localStorage.setItem('invoice_type', studentdtls.invoice_type);
            localStorage.setItem('classesID', studentdtls.classesID);
            localStorage.setItem('sectionID', studentdtls.sectionID);
            localStorage.setItem('classname', studentdtls.classname);
            localStorage.setItem('sectionname', studentdtls.sectionname);
            localStorage.setItem('user_type', studentdtls.user_type);
            localStorage.setItem('std_name', studentdtls.std_name);
            // localStorage.setItem('std_email', studentdtls.std_email);
            localStorage.setItem('std_phone', studentdtls.std_phone);
            localStorage.setItem('std_roll', studentdtls.std_roll);
            localStorage.setItem('std_photo', studentdtls.std_photo);
            localStorage.setItem('std_dob', studentdtls.std_dob);
            localStorage.setItem('std_regno', studentdtls.std_regno);

            state.schoolyearID = studentdtls.schoolyearID;
            state.studentID = studentdtls.id;
            state.parentID = studentdtls.parentID;
            state.package_type = studentdtls.package_type;
            state.std_leave_apply = studentdtls.std_leave_apply;
            state.receipt_logo = studentdtls.receipt_logo;
            state.school_appname = studentdtls.school_appname;
            state.school_phone = studentdtls.school_phone;
            state.school_addphone = studentdtls.school_addphone;
            state.school_email = studentdtls.school_email;
            state.invoice_type = studentdtls.invoice_type;
            state.classesID = studentdtls.classesID;
            state.sectionID = studentdtls.sectionID;
            state.classname = studentdtls.classname;
            state.sectionname = studentdtls.sectionname;
            state.user_type = studentdtls.user_type;
            state.std_name = studentdtls.std_name;
            state.std_email = studentdtls.std_email;
            state.std_phone = studentdtls.std_phone;
            state.std_roll = studentdtls.std_roll;
            state.std_photo = studentdtls.std_photo;
            state.std_dob = studentdtls.std_dob;
            state.std_regno = studentdtls.std_regno;
        },
        setStudentLoginDtls(state, action: PayloadAction<any>) {
            // console.log('action is:', action);
            // console.log('action.payload', action.payload);
            let studentdtls = action.payload;
            state.schoolyearID = studentdtls.schoolyearID;
            state.studentID = studentdtls.studentID;
            state.parentID = studentdtls.parentID;
            state.package_type = studentdtls.package_type;
            state.std_leave_apply = studentdtls.std_leave_apply;
            state.receipt_logo = studentdtls.receipt_logo;
            state.school_appname = studentdtls.school_appname;
            state.school_phone = studentdtls.school_phone;
            state.school_addphone = studentdtls.school_addphone;
            state.school_email = studentdtls.school_email;
            state.invoice_type = studentdtls.invoice_type;
            state.classesID = studentdtls.classesID;
            state.sectionID = studentdtls.sectionID;
            state.classname = studentdtls.classname;
            state.sectionname = studentdtls.sectionname;
            state.user_type = studentdtls.user_type;
            state.std_name = studentdtls.std_name;
            state.std_email = studentdtls.std_email;
            state.std_phone = studentdtls.std_phone;
            state.std_roll = studentdtls.std_roll;
            state.std_photo = studentdtls.std_photo;
            state.std_dob = studentdtls.std_dob;
            state.std_regno = studentdtls.std_regno;
            state.isLoggedinuser = true;

            localStorage.setItem('schoolyearID', studentdtls.schoolyearID);
            localStorage.setItem('schoolyear', studentdtls.schoolyear);
            localStorage.setItem('studentID', studentdtls.studentID);
            localStorage.setItem('parentID', studentdtls.parentID);
            localStorage.setItem('package_type', studentdtls.package_type);
            localStorage.setItem('std_leave_apply', studentdtls.std_leave_apply);
            localStorage.setItem('receipt_logo', studentdtls.receipt_logo);
            localStorage.setItem('school_appname', studentdtls.school_appname);
            localStorage.setItem('school_phone', studentdtls.school_phone);
            localStorage.setItem('school_addphone', studentdtls.school_addphone);
            localStorage.setItem('school_email', studentdtls.school_email);
            localStorage.setItem('invoice_type', studentdtls.invoice_type);
            localStorage.setItem('classesID', studentdtls.classesID);
            localStorage.setItem('sectionID', studentdtls.sectionID);
            localStorage.setItem('classname', studentdtls.classname);
            localStorage.setItem('sectionname', studentdtls.sectionname);
            localStorage.setItem('user_type', studentdtls.user_type);
            localStorage.setItem('std_name', studentdtls.std_name);
            //localStorage.setItem('std_email', studentdtls.std_email);
            localStorage.setItem('std_phone', studentdtls.std_phone);
            localStorage.setItem('std_roll', studentdtls.std_roll);
            localStorage.setItem('std_photo', studentdtls.std_photo);
            localStorage.setItem('std_dob', studentdtls.std_dob);
            localStorage.setItem('std_regno', studentdtls.std_regno);
            localStorage.setItem('isLoggedinuser', 'true');
            localStorage.setItem('token', studentdtls.token);
        },
        setUpdateDtls(state, action: PayloadAction<any>) {
            let update = action.payload;
            state.std_email = update.email;
            state.std_phone = update.phone;
            //persistor.persist();
            //localStorage.setItem('std_email', update.email);
            localStorage.setItem('std_phone', update.phone);
            console.log('persist local', localStorage.getItem(`persist:root`));
        },
        setSchoolDtls(state, action: PayloadAction<any>) {
            state.schdtls = action.payload;
            // console.log('state.schdtls', state.schdtls);
            let schdtls = action.payload;
            // console.log('schdtls', schdtls);
            // console.log('setSchoolDtlsschoolID', schdtls.schoolID);
            const jsonData = JSON.stringify(action.payload);
            localStorage.setItem('schdtls', jsonData);
            localStorage.setItem('schoolID', schdtls.schoolID);
            localStorage.setItem('school_name', schdtls.school_name);
            localStorage.setItem('school_logo', schdtls.school_logo);
        },
        logout: (state) => {
            state.isLoggedinuser = false;
            localStorage.setItem('isLoggedinuser', 'false');
            localStorage.setItem('schoolyearID', '');
            localStorage.setItem('studentID', '');
            localStorage.setItem('parentID', '');
            localStorage.setItem('package_type', '');
            localStorage.setItem('std_leave_apply', '');
            localStorage.setItem('receipt_logo', '');
            localStorage.setItem('school_appname', '');
            localStorage.setItem('school_phone', '');
            localStorage.setItem('school_addphone', '');
            localStorage.setItem('school_email', '');
            localStorage.setItem('invoice_type', '');
            localStorage.setItem('classesID', '');
            localStorage.setItem('sectionID', '');
            localStorage.setItem('classname', '');
            localStorage.setItem('sectionname', '');
            localStorage.setItem('user_type', '');
            localStorage.setItem('std_name', '');
            localStorage.setItem('std_email', '');
            localStorage.setItem('std_phone', '');
            localStorage.setItem('std_roll', '');
            localStorage.setItem('std_photo', '');
            localStorage.setItem('std_dob', '');
            localStorage.setItem('std_regno', '');
        },
    },
});

export const {
    toggleTheme,
    toggleMenu,
    toggleLayout,
    toggleRTL,
    toggleAnimation,
    toggleNavbar,
    toggleSemidark,
    toggleIsLoggedin,
    toggleIsschoolID,
    toggleIsschool_name,
    toggleIsschool_logo,
    toggleLocale,
    toggleSidebar,
    setPageTitle,
    setStudentLoginDtls,
    toggleStudentLoginDtls,
    setSchoolDtls,
    logout,
    setUpdateDtls,
} = themeConfigSlice.actions;

export const selectAuth = (state: { auth: ThemeConfigState }) => state.auth;

export default themeConfigSlice.reducer;
