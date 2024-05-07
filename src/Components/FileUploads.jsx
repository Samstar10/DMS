import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function FileUpload() {
    const [files, setFiles] = useState([]);
    const [patientName, setPatientName] = useState('')
    const [documentCategory, setDocumentCategory] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const fileInputRef = useRef(null)

    function handleFileChange(e) {
        setFiles(e.target.files);
    }

    function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        
        // Loop through the files and append each to formData
        for (let i = 0; i < files.length; i++) {
            formData.append("document", files[i]);
        }

        formData.append("patient_name", patientName)
        formData.append("document_category", documentCategory)

        // Post formData to the backend API
        axios.post("http://localhost:5555/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Files uploaded successfully:', response);
            navigate('/');
            setMessage('Files uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading files:', error);
            alert('Error uploading files');
        });
    }

    function triggerFileSelector(){
        fileInputRef.current.click()
    }

    return (
        <div>
            <div className="flex justify-between items-center shadow-lg py-6 px-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#555]">DMS</h1>
                    <p className="text-xs text-[#555]">DOCUMENT MANAGEMENT SYSTEM</p>
                </div>
                <NavLink to="/"><button className="bg-[#115987] text-white px-4 py-3 rounded-3xl font-extralight text-sm hover:text-[#d6d1d1] hover:shadow-xl">Cancel</button></NavLink>
            </div>
            <div className="py-6 px-8 h-screen w-full flex flex-col justify-center items-center">
                <div className="w-2/3 h-2/3 flex flex-col bg-[#006da0] p-10 rounded-xl shadow-2xl">
                    <h1 className="text-2xl font-bold text-white uppercase mb-6 text-center">Please Upload Patient Documents</h1>
                    <form onSubmit={handleUpload} className="flex flex-col">
                        <label className="text-[#f7f3eb] font-semibold mb-2">
                        Patient Name:
                        </label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="rounded-lg focus:outline-none bg-[#f7f3eb] text-[#555] p-2"
                            placeholder="Please enter patient name"
                        />
                        <br />
                        <label className="text-[#f7f3eb] font-semibold mb-2">
                        Document Category:
                        </label>
                        <input
                            type="text"
                            value={documentCategory}
                            onChange={(e) => setDocumentCategory(e.target.value)}
                            className="rounded-lg focus:outline-none bg-[#f7f3eb] text-[#555] p-2"
                            placeholder="Please enter type of document"
                        />
                        <br />
                        <label className="text-[#f7f3eb] font-semibold mb-2">
                        Document:
                        </label>
                        <div className="flex items-center gap-4">
                            <button onClick={triggerFileSelector} type="button" className="text-[#555] bg-[#f7f3eb] w-1/4 py-2 px-4 rounded-lg">Click to Browse Files</button>
                            <p className="text-[#f7f3eb] font-medium">{files.length} files selected</p>
                        </div>
                        <input type="file" ref={fileInputRef} multiple onChange={handleFileChange} className="hidden" />
                        <br />
                        <button type="submit" className="bg-[#115987] text-white px-4 py-3 rounded-3xl font-medium text-sm hover:text-[#d6d1d1] hover:shadow-xl">Upload</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
}