import { useState } from 'react'
import './App.css'

function App() {

  const [selectedFiles, setSelectedFiles] = useState([])

  function handleFileChange(e) {
    // console.log(e.target.files)
    setSelectedFiles([...e.target.files])
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log(selectedFiles)

    if (selectedFiles.length === 0) {
      alert('Please select a file')
      return
    }

    // const formData = new FormData()
    const formData = {}
    formData["files"] = selectedFiles

    for (let i = 0; i < selectedFiles.length; i++) {
      // console.log(selectedFiles[i])
      // formData.append('files', selectedFiles[i])
    }
    
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1].name)
    // }
    // console.log(formData.get('files'))
    // console.log(selectedFiles)

    console.log(formData)

    fetch('http://localhost:5555/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  // const [file, setFile] = useState()

  // function handleChange(e) {
  //   setFile(e.target.files[0])
  // }

  // function handleSubmit(e){
  //   e.preventDefault()
    
  //   const formData = new FormData()
  //   formData.append('file', file)

  //   fetch('http://localhost:5555/upload', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     body: formData
  //   })
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err))
  // }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} name="files" multiple />
        <button type="submit">Upload</button>
      </form>
    </>
  )

}

export default App
