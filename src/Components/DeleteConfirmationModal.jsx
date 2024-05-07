export default function ConfirmationModal({ isVisible, onConfirm, onCancel, patientName }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="mb-4 text-lg">Are you sure you want to delete the patient: <span className="font-semibold">{patientName}</span>?</h3>
                <div className="flex gap-4 justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}