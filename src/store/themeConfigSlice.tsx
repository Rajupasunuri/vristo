/*import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import themeConfig from '../theme.config';

const defaultState = {
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
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
    ],
    semidark: false,
    user:null,
};

const initialState = {
    user:null,
    theme: localStorage.getItem('theme') || themeConfig.theme,
    menu: localStorage.getItem('menu') || themeConfig.menu,
    layout: localStorage.getItem('layout') || themeConfig.layout,
    rtlClass: localStorage.getItem('rtlClass') || themeConfig.rtlClass,
    animation: localStorage.getItem('animation') || themeConfig.animation,
    navbar: localStorage.getItem('navbar') || themeConfig.navbar,
    locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
    isDarkMode: false,
    sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
    semidark: localStorage.getItem('semidark') || themeConfig.semidark,
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ae', name: 'Arabic' },
    ],
    
};

const themeConfigSlice = createSlice({
    name: 'auth',

    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
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
        toggleMenu(state, { payload }) {
            payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
            state.sidebar = false; // reset sidebar state
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggleLayout(state, { payload }) {
            payload = payload || state.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRTL(state, { payload }) {
            payload = payload || state.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar(state, { payload }) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }) {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload);
            state.semidark = payload;
        },
        toggleLocale(state, { payload }) {
            payload = payload || state.locale;
            i18next.changeLanguage(payload);
            state.locale = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },

        setPageTitle(state, { payload }) {
            document.title = `${payload} | VRISTO - Multipurpose Tailwind Dashboard Template`;
        },

        fetchUserSuccess(state,{payload}){
           // payload = payload || state.user;
           // localStorage.setItem('user', payload);
            state. user =payload;
        
            
        }
    },
});

export const { toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleLocale, toggleSidebar, setPageTitle,fetchUserSuccess } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;*/
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import themeConfig from '../theme.config';

interface Language {
    code: string;
    name: string;
}
interface User {
    name: string;

    email: string;
    phone: string;
    district: string;
    country: string;
    section: string;
    state: string;
    address: string;
    // User: {};
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
    //user: null | {};
    isLoggedinuser: boolean;
    user: User | null; // Adjust the type according to your user object structure
}

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
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
    ],
    semidark: false,
    //user: null,
    isLoggedinuser: false,
    user: null,
};

const initialState: ThemeConfigState = {
    ...defaultState,
    user: localStorage.getItem('userdata') || themeConfig.user,
    //localStorage.getItem(aid)|| themeConfig.user,
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

        toggleIsLoggedin(state, { payload }: PayloadAction<boolean | string | undefined>) {
            payload = payload === true || payload === 'true';

            localStorage.setItem('isLoggedinuser', payload.toString());
            localStorage.removeItem('user'); // Remove the 'user' key from localStorage
            state.isLoggedinuser = payload;

            return state;
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
            document.title = `${payload} | VRISTO - Multipurpose Tailwind Dashboard Template`;
        },
        fetchUserSuccess(state, action: PayloadAction<any>) {
            console.log('action is:', action);
            console.log('action.payload', action.payload);
            console.log('before.state', state.user);
            state.user = action.payload;
            console.log('state.user', state.user);
            //console.log('stateuser', state.user);
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('userdata', action.payload);
            //localStorage.setItem('rajuuserData', JSON.stringify(action.payload));
            localStorage.setItem('isLoggedinuser', 'true');
        },
        logout: (state) => {
            state.isLoggedinuser = false;
            state.user = null;
            localStorage.setItem('isLoggedinuser', 'false');
            localStorage.setItem('user', '');
        },
        signin: (state) => {
            state.isLoggedinuser = true;
            // state.user = action.payload;
            localStorage.setItem('isLoggedinuser', 'true');
            //localStorage.setItem('user', '');
        },
        //console.log('stateuser',state.user)
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
    toggleLocale,
    toggleSidebar,
    setPageTitle,
    fetchUserSuccess,
    logout,
    signin,
} = themeConfigSlice.actions;

export const selectAuth = (state: { auth: ThemeConfigState }) => state.auth;

export default themeConfigSlice.reducer;
