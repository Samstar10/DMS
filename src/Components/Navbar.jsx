export default function Navbar() {
    return (
        <div className="flex justify-between items-center shadow-lg py-6 px-8">
            <div>
                <h1 className="text-3xl font-bold text-[#555]">DMS</h1>
                <p className="text-xs text-[#555]">DOCUMENT MANAGEMENT SYSTEM</p>
            </div>
            <button className="bg-[#115987] text-white px-4 py-3 rounded-3xl font-extralight text-sm hover:text-[#d6d1d1] hover:shadow-xl">Add Patient Record</button>
        </div>
    );
}