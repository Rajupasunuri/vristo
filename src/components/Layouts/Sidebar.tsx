import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconLogout from '../Icon/IconLogout';
import { FaUserTie } from 'react-icons/fa6';
import { AWS_S3_IMG } from '../../pages/query';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [isHovering, setIsHovering] = useState(null);
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    // console.log('user photo', typeof null);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleHover = (menu: any) => {
        setIsHovering(menu);
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/dashboard" className="main-logo flex items-center shrink-0">
                            <img className="w-19 h-9 ml-[4px] flex-none" src={localStorage.school_logo} alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light"></span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0 ">
                            <li>
                                <p className="font-bold space-y-0.5 p-4 py-0 text-xs">{themeConfig.std_name}</p>
                                <NavLink to="/users/profile" className="flex items-center px-4 py-1">
                                    {localStorage.std_photo != 'null' || localStorage.std_photo != null || localStorage.std_photo != '' ? (
                                        <img className="w-8 ml-[5px] flex-none" src={AWS_S3_IMG + localStorage.std_photo} alt="pic" />
                                    ) : (
                                        <FaUserTie className="w-16 h-16   overflow-hidden  object-cover  mb-5 text-blue-400 " />
                                    )}
                                    <div className="font-semibold space-y-0.5 p-4 py-0 text-xs">
                                        Class: {themeConfig.classname}:{themeConfig.sectionname} <hr /> AdmNo: {themeConfig.std_regno}
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'academics' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('academics')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Academics')}</span>
                                    </div>

                                    <div className={currentMenu !== 'academics' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'academics' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/timetable">{t('Timetable')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/knowledge-bank">{t('Knowledge Bank')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/live-class">{t('Live Classes')}</NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/diary">{t('Diary')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/homework">{t('HomeWork')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance">{t('Attendance')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/face-attendance">{t('Face Attendance')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/leave-management">{t('Leave Management')}</NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink to="/mi-child">{t('MI of Your Child')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/academic-year">{t('Academic Year')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'exams' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('exams')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Exams')}</span>
                                    </div>

                                    <div className={currentMenu !== 'exams' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'exams' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/talent-show">{t('Talent Show')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/online-exam">{t('Online Exam')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/assignments">{t('Assignments')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/newassign">{t('NewAssignments')}</NavLink>
                                        </li> */}
                                        {/* <li>
                                            <NavLink to="/offline-exam">{t('Offline Exam')}</NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink to="/exam_schedule">{t('Exam Schedule')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/marks">{t('Marks')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/mark">{t('Mark')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'finance' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('finance')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Finance')}</span>
                                    </div>

                                    <div className={currentMenu !== 'finance' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'finance' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/invoice">{t('Invoice')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/fines">{t('Fines')}</NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink to="/payment-history">{t('Payment History')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/paynow">{t('Pay Now')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/fee-receipt">{t('Fee Receipt')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'facilities' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('facilities')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Facilities')}</span>
                                    </div>

                                    <div className={currentMenu !== 'facilities' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'facilities' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        {/* <li>
                                            <NavLink to="/gallery">{t('Gallery')}</NavLink>
                                        </li> */}

                                        <li>
                                            <div>
                                                <NavLink to="/media">{t('Gallery')}</NavLink>
                                                {/* {currentMenu === 'facilities' && isHovering === 'gallery' && (
                                                    <ul className="sub-menu text-gray-500">
                                                        <li className="pl-8">
                                                            <NavLink to="/media">{t('Media')}</NavLink>
                                                        </li>
                                                    </ul>
                                                )} */}
                                            </div>
                                        </li>

                                        <li>
                                            <NavLink to="/dictionary">{t('Dictionary')}</NavLink>
                                        </li>

                                        <li>
                                            <div onMouseLeave={() => handleHover(null)}>
                                                <NavLink to="/books">{t('Books')}</NavLink>
                                            </div>
                                        </li>

                                        {/* <li>
                                            <NavLink to="/transport">{t('Transport')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/hostel">{t('Hostel')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'announcements' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('announcements')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Announcements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'announcements' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'announcements' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/notices">{t('Notices')}</NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/holiday">{t('Holiday')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/events">{t('Events')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/query-request">{t('Query Request Complaint')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {localStorage.std_leave_apply == 1 ? (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'leave' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('leave')}>
                                        <div className="flex items-center">
                                            <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Leave Management')}</span>
                                        </div>

                                        <div className={currentMenu !== 'leave' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'leave' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/leave_list">{t('Leaves List')}</NavLink>
                                            </li>

                                            <li>
                                                <NavLink to="/pending_leaves">{t('Pending Leaves')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/approved_leaves">{t('Approved Leaves')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/rejected_leaves">{t('Rejected Leaves')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            ) : null}
                            <li className="menu nav-item">
                                <button type="button">
                                    <div className="flex items-center">
                                        <NavLink to="/logout" className="flex items-center justify-start text-danger">
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Sign Out
                                        </NavLink>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
