import React, { Fragment } from "react";

const AlertModel = ({ isOpen, isClose, message }) => {
    if (!isOpen) return null;

    return <Fragment>
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded shadow-md">
                    <p>{message}</p>
                    <button onClick={isClose} className="mt-2 bg-blue-500 text-white p-2 rounded">Close</button>
                </div>
            </div>
        )}
    </Fragment>
}

export default AlertModel;