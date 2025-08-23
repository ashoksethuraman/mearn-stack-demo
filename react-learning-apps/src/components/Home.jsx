import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import UserUpdateModal from "../utils/userUpdateModel";

function Home() {
    const rowsPerPage = 4;
    const [user, setUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Calculate total pages
    const totalPages = Math.ceil(user.length / rowsPerPage);

    // Update paginated data when currentPage or data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedData(user.slice(startIndex, endIndex));
    }, [currentPage, user, rowsPerPage]);

    // Handle page changes
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/user');
            const user = await response.json();
            console.log(user);
            setUser(user);
        };
        fetchData();
    }, []);

    const handleDownload = (user) => {
        console.log('user ::', user);
        try {
            // Convert Buffer data (array of bytes) to Uint8Array
            const byteArray = new Uint8Array(user.file.data.data);
            // Create a Blob (you can set the correct MIME type if known, e.g., 'application/pdf')
            const blob = new Blob([byteArray], { type: user.file.mimetype || 'application/octet-stream' });
            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = user.file.filename || "download"; // Set filename if available
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
            // Handle error, e.g., display a message to the user
        }
    }

    const handleEdit = (user) => {
        // Implement edit functionality
        console.log('Edit user:', user);
        setSelectedUser(user);
        setIsModalOpen(true);
    }
    const handleDelete = async (id) => {
        // Implement delete functionality
        console.log('Delete user with id:', id);
        const deleteUser = await fetch(`/user/${id}`, {
            method: 'DELETE'
        });
        if (deleteUser.ok) {
            console.log('User deleted successfully');
            setUser(user.filter(u => u._id !== id));
        } else {
            console.error('Error deleting user');
        }
    }

    return (

        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl mx-auto mt-10">
            <table className="w-full text-left table-auto border-collapse">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="px-6 py-3 font-semibold text-gray-700">NAME</th>
                        <th className="px-6 py-3 font-semibold text-gray-700">EMAIL</th>
                        <th className="px-6 py-3 font-semibold text-gray-700">PASSWORD</th>
                        <th className="px-6 py-3 font-semibold text-gray-700">DOB</th>
                        <th className="px-6 py-3 font-semibold text-gray-700">FILE NAME</th>
                        <th className="px-6 py-3 font-semibold text-gray-700">DELETE / UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-400">No data available</td>
                        </tr>
                    ) : (
                        paginatedData.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-blue-50 transition">
                                <td className="px-6 py-3">{user.name}</td>
                                <td className="px-6 py-3">{user.email}</td>
                                <td className="px-6 py-3">{user.password}</td>
                                <td className="px-6 py-3">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-GB') : ""}</td>
                                <td className="px-6 py-3"><FiDownload size={20} style={{ marginRight: "6px" }} onClick={() => handleDownload(user)} /></td>
                                <td className="px-6 py-3">
                                    <button className="text-blue-500 hover:underline" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-blue-500 text-white font-semibold disabled:bg-blue-200 transition"
                >
                    Previous
                </button>
                <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => goToPage(index + 1)}
                            disabled={currentPage === index + 1}
                            className={`w-9 h-9 rounded-full font-semibold border-2 transition
                                ${currentPage === index + 1
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100"}
                            `}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-blue-500 text-white font-semibold disabled:bg-blue-200 transition"
                >
                    Next
                </button>
            </div>
            <div className="text-right text-gray-500 mt-2 text-sm">
                Page {currentPage} of {totalPages}
            </div>

            <UserUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedUser} />
        </div>

    );
}

export default Home;