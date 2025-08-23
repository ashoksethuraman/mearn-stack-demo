import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        dob: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Registered:", formData);
        alert("User Registered Successfully!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">User Registration</h2>

                {/* Username */}
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <DatePicker
                        selected={formData.dob}
                        onChange={(date) => setFormData({ ...formData, dob: date })}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        placeholderText="Select your date of birth"
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
