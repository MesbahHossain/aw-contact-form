import { baseUrl } from '../App';

const getFormSettings = async (formId) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/selectformsettings/${formId}`, {
            headers: {
                'X-WP-Nonce': AwcfApiSettings.nonce,
            },
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
}

export default getFormSettings;