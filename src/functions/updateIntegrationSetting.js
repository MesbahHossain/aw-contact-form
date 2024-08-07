import { baseUrl } from '../App';

const updateIntegrationSetting = async (dataToSend) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/updatecaptchasetting/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': AwcfApiSettings.nonce
            },
            body: JSON.stringify(dataToSend),
        });

        return await response.json();
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
};

export default updateIntegrationSetting