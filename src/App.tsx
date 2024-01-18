import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark, toggleIsLoggedin } from './store/themeConfigSlice';
import store from './store';
import { Navigate } from 'react-router';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    //     dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    //     dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
    //     dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
    //     dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
    //     dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
    //     dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
    //     dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    //     //dispatch(toggleIsLoggedin(localStorage.getItem('isLoggedin') || themeConfig.isLoggedinuser));
    //     dispatch(toggleIsLoggedin(localStorage.getItem('isLoggedinuser') || themeConfig.isLoggedinuser));

    // }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark,themeConfig.isLoggedinuser]);
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    }, [dispatch, themeConfig.theme]);
    useEffect(() => {
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    }, [dispatch, themeConfig.menu]);
    useEffect(() => {
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
    }, [dispatch, themeConfig.layout]);
    useEffect(() => {
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
    }, [dispatch, themeConfig.rtlClass]);
    useEffect(() => {
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
    }, [dispatch, themeConfig.animation]);
    useEffect(() => {
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
    }, [dispatch, themeConfig.navbar]);
    useEffect(() => {
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
    }, [dispatch, themeConfig.locale]);
    useEffect(() => {
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.semidark]);
    useEffect(() => {
        dispatch(toggleIsLoggedin(localStorage.getItem('isLoggedinuser') || themeConfig.isLoggedinuser));
    }, [dispatch, themeConfig.isLoggedinuser]);

    return (
        <div
            className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
