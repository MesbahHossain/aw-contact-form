import { dispatch } from '@wordpress/data';
import store from '../store/store';
import { baseUrl } from '../App';

const sendMessageToChatGPT = async (userMessage) => {
    const dataToSend = { prompt: userMessage };
    
    if(userMessage !== '') {
        try {
            const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/promptsubmit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
        
            const responseData = await response.json();
            const formId = 'awcf_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
            const formName = JSON.parse(responseData).formName;
            console.log(`Form ID: ${formId} \nresponse: ${responseData} \nformName: ${formName}`);

            dispatch(store).setResponse(2, userMessage, responseData, formId, formName);
        } catch (error) {
            console.error('Error sending data to WordPress:', error);
        }
    } else {
        alert('empty input');
    }
    
};

export default sendMessageToChatGPT;