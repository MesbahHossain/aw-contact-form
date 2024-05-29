import React, { useState } from "react";
import { select, dispatch } from '@wordpress/data';
import sendMessageToChatGPT from '../functions/sendMessage';
import ResponseToForm from "./ResponseToForm";
import saveForm from '../functions/saveForm';
import store from '../store/store';

const ResultForm = () => {
    const state = select(store).getResponse();
    const [userMessage, setUserMessage] = useState(state.prompt);
    
    const dismiss = () => {
        dispatch(store).clearState();
    }
    
    return (
        <>
        <div className="header bg-white mt-6 mr-5 py-[10px] px-6 rounded-lg">
            <h1 className="text-2xl font-semibold">Contact Us</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 mr-5">
            <div className="bg-white rounded-lg h-fit">
                <div className="flex items-center gap-x-[10px] px-5 py-4">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4961 3.27344L13.5 2.5L14.2383 0.53125C14.2734 0.355469 14.4492 0.25 14.625 0.25C14.7656 0.25 14.9414 0.355469 14.9766 0.53125L15.75 2.5L17.7188 3.27344C17.8945 3.30859 18 3.48438 18 3.625C18 3.80078 17.8945 3.97656 17.7188 4.01172L15.75 4.75L14.9766 6.75391C14.9414 6.89453 14.7656 7 14.625 7C14.4492 7 14.2734 6.89453 14.2383 6.75391L13.5 4.75L11.4961 4.01172C11.3203 3.97656 11.25 3.80078 11.25 3.625C11.25 3.48438 11.3203 3.30859 11.4961 3.27344ZM6.1875 2.85156C6.25781 2.64062 6.46875 2.5 6.67969 2.5C6.89062 2.5 7.10156 2.64062 7.20703 2.85156L9.03516 6.85938L13.043 8.6875C13.2539 8.79297 13.3945 9.00391 13.3945 9.21484C13.3945 9.42578 13.2539 9.63672 13.043 9.74219L9.03516 11.5703L7.20703 15.5781C7.10156 15.7891 6.89062 15.9297 6.67969 15.9297C6.46875 15.9297 6.25781 15.7891 6.1875 15.5781L4.32422 11.5703L0.316406 9.74219C0.105469 9.63672 0 9.42578 0 9.21484C0 9.00391 0.105469 8.79297 0.316406 8.6875L4.32422 6.85938L6.1875 2.85156ZM5.83594 7.5625C5.69531 7.91406 5.37891 8.23047 5.02734 8.37109L3.23438 9.21484L5.02734 10.0586C5.37891 10.1992 5.69531 10.5156 5.83594 10.8672L6.67969 12.6602L7.52344 10.8672C7.66406 10.5156 7.98047 10.1992 8.33203 10.0586L10.125 9.21484L8.33203 8.37109C7.98047 8.23047 7.66406 7.91406 7.52344 7.5625L6.67969 5.76953L5.83594 7.5625ZM14.2383 11.7812C14.2734 11.6055 14.4492 11.5 14.625 11.5C14.7656 11.5 14.9414 11.6055 14.9766 11.7812L15.75 13.75L17.7188 14.5234C17.8945 14.5586 18 14.7344 18 14.875C18 15.0508 17.8945 15.2266 17.7188 15.2617L15.75 16L14.9766 18.0039C14.9414 18.1445 14.7656 18.25 14.625 18.25C14.4492 18.25 14.2734 18.1445 14.2383 18.0039L13.5 16L11.4961 15.2617C11.3203 15.2266 11.25 15.0508 11.25 14.875C11.25 14.7344 11.3203 14.5586 11.4961 14.5234L13.5 13.75L14.2383 11.7812Z" fill="#7232EF"/>
                    </svg>
                    <h3 className="text-lg font-semibold">Create Form with AI</h3>
                </div>
                <hr />
                <div className="p-[20px] flex flex-col gap-3">
                    <label htmlFor="prompt" className="text-base font-semibold">Your Prompt</label>
                    <textarea id="prompt" className="p-[16px] border-2 border-[#B3DCFD] rounded-lg" cols="30" rows="4" onChange={(e) => setUserMessage(e.target.value)}>{userMessage}</textarea>
                    <button type='submit' className='text-base px-7 py-2 rounded-md font-medium text-white generate-btn' onClick={() => {sendMessageToChatGPT(userMessage)}}>Regenerate</button>
                </div>
            </div>
            <div className="col-span-3 bg-white rounded-lg p-5">
                <ResponseToForm />
                <div className="mt-5">
                    <button type='button' className='text-base bg-violet-600 text-white py-2 px-6 border border-violet-800 rounded-lg' onClick={saveForm}>Save & Continue</button>
                    <button type='button' className='text-base bg-white ml-4 py-2 px-6 border border-slate-700 rounded-lg' onClick={dismiss}>Dismiss</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ResultForm;