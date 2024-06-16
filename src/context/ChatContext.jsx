// import { createContext, useContext, useState } from 'react';

// export const ChatContext = createContext();

// export function useChatContext() {
//     return useContext(ChatContext);
// }

// export default function ChatContextProvider({ children }) {
//     const [message, setMessage] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showMenu, setShowMenu] = useState(false);
//     const [signedUser, setSignedUser] = useState(JSON.parse(localStorage.getItem("getmessage")));

//     return (
//         <ChatContext.Provider value={{
//             message,
//             setMessage,
//             loading,
//             setLoading,
//             showMenu,
//             setShowMenu,
//             signedUser,
//             setSignedUser,
//         }}>
//             {children}
//         </ChatContext.Provider>
//     );
// }


import { createContext, useContext, useState } from 'react';

export const ChatContext = createContext();

export function useChatContext() {
    return useContext(ChatContext);
}

export default function ChatContextProvider({ children }) {
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [signedUser, setSignedUser] = useState(JSON.parse(localStorage.getItem("getmessage")));

    return (
        <ChatContext.Provider value={{
            message,
            setMessage,
            loading,
            setLoading,
            showMenu,
            setShowMenu,
            signedUser,
            setSignedUser,
        }}>
            {children}
        </ChatContext.Provider>
    );
}
