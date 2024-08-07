import { baseUrl } from '../App';

const getFormData = async (formId) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/selectformdata/${formId}`, {
            method: 'GET',
            headers: { 'X-WP-Nonce': AwcfApiSettings.nonce }
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
}

export default getFormData;