import { useEffect, useState } from "react";
import ConfirmationModal from "./DeleteConfirmationModal";

export default function PatientList() {
    const [patientName, setPatientName] = useState('')
    const [patients, setPatients] = useState([])
    const [typingTimeout, setTypingTimeout] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    function handleSearch(name) {

        const queryParams = new URLSearchParams({
            patient_name: name
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
            handleSearch(patientName)
        }, 500)

        setTypingTimeout(timeout)

        return () => {
            clearTimeout(timeout)
        }
    }, [patientName])

    function handleDelete(documentId){
        fetch(`http://localhost:5555/delete/${documentId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            handleSearch(patientName)
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

    return (
        <div className="py-6 px-8 ">
            <div className="flex gap-5 mb-5">
                <input 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                    type="text" placeholder="Search by name" 
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
                            <p className="text-[#555] font-semibold uppercase">{patient.patient_name}</p>
                            <p className="text-[#555] font-semibold uppercase">{patient.document_category}</p>
                            <div className="flex gap-2">
                                <button className="bg-[#115987] text-white px-10 rounded-lg font-extralight text-sm hover:text-[#d6d1d1]">View</button>
                                <button className="bg-[#d9534f] text-white px-10 rounded-lg font-extralight text-sm hover:text-[#d6d1d1]]" onClick={() => showDeleteModal(patient)}>Delete</button>
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
        </div>
    );
}