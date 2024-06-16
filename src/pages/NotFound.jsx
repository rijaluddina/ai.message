import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-700">
            <h1 className="text-4xl text-white font-bold">404</h1>
            <p className="text-xl text-gray-300 mt-4">PAGE NOT FOUND</p>
            <button onClick={goBack} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg">
                Kembali
            </button>
        </div>
    );
}
