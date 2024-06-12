import { createContext, useContext, useState } from 'react';

export const GroqContext = createContext();

export function useGroqContext() {
    return useContext(GroqContext);
}

export default function ChatContextProvider({ children }) {
    const [data, setData] = useState("you are helpful assistant");
    const [model, setModel] = useState("llama3-70b-8192");
    const [temperature, setTemperature] = useState(0.75);

    return (
        <GroqContext.Provider value={{
            data,
            setData,
            model,
            setModel,
            temperature,
            setTemperature,
        }}>
            {children}
        </GroqContext.Provider>
    );
}
