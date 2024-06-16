import React from 'react';
import { BsList } from 'react-icons/bs';

const ChatHeader = ({ signedUser, toggleMenu }) => {
    return (
        <header className="bg-gray w-full h-16 px-6 flex items-center justify-between fixed top-0 left-0">
            <div className="flex gap-2 text-black items-center">
                <img src={signedUser?.avatar} alt="avatar"
                    className="w-10 h-10"
                />
                <h1
                    className="text-[15px] font-bold"
                >{signedUser?.username}</h1>
            </div>
            <BsList className="text-2xl text-black cursor-pointer" onClick={toggleMenu} />
        </header>
    );
};

export default ChatHeader;
