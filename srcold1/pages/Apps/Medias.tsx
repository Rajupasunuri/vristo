import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';

const Skin = () => {
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return rowData.filter((item) => {
    //             return (
    //                 item.id.toString().includes(search.toLowerCase()) ||
    //                 //item.action.toLowerCase().includes(search.toLowerCase()) ||
    //                 // item.status.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.type.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.started.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search]);

    //Skin: Hover
    // const [page1, setPage1] = useState(1);
    // const [pageSize1, setPageSize1] = useState(PAGE_SIZES[0]);
    // const [initialRecords1, setInitialRecords1] = useState(rowData);
    // const [recordsData1, setRecordsData1] = useState(initialRecords1);

    //Skin: Bordered

    return (
        <div className="space-y-6">
            {/* Skin: Striped  */}
            <div>
                <h4 className="font-semibold text-lg">Facilities</h4>
            </div>
            <div className="panel">
                <div className="flex items-center justify-between pb-5 mb-4 border-b-2 ">
                    <h5 className="font-semibold text-lg dark:text-white-light">Media</h5>
                    <div>
                        <select name="Select Category" defaultValue="Select Category" className="w-18 h-10 p-2 mr-2 border rounded-md ">
                            <option value="Select Category">Select Category</option>
                            <option value="Audio">Audio</option>
                            <option value="Video">Video</option>
                            <option value="Image">Image</option>
                        </select>
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button className="text-white bg-blue-500 m-2 p-2 rounded-md">Go</button>
                    </div>
                </div>
                <div>
                    <p className="text-base font-semibold">No Related data available</p>
                </div>
            </div>
        </div>
    );
};

export default Skin;
