// import { useState } from 'react';
// import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import FileUpload from './Components/FileUploads';

function DocumentUpload() {

    return (
        <div className=''>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/upload" element={<FileUpload />} />
          </Routes>
        </div>
    )

}

export default DocumentUpload;
