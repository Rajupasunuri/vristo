import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Nouislider from '@x1mrdonut1x/nouislider-react';
import 'nouislider/distribute/nouislider.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';

const DateRangePicker = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Date & Range Picker'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [inputStart, setInputStart] = useState<any>(20);
    const [inputEnd, setInputEnd] = useState<any>(40);
    const [slider2, setSlider2] = useState<any>([500, 4000]);
    const [percent2, setPercent2] = useState<any>([5, 40]);

    const [disabled, setDisabled] = useState<any>(false);
    const [skippingValue, setSkippingValue] = useState<any>(40);
    const [skippingValue1, setSkippingValue1] = useState<any>(40);

    const changeValue = () => {
        setDisabled(!disabled);
    };

    const slider1Update = (range: any) => {
        setInputStart(range[0]);
        setInputEnd(range[1]);
    };

    const onSide = (render: any, handle: any, value: any, un: any, percent: any) => {
        setSlider2(value);
        setPercent2(percent);
    };

    const [date1, setDate1] = useState<any>('');
    const [date2, setDate2] = useState<any>('2022-07-05 12:00');
    const [date3, setDate3] = useState<any>('2022-07-05 to 2022-07-10');
    const [date4, setDate4] = useState<any>('13:45');
    const [range1, setRange1] = useState<any>('0');
    const [range2, setRange2] = useState<any>('0');
    const [range3, setRange3] = useState<any>('0');
    const [range4, setRange4] = useState<any>('0');

    return (
        <div>
            <div className="pt-5 space-y-8">
                <div className="space-y-8" id="date_time_picker">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                        {/*  Basic  */}
                        <div className="">
                            <div className="mb-5">
                                <Flatpickr
                                    value={date1}
                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                    className="form-input sm:w-40 w:20"
                                    onChange={(date) => setDate1(date)}
                                />
                            </div>
                        </div>

                        {/* Date & time */}

                        {/*  range-calendar */}

                        {/* preloading time */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateRangePicker;
