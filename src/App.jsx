// import { useState } from 'react';
// import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home';

function DocumentUpload() {
    // const [files, setFiles] = useState([]);

    // const onFileChange = event => {
    //     // This will store the FileList into the state
    //     setFiles(event.target.files);
    // };

    // const onFileUpload = () => {
    //     const formData = new FormData();
        
    //     // Loop through the files and append each to formData
    //     for (let i = 0; i < files.length; i++) {
    //         formData.append("document", files[i]);
    //     }

    //     // Post formData to the backend API
    //     axios.post("http://localhost:5555/upload", formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     .then(response => {
    //         console.log('Files uploaded successfully:', response);
    //         alert('Files uploaded successfully!');
    //     })
    //     .catch(error => {
    //         console.error('Error uploading files:', error);
    //         alert('Error uploading files');
    //     });
    // };

    // return (
    //     <div>
    //         <input type="file" multiple onChange={onFileChange} />
    //         <button onClick={onFileUpload}>
    //             Upload Files
    //         </button>
    //     </div>
    // );

    return (
        <div className=''>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
    )

}

export default DocumentUpload;
