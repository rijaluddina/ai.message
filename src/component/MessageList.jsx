import React from 'react';
import moment from 'moment';
import { BsSendFill } from 'react-icons/bs';

const MessageList = ({ message, signedUser, handleMessage }) => {
    // function formatMessage(message) {
    //     // Ganti kode ini dengan logika pemformatan Anda
    //     // Kode untuk memformat pesan dengan backtick, tanda kurung siku, dan asterisk
    //     formattedMessage = message.replace('`', '\\`');
    //     formattedMessage = formattedMessage.replace('[', '\\[');
    //     formattedMessage = formattedMessage.replace(']', '\\]');
    //     formattedMessage = formattedMessage.replace('*', '\\*');
    //     return formattedMessage;
    // }

    const formatMessage = (msg) => {
        if (/^https?:\/\//.test(msg)) {
            return <a href={msg} target="_blank" rel="noopener noreferrer">{msg}</a>;
        } else if (/^\d+\.\s/.test(msg)) {
            return <ol start={parseInt(msg.split('.')[0], 10)}><li>{msg.split('. ').slice(1).join('. ')}</li></ol>;
        } else if (/^```/.test(msg) && msg.endsWith('```')) {
            return <pre>{msg.slice(3, -3)}</pre>;
        } else {
            return msg;
        }
    };

    return (
        <main>
            <div
                className="w-full mt-auto max-w-screen mt-auto  py-[80px] flex flex-col py-4 px-3 gap-2">
                {message.map((e) => {
                    return (
                        <div
                            className={`w-auto p-2 bg-white flex flex-col rounded-lg shadow-md max-w-[80%] 
                        ${e.user.username !== signedUser.username ? "mr-auto" : "ml-auto"} last:mb-20`} key={e.id}>
                            <p
                                style={{ textAlign: 'justify' }}
                                className={`${e.user.username !== signedUser.username ? "text-left" : "text-right"}`}>
                                {formatMessage(e.message)}
                            </p>

                            <div className="mt-4 flex gap-2 items-center">
                                <img src={e.user.avatar} alt="" className="w-5 h-5" />
                                <div className="flex flex-col text-gray-400">
                                    <small className="text-[8px]">{e.user.username}</small>
                                    <small className="text-[8px]">{moment(e.createdAt).format("dddd DD/MM/YYYY hh:mm")}</small>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <form
                className="w-full h-16 flex px-6 items-center bg-gradient-to-r from-orange-500 to-orange-700 fixed bottom-0 left-0 gap-1"
                onSubmit={handleMessage}>
                    <textarea
                        type="text"
                        className="text-justify resize-none rounded-full px-4 bg-white h-10 flex-1" id="content" />
                <button>
                    <BsSendFill className="cursor-pointer size-7 rotate-45" />
                </button>
            </form>
        </main>
    );
};

export default MessageList;
