import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { MY_DASHBOARD_URL, MY_DICTIONARY_URL } from '../query';
import Swal from 'sweetalert2';

const Dictionary = () => {
    const [word, setWord] = useState('');
    const [show, setShow] = useState(false);
    const [WordErr, setWordErr] = useState(false);
    const [resWord, setResWord] = useState('');
    const [wordMeaning, setWordMeaning] = useState<any>({});
    const dispatch = useDispatch();

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
        };

        const postData = {
            studentID: localStorage.studentID,
            schoolID: localStorage.schoolID,
            diction: word,
            // parentID: localStorage.parentID,
        };
        const loginurl = MY_DICTIONARY_URL;
        axios
            .post(loginurl, postData, {
                headers: headers,
            })
            .then((response) => {
                console.log('Response is----- ', response);
                if (response.data.error) {
                    Swal.fire('Request Failed, Try Again Later!');
                } else {
                    if (response.data.data.dictioninfo.length > 0) {
                        const meaningObject = JSON.parse(response.data.data.dictioninfo[0].meaning);

                        const resWord = response.data.data.dictioninfo[0].word;
                        setWordMeaning(meaningObject);
                        setShow(true);
                        console.log('parse ', meaningObject);
                        console.log('resword', resWord);
                        setResWord(resWord);
                    } else {
                        var errors = response.data.message;
                        setWordErr(true);
                    }
                }
            })
            .catch((error) => {
                console.log('Error is ', error);
            });
    };

    const handleword = (e: any) => {
        setWord(e.target.value);
        setWordMeaning('');
        setShow(false);
        setWordErr(false);
    };

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="panel" id="line">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Dictionary</h5>
                    </div>
                    <div className="mb-5">
                        <div>
                            <div className="flex items-start pt-5">
                                <div className="flex-auto">
                                    <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-1">
                                        <input
                                            type="text"
                                            value={word}
                                            onChange={handleword}
                                            placeholder="Some Text..."
                                            className="block w-1/2 rounded-md border-0 py-1.5 pl-2  text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                            required
                                        />
                                        <button type="submit" className="border border-gray-300 py-1.5 bg-white px-4 rounded-md">
                                            Search
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="mt-4">
                                {show && (
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex space-x-2">
                                            <p className="text-md font-bold">Word:</p>
                                            <p>{resWord}</p>
                                        </div>
                                        <div>
                                            <p className="text-md font-bold">Meaning and Uses:</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                {Object.keys(wordMeaning).map((item, key) => (
                                    <div key={key}>
                                        <p></p>
                                        <p className="space-x-2">
                                            {item}
                                            {wordMeaning[item]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {WordErr ? (
                                    <div className="flex justify-center items-center">
                                        <h2 className="text-md font-bold">No Meaning Found For The Word</h2>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dictionary;
