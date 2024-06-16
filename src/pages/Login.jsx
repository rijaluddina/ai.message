import React, { useContext, useEffect } from "react";
import { AvatarContext } from "../context/AvatarContext"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

export default function Login() {

    const { avatar, setAvatar } = useContext(AvatarContext)
    const navigate = useNavigate()

    //clc
    useEffect(() => {
        let user = localStorage.getItem("getmessage")
        if (user) {
            return navigate("/chat")
        }
    }, [])

    // ganti avatar sesuai date
    const handleAvatar = () => {
        setAvatar(`https://api.multiavatar.com/${Date.now()}.svg`)
    }

    // handle form
    const handleLogin = (e) => {
        e.preventDefault()
        let username = e.target.username.value

        localStorage.setItem("getmessage", JSON.stringify({
            id: Date.now(),
            username: username,
            avatar: avatar
        }))

        window.location.href = "/chat"
    }

    return (
        <main className="w-screen h-screen p-8 bg-gray-700 flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
            <form className="w-full flex flex-col bg-gray-300 shadow-lg rounded-lg p-6 z-[100] gap-4" onSubmit={handleLogin}>

                <div className="relative w-28 mx-auto">
                    <img src={avatar} alt="avatar" className="w-28 h-28 mx-auto" />
                    <button className="w-8 h-8 bg-orange-600 text-white rounded-full absolute -right-3 top-16" type="button"
                        onClick={handleAvatar}
                    >
                        ?
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required className="w-full h-12 px-3 border-[1px] focus:outline-none focus:ring-1 rounded-lg" />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-12 bg-blue-600 text-white mt-auto rounded-lg z-[100]"
                >
                    Login
                </motion.button>
                </form>
            </motion.div>
        </main>
    )
}
