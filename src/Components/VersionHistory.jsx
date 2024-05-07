import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"

export default function VersionHistory({ documentId, onRevert }) {
    // const documentId = useParams().id
    const [versions, setVersions] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5555/versions/${documentId}`)
            .then(res => res.json())
            .then(data => setVersions(data.data))
            .catch(err => console.log(err))
    }, [documentId])

    function revertToVersion(documentId, versionNumber) {

        fetch(`http://localhost:5555/revert/${documentId}/${versionNumber}`,
            {
                method: 'PUT'
            })
            .then(res => res.json())
            .then(data => {
                if (data.new_file_path) {
                    onRevert(data.new_file_path)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <ul>
                {versions.map(version => (
                    <li key={version.id} className="text-sm font-light flex justify-between items-center mb-4">
                        Version {version.version_number} - {new Date(version.created_at).toLocaleString()}
                        <button 
                            onClick={() => revertToVersion(documentId, version.version_number)}
                            className="bg-[#115987] text-white py-1 px-2 rounded-lg ml-4 font-thin">Use Version</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}