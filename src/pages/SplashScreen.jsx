import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsGithub, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function SplashScreen() {

    const navigate = useNavigate();

    const toLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        let user = localStorage.getItem("getmessage");
        if (user) {
            return navigate("/chat");
        }
    }, []);

    return (
        <main className="w-screen h-screen p-8 bg-gray-700 flex flex-col justify-between">
            <div
                // style={{ borderInlineStart: "2px solid white" }}
                className="flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1
                        style={{ borderBlockEnd: "2px solid white" }}
                        className="text-[40px] pt-10 text-gray-300 font-bold leading-10">
                        Getmessage
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-[16px] pt-20 text-gray-100 font-semibold mt-4">
                        Creating a simple AI API
                        <br />
                        for providing convenience
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-[50%] h-12 bg-blue-600 top-0 text-white mt-auto rounded-lg z-[100]"
                        onClick={toLogin}
                    >
                        start trying
                    </motion.button>
                </motion.div>
            </div>
            <div className="flex mb-[1rem] mr-[3rem] ml-[3rem] bottom-0 flex-col justify-center items-center">
                <div className="flex mr-[2rem] ml-[2rem] items-center p-3 text-gray-100">
                    <a href="https://github.com/rijaluddina" target="_blank">
                        <BsGithub className="text-2xl mr-4" />
                    </a>
                    <a href="https://instagram.com/rjlddn.a_" target="_blank">
                        <BsInstagram className="text-2xl mr-4" />
                    </a>
                    <a href="https://wa.me/6285161071745" target="_blank">
                        <BsWhatsapp className="text-2xl mr-4" />
                    </a>
                </div>
                <footer className="flex mr-[2rem] ml-[2rem] bottom-0 gap-2 text-gray-100 text-center justify-center">
                    © 2024 GetMessage. All rights reserved.
                </footer>
            </div>
        </main >
    );
}