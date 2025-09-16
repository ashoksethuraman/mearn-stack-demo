import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form"; // npm install react-hook-form;
import { DatePicker } from "react-datepicker"
import AlertModel from "../utils/AlertModel";
import { useAuth } from "../context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import "../scss/UserForm.scss";

export default function UserForm({ userEditData = {}, edit = false }) {
    const { user, logout } = useAuth();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: {
            errors,
            isValid,
            touchedFields,
            dirtyFields
        } } = useForm({
            mode: 'onChange', defaultValues: userEditData ? userEditData : {}
        });

    const userSubmit = async (data) => {
        console.log('onSubmit::', data, data.bioDetails[0]);
        // To send the File object required Form  Data
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("dob", data.dob);
        if (data.bioDetails && data.bioDetails[0]) {
            formData.append("bioDetails", data.bioDetails[0]);
        }
        if (edit) {
            console.log("Editing user:", userEditData);
            console.log("Editing user:", formData);
            userEditData.name = data.name;
            userEditData.email = data.email;
            userEditData.dob = data.dob;
            delete userEditData.file; // Remove file from being sent in PUT

            try {
                const res = await fetch(`/user/${userEditData._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(userEditData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await res.json();
                console.log(" User updated:", result);
                setAlertMessage(`User updated successfully! ${result.name}`);
                setShowAlert(true);
            } catch (error) {
                console.log("Error updating user:", error);
            }
        } else {
            try {
                const res = await fetch('/user/create', {
                    method: 'POST',
                    body: formData
                });
                const result = await res.json();
                console.log(" User created:", result);
                setAlertMessage(`User created successfully! ${result.userId}`);
                setShowAlert(true);
            } catch (error) {
                console.log("Error creating user:", error);
            }
        }
    }

    return (<>
        <div className="p-6">
            {(
                <>
                    <h2>Welcome, {user?.name} with Context login 👋</h2>
                    <button
                        onClick={() => logout()}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>


        <div className="user-form flex items-center justify-center min-h-screen bg-gray-100">
            {showAlert && <AlertModel isOpen={showAlert} isClose={() => setShowAlert(false)} message={alertMessage} />}

            <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4" onSubmit={handleSubmit(userSubmit)}>
                <h2 className="text-center text-2xl font-bold">  User Registration</h2>
                {/* username*/}
                <div >
                    <label className="block text-grey-700">username</label>
                    <input type="text"
                        className={`w-full mt-1 p-2 border rounded-md ${touchedFields.name && errors.name ? 'border-red-500' : 'border-grey'}`}
                        {...register("name", {
                            required: "username is required",
                            minLength: {
                                value: 7,
                                message: "minmum 7 letter  is required  "
                            }
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>
                {/* email */}
                <div>
                    <label className="block text-grey-700"> Email</label>
                    <input type="email"
                        {...register("email", {
                            required: "email address is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "email is not valid"
                            }
                        })}
                        className={`w-full mt-1 p-2 border rounded-md ${touchedFields.email && errors.email ? 'border-red-500' : 'border-grey'}`}
                    />
                    {errors.email && (<p className="text-red-500 text-sm"> {errors.email.message}</p>)}
                </div>
                {/* password */}
                <div>
                    <label className="block text-grey-700">password</label>
                    <input type="password"
                        {...register("password", {
                            required: "password is required",
                            minLength: {
                                value: 5,
                                message: "minimum 5 letter is required"
                            },
                            maxLength: {
                                value: 7,
                                message: "maximum letter is 7"
                            }
                        })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.password && (<p className="text-red-500 text-sm"> {errors.password.message}</p>)}
                </div>
                {/* bioDetails upload */}
                <div>
                    <label>Upload Bio Details</label>
                    <input type="file"
                        accept="*"
                        {...register("bioDetails", {
                            required: "please upload the file"
                        })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.bioDetails && (<p className="text-red-500 text-sm"> {errors.bioDetails.message}</p>)}
                </div>

                {/* date of birth */}
                <div className="!inline">
                    <label className="block text-grey-700"> Date Of Birth</label>
                    <Controller
                        name="dob"
                        control={control}
                        rules={{ required: "Date of Birth is required" }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Select your date of birth"
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                maxDate={new Date()}
                                showYearDropdown
                                scrollableYearDropdown
                                className="w-full mt-1 p-2 border rounded-md"
                            />
                        )}
                    />
                    {errors.dob && (<p className="text-red-500 text-sm"> {errors.dob.message}</p>)}
                </div>

                <button type="submit"
                    disabled={!isValid}
                    className="disabled:bg-grey-500 disabled:cursor-not-allowed w-full bg-blue-300 hover:bg-blue-600 text-center p-2">Submit </button>
            </form>
        </div>
    </>

    );
}
