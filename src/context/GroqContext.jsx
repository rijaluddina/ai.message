import { createContext, useContext, useState } from 'react';

export const GroqContext = createContext();

export function useGroqContext() {
    return useContext(GroqContext);
}

export default function ChatContextProvider({ children }) {
    const [data, setData] = useState("");
    const [model, setModel] = useState("llama3-70b-8192");
    const [temperature, setTemperature] = useState(0.75);
    const [max_tokens, setMax_tokens] = useState(1024);
    const [top_p, setTop_p] = useState(1);
    const [stream, setStream] = useState(true);
    const [stop, setStop] = useState(null);

    return (
        <GroqContext.Provider value={{
            data,
            setData,
            model,
            setModel,
            temperature,
            setTemperature,
            top_p,
            setTop_p,
            max_tokens,
            setMax_tokens,
            stream,
            setStream,
            stop,
            setStop
        }}>
            {children}
        </GroqContext.Provider>
    );
}
