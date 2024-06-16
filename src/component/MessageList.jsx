import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { BsSendFill } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
SyntaxHighlighter.supportedLanguages;

const MessageList = ({ message, signedUser, handleMessage }) => {

    const [content, setContent] = useState("");
    const [isMultiLine, setIsMultiLine] = useState(false);

    useEffect(() => {
        const textarea = document.getElementById('content');
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            setIsMultiLine(textarea.scrollHeight > 36);
        }
    }, [content])

    return (
        <main className='flex flex-col'>
            <div className="w-full mt-auto px-2 py-[80px] bg-gray-300 flex flex-col gap-4">
                {message.map((e) => {
                    return (
                        <div className={`w-auto p-3 bg-gray-100 flex flex-col rounded-lg shadow-md max-w-[80%]
                        ${e.user.username !== signedUser.username ? "mr-auto" : "ml-auto"}`} key={e.id}>
                            <ReactMarkdown
                                className={`${e.user.username !== signedUser.username ? "text-left" : "text-right"}`}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={atomDark}
                                                language={match[1]}
                                                children={String(children).replace(/\n$/, '')}
                                                {...props}
                                            />
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    p({ node, children, ...props }) {
                                        return <p style={{ textAlign: 'justify' }} {...props}>{children}</p>;
                                    }
                                }}
                            >
                                {e.message}
                            </ReactMarkdown>
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
            </div >
            <form
                className="w-full min-h-16 flex px-6 items-center fixed bottom-0 left-0 gap-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (content.length >= 3) {
                        handleMessage(e, () => setContent(''));
                    } else {
                        alert('Pesan harus memiliki minimal 3 karakter.');
                    }
                }}>
                <textarea
                    rows="1"
                    type="text"
                    id="content"
                    value={content}
                    minLength="3"
                    className={`text-justify grid resize-none focus:outline-none focus:ring-1 ${isMultiLine ? 'rounded-md' : 'rounded-full'} py-2 px-4 bg-white h-10 flex-1`}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ maxHeight: '6em', overflowY: 'hidden' }} />
                <button>
                    <BsSendFill className="cursor-pointer size-7 rotate-45" />
                </button>
            </form>
        </main >
    );
};

export default MessageList;
