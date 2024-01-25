import { Editor } from '@tinymce/tinymce-react';
const EditorMce = () => {
    return (
        <div className="relative">
            <Editor apiKey="lexmrjqf5ilr6qezdcyrwzj2sif4l26kfrohonk9mha60cho" />
            <div className="absuloute  mt-4 float-right">
                <button className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
            </div>
        </div>
    );
};

export default EditorMce;
