import { lazy } from 'react';

import Timetable from '../pages/Apps/Timetable';
import KnowledgeBank from '../pages/Apps/Knowledge_Bank';
import AcademicYear from '../pages/Apps/AcademicYear';
import Child from '../pages/Apps/Mi_Child';

import Attendance from '../pages/Apps/Attendance';
import Diary from '../pages/Apps/Diary';
import Assignments from '../pages/Apps/Assignments';
import ExamSchedule from '../pages/Apps/ExamSchedule';

import Online from '../pages/Apps/Online';
import TalentShow from '../pages/Apps/TalentShow';
import Mark1 from '../pages/Apps/Marks';
import PaymentHistory from '../pages/Apps/PaymentHistory';
//import Fines from '../pages/Apps/Fines';
import Invoices from '../pages/Apps/Invoices';
import QueryRequest from '../pages/Apps/QueryRequest';
import Events from '../pages/Apps/Events';
import Holiday from '../pages/Apps/Holiday';
import Notices from '../pages/Apps/Notices';
import Dictionary from '../pages/Apps/Dictionary';
import Transport from '../pages/Apps/Transport';

import Medias from '../pages/Apps/Media';
import Books from '../pages/Apps/Books';
import BooksIssued from '../pages/Apps/BooksIssued';
import ChangePassword from '../pages/Apps/ChangePassword';
import QueryComplaint from '../pages/Apps/QueryComplaint';
import InvoicePreviews from '../pages/Apps/InvoicePreviews';

import LeaveList from '../pages/Apps/LeaveList';
import PendingLeaves from '../pages/Apps/PendingLeaves';
import ApprovedLeaves from '../pages/Apps/ApprovedLeaves';
import RejectedLeaves from '../pages/Apps/RejectedLeaves';
import HomeWork from '../pages/Apps/HomeWork';
import PayNow from '../pages/Apps/PayNow';
import LiveClass from '../pages/Apps/LiveClass';
import NewAssign from '../pages/Apps/NewAssign';
import PaymentPage from '../pages/Apps/PaymentPage';
import Invoice_pay from '../pages/Apps/Invoice_pay';
import FaceAttendance from '../pages/Apps/FaceAttendance';
import PaymentFailure from '../pages/Apps/PaymentFailure';
import PaymentSuccess from '../pages/Apps/PaymentSuccess';
import Mark from '../pages/Apps/Mark';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Logout = lazy(() => import('../pages/Logout'));

const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));

const GetSchDtls = lazy(() => import('../pages/Authentication/GetSchDtls'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));

const routes = [
    // dashboard

    {
        path: '/',
        element: <GetSchDtls />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/payment-failure',
        element: <PaymentFailure />,
        layout: 'blank',
    },
    {
        path: '/payment-success',
        element: <PaymentSuccess />,
        layout: 'blank',
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/face-attendance',
        element: <FaceAttendance />,
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
        path: '/invoice_pay',
        element: <Invoice_pay />,
    },
    {
        path: '/query/complaint',
        element: <QueryComplaint />,
    },

    {
        path: '/knowledge-bank',
        element: <KnowledgeBank />,
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
        path: '/exam_schedule',
        element: <ExamSchedule />,
    },
    {
        path: '/marks',
        element: <Mark1 />,
    },
    {
        path: '/mark',
        element: <Mark />,
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
        path: '/payment',
        element: <PaymentPage />,
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

    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },

    // {
    //     path: '*',
    //     element: <Error />,
    //     layout: 'blank',
    // },
];

export { routes };
