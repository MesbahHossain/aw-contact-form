import { baseUrl } from '../App';

const getFormData = async () => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/selectformdata/`, {
            method: 'GET',
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
}

export default getFormData;