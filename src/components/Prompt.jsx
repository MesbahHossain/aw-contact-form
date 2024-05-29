import React, { useState } from 'react';
import sendMessageToChatGPT from '../functions/sendMessage'

const Prompt = () => {
    const [userMessage, setUserMessage] = useState('');

    return (
        <div className='prompt-wrapper flex flex-col items-center justify-center h-screen mt-[-50px]'>
            <div className='w-[660px] mx-auto text-center grid place-items-center'>
                <h1 className='text-4xl font-bold text-white mb-5' id='prompt-header'>Welcome To <span className='gradient-text'>FormGPT</span></h1>
                <p className='text-white text-base'>Just type a description of what form you need and our formGPT will help you refine your idea until you have the perfect form for your project.</p>
            </div>
            <form className='w-[930px] bg-white p-2.5 rounded-lg border border-slate-300 flex gap-x-3 mt-[120px]' onSubmit={() => sendMessageToChatGPT(userMessage)}>
                <input className='w-full !border-none text-base' type="text" name="promt" id="promt" placeholder='Describe the form style you are looking for...' value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
                <button type='submit' className='text-base px-7 py-2 rounded-md font-medium text-white generate-btn'>Generate</button>
            </form>
        </div>
     );
}

export default Prompt;