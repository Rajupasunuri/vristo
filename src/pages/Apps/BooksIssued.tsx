import { useEffect, useState, Fragment } from 'react';
import CodeHighlight from '../../components/Highlight';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconPencil from '../../components/Icon/IconPencil';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconCircleCheck from '../../components/Icon/IconCircleCheck';
import IconSettings from '../../components/Icon/IconSettings';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import IconEye from '../../components/Icon/IconEye';
import { Link } from 'react-router-dom';

const tableData = [
    {
        id: 1,
        book: 'English',
        author: 'ram',
        subjectCode: 'Eng',
        quantity: '100',
        rack: '6.7',

        status: '',
        action: '',
    },
];

const Tables = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    const [modal10, setModal10] = useState(false);
    return (
        <div className="space-y-6">
            {/* Simple */}

            {/* Hover Table  */}
            <h3 className="font-bold text-lg">Facilities</h3>
            <div className="panel">
                <div className="flex items-center justify-between mb-5 border-b ">
                    <h5 className="font-semibold text-lg pb-4 dark:text-white-light"> Issued Books</h5>
                    <div className="flex justify-start pb-4">
                        <Link to="/books" className="p-2 bg-white text-blue-700 border-blue-700 border hover:bg-blue-700 rounded-md hover:text-white font-bold">
                            Books
                        </Link>
                    </div>
                </div>

                <div className="table-responsive mb-5">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th>ISSUED BOOK</th>
                                <th>SERIAL NO</th>
                                <th>DUE DATE</th>

                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <>
                                        <tr>
                                            <td colSpan={5} className="font-bold text-base text-center m-2 bg-white ">
                                                <h2 className="flex justify-center items-center">No Data Available In Table</h2>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tables;
