import React from 'react';
import { useGroqContext } from '../context/GroqContext';
import { Dropdown } from 'semantic-ui-react';
import { BsEscape, BsGearWideConnected } from 'react-icons/bs';

export default function ChatMenu({ onLogout, toggleMenu }) {
    const { data, model, temperature, setData, setModel, setTemperature } = useGroqContext();

    const modelOptions = [
        { text: 'llama3-70b-8192', value: 'llama3-70b-8192' },
        { text: 'llama3-8b-8192', value: 'llama3-8b-8192' },
        { text: 'gemma-7b-it', value: 'gemma-7b-it' },
        { text: 'mixtral-8x7b-32768', value: 'mixtral-8x7b-32768' },
    ];

    const handleDataChange = (event) => {
        setData(event.target.value);
    };

    const handleModelChange = (value) => {
        setModel(value);
    };

    const handleTemperatureChange = (event) => {
        const inputValue = event.target.value;
        const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue)) {
            setTemperature(parsedValue);
        }
    };

    return (
        <div
            className="w-xl fixed right-0 top-0 h-full bg-white p-4 shadow-lg box-border">
            <div className="flex flex-col mb-4">
                <div
                    onClick={toggleMenu}
                    className="cursor-pointer hover:text-blue-500">
                    <BsGearWideConnected className="inline-block mr-2 transition-transform duration-200 hover:rotate-90" /> Settings
                </div>
                <div
                    onClick={onLogout}
                    className="cursor-pointer hover:text-red-500">
                    <BsEscape className="inline-block mr-2 transition-transform duration-200 hover:rotate-90" /> Logout
                </div>
            </div>
            <div className="flex flex-col ">
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ display: 'block', marginBottom: '5px' }} htmlFor='data'>pesan</p>
                    <textarea
                        className="resize-none w-full h-40 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue"
                        value={data}
                        onChange={handleDataChange}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ display: 'block', marginBottom: '5px' }} htmlFor='model'>model</p>
                    <Dropdown
                        button
                        selection
                        className='w-full bg-white boder rounded-md'
                        floating
                        search
                        fluid
                        options={modelOptions}
                        text={model}
                        onChange={(event, { value }) => handleModelChange(value)}
                    />
                </div>
                <div className='flex flex-col gap-2 justify-between'>
                    <button
                        className="w-[20%] items-end text-right p-1 border rounded-md"
                    >{temperature}
                    </button>
                    <input
                        className="w-full gap-4 gray-500"
                        onChange={handleTemperatureChange}
                        value={temperature}
                        type="range"
                        min={0}
                        max={2}
                        step={0.01}
                    />
                </div>
            </div>
        </div>
    )
};
