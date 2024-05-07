export default function PatientDetailsModal({ isVisible, onClose, patient, onDelete }) {
    if (!isVisible || !patient) return null;

    function handleDeleteAndClose(){
        onDelete()
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/6">
                <div className="flex justify-around">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold mb-4 uppercase">Name: {patient.patient_name}</p>
                        <p className="font-semibold mb-4 uppercase">Document: {patient.document_category}</p>
                        <p className="font-normal text-xs mb-4 uppercase">Created: {patient.created_at}</p>
                        <p className="font-normal text-xs mb-4 uppercase">Modified: {patient.updated_at}</p>
                    </div>
                    {patient.file_path ? (
                        <iframe
                            src={`http://localhost:5555/files/${encodeURIComponent(patient.file_name)}`}
                            frameBorder="0"
                            className="w-1/2 h-64"
                            title="Document Preview"
                        ></iframe>
                    ) : (
                        <p className="mt-4 text-red-600">No document available for preview</p>
                    )}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-[#d9534f] text-white font-extralight rounded-lg hover:text-[#d6d1d1]"
                        onClick={handleDeleteAndClose}
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 font-extralight rounded-lg hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
