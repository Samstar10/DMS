import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"

export default function Edit() {
    const documentId = useParams().id
    const [documentData, setDocumentData] = useState({
        document_category: '',
        patient_name: '',
        file: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5555/fetch/${documentId}`)
            .then(res => res.json())
            .then(data => {
                setDocumentData({
                    document_category: data.data.document_category,
                    patient_name: data.data.patient_name,
                    file: null
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [documentId])

    function handleChange(e){
        const { name, value, files } = e.target
        if (files) {
            setDocumentData(prevState => ({ ...prevState, file: files[0] }))
        } else {
            setDocumentData(prevState => ({ ...prevState, [name]: value }))
        }
    }

    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()

        formData.append('document_category', documentData.document_category)
        formData.append('patient_name', documentData.patient_name)
        formData.append('document', documentData.file)

        fetch(`http://localhost:5555/edit/${documentId}`, {
            method: 'PUT',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    function triggerFileSelector(){
        fileInputRef.current.click()
    }

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
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
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="text-[#f7f3eb] font-semibold mb-2">
                        Patient Name:
                        </label>
                        <input
                            type="text"
                            value={documentData.patient_name}
                            name="patient_name"
                            onChange={handleChange}
                            className="rounded-lg focus:outline-none bg-[#f7f3eb] text-[#555] p-2"
                            placeholder="Please enter patient name"
                        />
                        <br />
                        <label className="text-[#f7f3eb] font-semibold mb-2">
                        Document Category:
                        </label>
                        <input
                            type="text"
                            value={documentData.document_category}
                            name="document_category"
                            onChange={handleChange}
                            className="rounded-lg focus:outline-none bg-[#f7f3eb] text-[#555] p-2"
                            placeholder="Please enter type of document"
                        />
                        <br />
                        <label className="text-[#f7f3eb] font-semibold mb-2">
                        Document:
                        </label>
                        <div className="flex items-center gap-4">
                            <button onClick={triggerFileSelector} type="button" className="text-[#555] bg-[#f7f3eb] w-1/4 py-2 px-4 rounded-lg">Click to Browse Files</button>
                            <p className="text-[#f7f3eb] font-medium">{documentData.length} files selected</p>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden" />
                        <br />
                        <button type="submit" className="bg-[#115987] text-white px-4 py-3 rounded-3xl font-medium text-sm hover:text-[#d6d1d1] hover:shadow-xl">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}