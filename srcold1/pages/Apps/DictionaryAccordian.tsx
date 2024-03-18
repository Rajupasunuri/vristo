import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconAirplay from '../../components/Icon/IconAirplay';
import IconBox from '../../components/Icon/IconBox';
import IconLayout from '../../components/Icon/IconLayout';

const Accordians = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Accordians'));
    });
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const [active1, setActive1] = useState<string>('1');
    const togglePara1 = (value: string) => {
        setActive1((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const [active2, setActive2] = useState<string>('1');
    const togglePara2 = (value: string) => {
        setActive2((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const [active3, setActive3] = useState<string>('1');
    const togglePara3 = (value: string) => {
        setActive3((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    return (
        <div>
            <div className="pt-5 space-y-8">
                <div className="panel" id="basic">
                    <div className="mb-5">
                        <div className="space-y-2 font-semibold">
                            <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '1' ? '!text-primary' : ''}`}
                                    onClick={() => togglePara('1')}
                                >
                                    Rarefy
                                    <div className={`ltr:ml-auto rtl:mr-auto ${active === '1' ? 'rotate-180' : ''}`}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                        <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                            <p>Meaning And Uses</p>

                                            <p>
                                                1. To make rare or rarer; make less dense: to rarefy a gas. To make more refined, spiritual, or exalted. To become rare or less dense; become thinned:
                                                Moisture rarefies when heated.
                                            </p>

                                            <p> 2.To make more refined, spiritual, or exalted. To become rare or less dense; become thinned: Moisture rarefies when heated.</p>
                                            <p>3.To become rare or less dense; become thinned: Moisture rarefies when heated.</p>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '2' ? '!text-primary' : ''}`}
                                    onClick={() => togglePara('2')}
                                >
                                    Mendacity
                                    <div className={`ltr:ml-auto rtl:mr-auto ${active === '2' ? 'rotate-180' : ''}`}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                            <p>Meaning And Uses</p>
                                            <p>1.The quality of being mendacious; untruthfulness; tendency to lie.</p>
                                            <p>2. An instance of lying; falsehood.</p>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '3' ? '!text-primary' : ''}`}
                                    onClick={() => togglePara('3')}
                                >
                                    Embarrass
                                    <div className={`ltr:ml-auto rtl:mr-auto ${active === '3' ? 'rotate-180' : ''}`}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                            <p>Meaning And Uses</p>
                                            <p>1.To cause confusion and shame to; make uncomfortably self-conscious; disconcert; abash: His bad table manners embarrassed her.</p>
                                            <p>2.To make difficult or intricate, as a question or problem; complicate.</p>

                                            <p>3.To put obstacles or difficulties in the way of; impede: The motion was advanced in order to embarrass the progress of the bill.</p>
                                            <p>4.To beset with financial difficulties; burden with debt: The decline in sales embarrassed the company.</p>
                                            <p>5.To become disconcerted, abashed, or confused.</p>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '4' ? '!text-primary' : ''}`}
                                    onClick={() => togglePara('4')}
                                >
                                    Certificate
                                    <div className={`ltr:ml-auto rtl:mr-auto ${active === '4' ? 'rotate-180' : ''}`}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '4' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                            <p>Meaning And Uses</p>
                                            <p>1.A document serving as evidence or as written testimony, as of status, qualifications, privileges, or the truth of something.</p>
                                            <p>
                                                2.A document attesting to the fact that a person has completed an educational course, issued either by an institution not authorized to grant diplomas,
                                                or to a student not qualifying for a diploma.
                                            </p>
                                            <p>3Law. a statement, written and signed, which is by law made evidence of the truth of the facts stated, for all or for certain purposes..</p>
                                            <p>4.Finance. gold certificate. silver certificate.</p>
                                            <p>5.To furnish with or authorize by a certificate</p>
                                            <p>6.To issue an official certificate attesting to the training, aptitude, and qualification of: to certificate a teacher.</p>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '5' ? '!text-primary' : ''}`}
                                    onClick={() => togglePara('5')}
                                >
                                    Woodrow
                                    <div className={`ltr:ml-auto rtl:mr-auto ${active === '5' ? 'rotate-180' : ''}`}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '5' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                            <p>Meaning And Uses</p>
                                            <p>1.A male given name.</p>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordians;
