import React, { useEffect, useState } from 'react';

import Tippy from '@tippyjs/react';

import axios from 'axios';
import { MY_INVOICES_URL, MY_INVOICES_YEARS_URL, MY_STUDENT_MARKS_URL } from '../query';

import { NavLink, useNavigate } from 'react-router-dom';

import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const Mark = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [invoYears, setInvoYears] = useState([]);
    const [stdYears, setStdYears] = useState([]);
    const [exams, setExams] = useState([]);
    const [schoolyearID, setSchoolyearID] = useState(localStorage.schoolyearID);
    const [exstudentID, setExstudentID] = useState(localStorage.studentID);
    const [yearStudentID, setYearStudentID] = useState(localStorage.studentID);
    const [classesID, setClassesID] = useState(localStorage.classesID);
    const [sectionID, setSectionID] = useState(localStorage.sectionID);
    const [invoiceData, setInvoiceData] = useState<any>([]);
    const [inoviceIdV, setInvoiceIDV] = useState('');
    const [invoLoader, setInvoLoader] = useState(false);
    const navigate = useNavigate();
    
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
                    schoolyearID: schoolyearID,
                    // yearstudentID: 177398,
                    admno: localStorage.std_regno,
                    classesID: classesID,
                    sectionID: sectionID,
                    exstudentID: exstudentID,
                };
                const response = await axios.post(MY_STUDENT_MARKS_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                     setStdYears(response.data.data.std_years);
                     setExams(response.data.data.exams);
                    console.log("marks years",response)
                }

                
            } catch (error) {
                console.error('Error fetching data:', error);
                //setInvoLoader(true);
            }
        };

        fetchData();
    }, [exstudentID,schoolyearID]);

    useEffect(() => {
        const fetchYearInvoices = async () => {
            try {
                setInvoLoader(true);
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                };
                const postData = {
                    studentID: localStorage.studentID,
                    yearstudentID: yearStudentID,
                    schoolID: localStorage.schoolID,
                    schoolyearID: schoolyearID,

                    // admno: localStorage.std_regno,
                };
                console.log('yearstdid', yearStudentID);

                const response = await axios.post(MY_INVOICES_YEARS_URL, postData, {
                    headers: headers,
                });

                if (response.data.error) {
                    //Swal.fire('Request Failed, Try Again Later!');
                } else {
                    console.log('year invoices', response);
                    setInvoiceData(response.data.data.invoices);
                    setInvoLoader(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setInvoLoader(true);
            }
        };

        fetchYearInvoices();
    }, [yearStudentID]);

    const handleInvoice = (id: any, paidstatus: any) => {
        localStorage.setItem('InvoiceID', id);
        localStorage.setItem('yearStudentID', yearStudentID);
        localStorage.setItem('tempschoolYearID', schoolyearID);
        localStorage.setItem('paidstatus', paidstatus);
        if (paidstatus > 1) {
            navigate('/preview');
        } else {
            navigate('/invoice_pay');
        }
    };
    const loadyearinvo = (schyearid: any, yearstdid: any,yearclassesID:any,yearsectionID:any) => {
        if (schoolyearID == schyearid) {
        } else {
            // console.log('changed', yearstdid);
            setSchoolyearID(schyearid);
            setExstudentID(yearstdid);
            setClassesID(yearclassesID);
            setSectionID(yearsectionID);
        }
    };

    return (
        <>
            {invoLoader ? (
                <div className="h-screen flex items-center justify-center">
                    <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
                </div>
            ) : (
                <div className="panel ">
                    <div className="flex  panel items-center justify-between pb-5 mb-4 border-b-2 overflow-x-auto space-x-1.5">
                        {stdYears.map((year: any, index: number) => (
                            <div key={index}>
                                <button
                                    className={`btn whitespace-nowrap ${schoolyearID == year.schoolyearID ? 'btn-info' : 'btn-outline-info'}`}
                                    onClick={() => loadyearinvo(year.schoolyearID, year.studentID,year.classesID,year.sectionID)}
                                >
                                    {year.schoolyear}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="card-container">
  <h2 className="text-lg font-semibold">Student's Report</h2>
  {exams.map((exam: any, index: number) => {
    // Calculate the total max and actual marks
    const totalMax = exam.ex_subjects.reduce((acc: number, sub: any) => acc + Number(sub.max), 0);
    const totalActual = exam.ex_subjects.reduce((acc: number, sub: any) => acc + Number(sub.actual), 0);
    
    // Calculate the average and percentage
    const averageActual = (totalActual / exam.ex_subjects.length).toFixed(2);
    const percentage = ((totalActual / totalMax) * 100).toFixed(2);

    return (
      <div key={index} className="mt-6 overflow-x-auto">
        <table className="w-full mt-3 border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-blue-400 text-white">Subjects</th>
              <th className="border px-4 py-2 bg-blue-400 text-white" colSpan={3}>{exam.exam}</th>
            </tr>
            <tr>
              <th className="border px-4 py-2 bg-blue-300">Max Marks</th>
              <th className="border px-4 py-2 bg-blue-300">Max</th>
              <th className="border px-4 py-2 bg-blue-300">Actual</th>
              <th className="border px-4 py-2 bg-blue-300">Rank</th>
            </tr>
          </thead>
          <tbody>
            {exam.ex_subjects.map((sub: any, subIndex: number) => (
              <tr key={subIndex}>
                <td className="border px-4 py-2">{sub.subject}</td>
                <td className="border px-4 py-2">{sub.max}</td>
                <td className="border px-4 py-2">{sub.actual}</td>
                <td className="border px-4 py-2">{sub.rank}</td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2 font-semibold">Total</td>
              <td className="border px-4 py-2 font-semibold">{exam.totalMax}</td>
              <td className="border px-4 py-2 font-semibold">{exam.totalActual}</td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Average</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-semibold">{exam.average}</td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Percentage</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-semibold">{exam.percentage}%</td>
              <td className="border px-4 py-2"></td>
            </tr>
            
            <tr>
              <td className="border px-4 py-2 font-semibold">Grade</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-semibold">{exam.grade.grade}</td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Section Wise Rank</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-semibold">B</td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Class Wise Rank</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-semibold">B</td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  })}
</div>


                   
                </div>
            )}
        </>
    );
};

export default Mark;
