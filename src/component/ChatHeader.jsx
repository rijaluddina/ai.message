import React from 'react';
import { BsList } from 'react-icons/bs';

const ChatHeader = ({ signedUser, toggleMenu }) => {
    return (
        <header className="w-full h-16 px-6 flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-700 fixed top-0 left-0">
            <div className="flex gap-2 text-white items-center">
                <img src={signedUser?.avatar} alt="avatar"
                    className="w-10 h-10"
                />
                <h1>{signedUser?.username}</h1>
            </div>

            <BsList className="text-2xl text-white" onClick={toggleMenu} />
        </header>
    );
};

export default ChatHeader;
