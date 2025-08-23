import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HookForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid, isSubmitted },
    } = useForm({ mode: 'onChange' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api', {
                    method: 'GET', // Explicitly setting the method to GET
                    headers: {
                        'Content-Type': 'application/json', // Optional: Set content type if needed
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log("Fetched Data:", result);
                // setData(result);
            } catch (error) {
                console.log('error::', error);
            }
        }
        fetchData()
    }, []);



    const dobValue = watch("dob");  // get Notified 

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        alert("User Registered Successfully!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">User Hook Registration</h2>

                {/* Username */}
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <DatePicker
                        selected={dobValue}
                        placeholderText="Select your date of birth"
                        onChange={(date) => setValue("dob", date, { shouldValidate: true })}
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.dob && (
                        <p className="text-red-500 text-sm">{errors.dob.message}</p>
                    )}
                </div>

                {/* Hidden DOB field for validation */}
                <input
                    type="hidden"
                    {...register("dob", { required: true })}
                />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isValid}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700
                    disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
