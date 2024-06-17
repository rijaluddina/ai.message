import React, { useEffect, useRef, useMemo } from "react";
import { useChatContext } from "../context/ChatContext";
import { useGroqContext } from "../context/GroqContext";
import { useNavigate } from "react-router-dom";
import MessageList from "../component/MessageList";
import ChatHeader from "../component/ChatHeader";
import ChatMenu from "../component/ChatMenu";
import Groq from "groq-sdk";

export default function Chat() {
    const navigate = useNavigate();
    const chatMenuRef = useRef(null);
    const { message, setMessage, loading, setLoading, showMenu, setShowMenu, signedUser, setSignedUser } = useChatContext();
    const { data, model, temperature, top_p, max_tokens, stream, stop } = useGroqContext();

    useEffect(() => {
        const user = localStorage.getItem("getmessage");
        if (!user) {
            navigate("/");
        } else {
            setSignedUser(JSON.parse(user));
        }
        setLoading(false);
    }, [navigate, setLoading, setSignedUser]);

    useEffect(() => {
        if (message.length > 0) {
            scrollToBottom();
        }
    }, [message]);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Menambahkan animasi smooth pada scroll
        });
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const GROQ = import.meta.env.VITE_GROQ_API;
    const groq = new Groq({
        apiKey: GROQ,
        dangerouslyAllowBrowser: true,
    });

    const messagesHistory = useMemo(() => {
        return message.map((msg) => ({
            role: msg.user.id === signedUser.id ? 'user' : 'assistant',
            content: msg.message,
        }));
    }, [message, signedUser]);

    const requestToGroqAI = async (content) => {
        try {

            // Menambahkan pesan terbaru ke riwayat
            messagesHistory.push({
                role: "user",
                content: content
            });

            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "system", content: data }, ...messagesHistory],
                model,
                temperature,
                max_tokens,
                top_p,
                stream,
                stop
            });

            let fullResponse = "";
            for await (const chunk of chatCompletion) {
                fullResponse += chunk.choices[0]?.delta?.content || '';
            }
            return fullResponse;
        } catch (error) {
            console.error("Error in requestToGroqAI:", error);
            return "maaf nih saya lagi error";
        }
    };
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
            setMessage((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    const handleMessage = async (e, setContent) => {
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
        setContent('');
    };

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                loading..
            </div>
        )
    }

    return (
        <main className="w-screen h-screen flex bg-gray-300 flex-col">
            <ChatHeader signedUser={signedUser} toggleMenu={toggleMenu} />
            <MessageList message={message} signedUser={signedUser} handleMessage={handleMessage} />
            {showMenu && (
                <div ref={chatMenuRef}>
                    <ChatMenu onLogout={handleLogout} toggleMenu={toggleMenu} />
                </div>
            )}
        </main>
    )
}
