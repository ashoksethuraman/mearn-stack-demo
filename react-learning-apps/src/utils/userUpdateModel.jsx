import React from "react";
import UserForm from "../components/UserForm";

export default function UserUpdateModal({ isOpen, onClose, user, onUpdate }) {
    if (!isOpen) return null; // hide if modal not open
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
                <UserForm userEditData={user} edit={true} />
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    );
}
