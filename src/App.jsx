// import { useState } from 'react';
// import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import FileUpload from './Components/FileUploads';
import Edit from './Components/Edit';

function DocumentUpload() {

    return (
        <div className=''>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
    )

}

export default DocumentUpload;
