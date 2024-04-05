import React, { useState } from 'react';

const Form = () => {
    const [userMessage, setUserMessage] = useState('');

    const sendMessageToChatGPT = async (e) => {
        e.preventDefault();
        const dataToSend = { prompt: userMessage };
        // Get the base URL
        const baseUrl = window.location.protocol + "//" + window.location.host;
        if(userMessage !== '') {
            try {
                const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/promtsubmit/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
            
                const responseData = await response.json();
                console.log(responseData); // Handle response from WordPress
            } catch (error) {
                console.error('Error sending data to WordPress:', error);
            }
        }else {
            alert('empty input');
        }
    };

//   return (
//     <div>
//       <div>
//         {chatHistory.map((chat, index) => (
//           <div key={index}>
//             <p>User: {chat.user}</p>
//             <p>ChatGPT: {chat.chatgpt}</p>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={userMessage}
//         onChange={(e) => setUserMessage(e.target.value)}
//       />
//       <button onClick={sendMessageToChatGPT}>Send</button>
//     </div>
//   );
// 
    return (
        <div className='w-[930px] bg-white p-2.5 rounded-lg border border-slate-300 flex gap-x-3 mt-[120px]'>
            <input className='w-full !border-none text-base' type="text" name="promt" id="promt" placeholder='Describe the form style you are looking for...' value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
            <button type='submit' className='text-base px-7 py-2 rounded-md font-medium text-white generate-btn' onClick={sendMessageToChatGPT}>Generate</button>
        </div>
     );
}

export default Form;