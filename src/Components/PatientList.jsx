import { useEffect, useState } from "react";
import ConfirmationModal from "./DeleteConfirmationModal";
import PatientDetailsModal from "./DetailsModal";
import { NavLink } from "react-router-dom";

export default function PatientList() {
    const [patientName, setPatientName] = useState('')
    const [patients, setPatients] = useState([])
    const [documentCategory, setDocumentCategory] = useState('')
    const [typingTimeout, setTypingTimeout] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    function handleSearch(name, documentCategory) {

        const queryParams = new URLSearchParams({
            patient_name: name,
            document_category: documentCategory
        }).toString();

        fetch(`http://localhost:5555/search?${queryParams}`)
            .then(res => res.json())
            .then(data => setPatients(data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // if (typingTimeout) {
        //     clearTimeout(typingTimeout)
        // }
        const timeout = setTimeout(() => {
            handleSearch(patientName, documentCategory)
        }, 500)

        setTypingTimeout(timeout)

        return () => {
            clearTimeout(timeout)
        }
    }, [patientName, documentCategory])

    function handleDelete(documentId){
        fetch(`http://localhost:5555/delete/${documentId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            handleSearch(patientName, documentCategory)
        })
        .catch(err => console.log(err))
    }

    function showDeleteModal(patient) {
        setSelectedPatient(patient)
        setIsModalVisible(true)
    }

    function confirmDelete() {
        if (selectedPatient) {
            handleDelete(selectedPatient.id)
            setIsModalVisible(false)
            setSelectedPatient(null)
        }
    }

    function cancelDelete() {
        setIsModalVisible(false)
        setSelectedPatient(null)
    }

    function showDetailsModal(patient) {
        setSelectedPatient(patient)
        setIsDetailsModalVisible(true)
    }

    function closeDetailsModal() {
        setIsDetailsModalVisible(false)
        setSelectedPatient(null)
    }

    return (
        <div className="py-6 px-8 ">
            <div className="flex gap-5 mb-5">
                <input 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                    type="text" placeholder="Search by name" 
                    className="bg-gray-200 px-4 py-3 rounded-xl w-1/2 focus:outline-none text-[#555]" 
                />
                <input 
                    value={documentCategory} 
                    onChange={(e) => setDocumentCategory(e.target.value)} 
                    type="text" placeholder="Search by document category" 
                    className="bg-gray-200 px-4 py-3 rounded-xl w-1/2 focus:outline-none text-[#555]" 
                />
                <button 
                    className="bg-[#115987] text-white px-10 py-3 rounded-xl font-extralight text-sm hover:text-[#d6d1d1]"
                    onClick={handleSearch}
                >Search</button>
            </div>

            <ul>
                {patients.length > 0 ? (patients.map(patient => (
                    <li key={patient.id} className="py-3">
                        <div className="flex justify-between shadow-lg mb-2 px-4 py-4 rounded-xl hover:shadow-xl">
                            <p className="text-[#555] font-semibold uppercase w-1/5">{patient.patient_name}</p>
                            <p className="text-[#555] font-semibold uppercase w-1/5">{patient.document_category}</p>
                            <p className="text-[#555] font-normal w-1/5 overflow-hidden whitespace-nowrap text-ellipsis">{patient.file_name}</p>
                            <p className="text-[#555] font-thin uppercase w-1/5">{patient.created_at}</p>
                            <div className="flex gap-2">
                                <NavLink to={`/edit/${patient.id}`}><button className="bg-[#3dddb0] text-white px-10 rounded-lg font-extralight text-sm hover:shadow-lg py-1">Edit</button></NavLink>
                                <button className="bg-[#115987] text-white px-10 rounded-lg font-extralight text-sm hover:shadow-lg" onClick={() => showDetailsModal(patient)}>View</button>
                                <button className="bg-[#d9534f] text-white px-10 rounded-lg font-extralight text-sm hover:shadow-lg" onClick={() => showDeleteModal(patient)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))) : <p className="text-[#555] font-semibold">No patient found</p>}
            </ul>

            <ConfirmationModal
                isVisible={isModalVisible}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                patientName={selectedPatient?.patient_name}
            />

            <PatientDetailsModal
                isVisible={isDetailsModalVisible}
                onClose={closeDetailsModal}
                patient={selectedPatient}
                onDelete={() => handleDelete(selectedPatient.id)}
            />
        </div>
    );
}