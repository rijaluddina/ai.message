import React, { useEffect, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
import { useGroqContext } from "../context/GroqContext";
import MessageList from "../component/MessageList";
import ChatHeader from "../component/ChatHeader";
import ChatMenu from "../component/ChatMenu";
import Groq from "groq-sdk";

export default function Chat() {

    // state context
    const chatMenuRef = useRef(null);
    const { message, setMessage, loading, setLoading, showMenu, setShowMenu, signedUser, setSignedUser } = useChatContext();
    const { data, model, temperature } = useGroqContext();

    // seleksi user
    useEffect(() => {
        const user = localStorage.getItem("getmessage");
        if (!user) {
            window.location.href = "/";
        } else {
            setSignedUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    // scroll bottom
    useEffect(() => {
        scrollToBottom();
    }, [message]);

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    // toggle menu
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    // handle logout
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    // groq APikey
    const GROQ = import.meta.env.VITE_GROQ_API;

    const groq = new Groq({
        apiKey: GROQ,
        dangerouslyAllowBrowser: true,
    });

    const requestToGroqAI = async (content) => {
        try {
            const reply = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: data
                    },
                    {
                        role: "user",
                        content
                    },
                ],
                model,
                temperature,
            })
            return reply.choices[0].message.content;
        } catch (error) {
            return "maaf saya mengalami kesalahan";
        }
    };

    // ubah respon groq
    const AI = async (content) => {
        const aiResponse = await requestToGroqAI(content);
        if (aiResponse) {
            const newMessage = {
                id: Date.now(),
                message: aiResponse,
                user: {
                    avatar: `https://api.multiavatar.com/${Date.now()}.svg`,
                },
            };
            setMessage(prevMessages => [...prevMessages, newMessage]);
        }
    };

    // kirim pesan
    const handleMessage = async (e) => {
        e.preventDefault();
        const msg = e.target.content.value;

        if (!msg) return;

        const user = JSON.parse(localStorage.getItem("getmessage"));
        e.target.content.value = "";
        setMessage([...message, {
            id: Date.now(),
            message: msg,
            createdAt: Date.now(),
            user,
        }]);

        AI(msg);
        scrollToBottom();
    };

    // loading
    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                loading..
            </div>
        )
    }

    return (
        <main className="w-screen h-screen flex flex-col">
            <ChatHeader signedUser={signedUser} toggleMenu={toggleMenu} />
            <MessageList message={message} signedUser={signedUser} handleMessage={handleMessage} />
            {showMenu && (
                <div ref={chatMenuRef}>
                    <ChatMenu
                        onLogout={handleLogout}
                        toggleMenu={toggleMenu} />
                </div>
            )}
        </main>
    )
}