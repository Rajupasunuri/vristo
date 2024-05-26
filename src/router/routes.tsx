import { lazy } from 'react';

import Timetable from '../pages/Apps/Timetable';
import Knowledge from '../pages/Apps/Knowledge';
import AcademicYear from '../pages/Apps/AcademicYear';
import Child from '../pages/Apps/Child';

import Attendance from '../pages/Apps/Attendance';
import Diary from '../pages/Apps/Diary';
import Assignments from '../pages/Apps/Assignments';
import { Marks } from '@mantine/core/lib/Slider/Marks/Marks';
import ExamSchedule from '../pages/Apps/ExamSchedule';
import { AppShell, Mark } from '@mantine/core';

import Online from '../pages/Apps/Online';
import TalentShow from '../pages/Apps/TalentShow';
import Mark1 from '../pages/Apps/Mark1';
import FeeReceipt from '../pages/Apps/FeeReceipt';
import PaymentHistory from '../pages/Apps/PaymentHistory';
//import Fines from '../pages/Apps/Fines';
import Invoices from '../pages/Apps/Invoices';
import QueryRequest from '../pages/Apps/QueryRequest';
import Events from '../pages/Apps/Events';
import Holiday from '../pages/Apps/Holiday';
import Notices from '../pages/Apps/Notices';
import Dictionary from '../pages/Apps/Dictionary';
import Transport from '../pages/Apps/Transport';

import { Media } from 'reactstrap';
import Medias from '../pages/Apps/Medias';
import Books from '../pages/Apps/Books';
import BooksIssued from '../pages/Apps/BooksIssued';
import ChangePassword from '../pages/Apps/ChangePassword';
import QueryComplaint from '../pages/Apps/QueryComplaint';
import InvoicePreviews from '../pages/Apps/InvoicePreviews';
import PaymentGate from '../pages/Apps/PaymentGate';

import LeaveList from '../pages/Apps/LeaveList';
import PendingLeaves from '../pages/Apps/PendingLeaves';
import ApprovedLeaves from '../pages/Apps/ApprovedLeaves';
import RejectedLeaves from '../pages/Apps/RejectedLeaves';
import HomeWork from '../pages/Apps/HomeWork';
import PayNow from '../pages/Apps/PayNow';
import LiveClass from '../pages/Apps/LiveClass';
import NewAssign from '../pages/Apps/NewAssign';

const Index = lazy(() => import('../pages/Index'));
const Logout = lazy(() => import('../pages/Logout'));

const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const GetSchDtls = lazy(() => import('../pages/Authentication/GetSchDtls'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));

const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));

const About = lazy(() => import('../pages/About'));

const routes = [
    // dashboard

    {
        path: '/',
        element: <GetSchDtls />,
        layout: 'blank',
        // element: <Index />,
    },
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'blank',
        // element: <Index />,
    },
    {
        path: '/dashboard',
        element: <Index />,
    },
    {
        path: '/logout',
        element: <Logout />,
    },
    {
        path: '/leave_list',
        element: <LeaveList />,
    },
    {
        path: '/pending_leaves',
        element: <PendingLeaves />,
    },
    {
        path: '/approved_leaves',
        element: <ApprovedLeaves />,
    },
    {
        path: '/rejected_leaves',
        element: <RejectedLeaves />,
    },

    {
        path: '/preview',
        element: <InvoicePreviews />,
    },
    {
        path: '/homework',
        element: <HomeWork />,
    },

    {
        path: '/timetable',
        element: <Timetable />,
    },
    {
        path: '/payments',
        element: <PaymentGate />,
    },
    {
        path: '/query/complaint',
        element: <QueryComplaint />,
    },

    {
        path: '/knowledge-bank',
        element: <Knowledge />,
    },

    {
        path: '/assignments',
        element: <Assignments />,
    },
    {
        path: '/diary',
        element: <Diary />,
    },
    {
        path: '/attendance',
        element: <Attendance />,
    },

    {
        path: '/mi-child',
        element: <Child />,
    },
    {
        path: '/academic-year',
        element: <AcademicYear />,
    },

    {
        path: '/talent-show',
        element: <TalentShow />,
    },
    {
        path: '/online-exam',
        element: <Online />,
    },

    {
        path: '/schedule',
        element: <ExamSchedule />,
    },
    {
        path: '/mark',
        element: <Mark1 />,
    },

    // {
    //     path: '/fee-receipt',
    //     element: <FeeReceipt />,
    // },

    {
        path: '/invoice',
        element: <Invoices />,
    },
    {
        path: '/newassign',
        element: <NewAssign />,
    },
    {
        path: '/paynow',
        element: <PayNow />,
    },
    {
        path: '/live-class',
        element: <LiveClass />,
    },

    {
        path: '/payment-history',
        element: <PaymentHistory />,
    },

    {
        path: '/query-request',
        element: <QueryRequest />,
    },

    {
        path: '/events',
        element: <Events />,
    },
    {
        path: '/holiday',
        element: <Holiday />,
    },
    {
        path: '/notices',
        element: <Notices />,
    },

    {
        path: '/dictionary',
        element: <Dictionary />,
    },
    {
        path: '/transport',
        element: <Transport />,
    },

    {
        path: '/media',
        element: <Medias />,
    },

    {
        path: '/books',
        element: <Books />,
    },
    {
        path: '/books-issued',
        element: <BooksIssued />,
    },

    {
        path: '/change-password',
        element: <ChangePassword />,
    },

    {
        path: '/users/profile',
        element: <Profile />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },

    {
        path: '/auth/cover-login',
        element: <LoginCover />,
        layout: 'blank',
    },

    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    // {
    //     path: '*',
    //     element: <Error />,
    //     layout: 'blank',
    // },
];

export { routes };
