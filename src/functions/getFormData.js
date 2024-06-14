import { baseUrl } from '../App';

const getFormData = async (page = 1, pageSize = 10, is_trashed = '0', search = '') => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/selectformdata/?page=${page}&pageSize=${pageSize}&is_trashed=${is_trashed}&search=${search}`, {
            method: 'GET',
            headers: {
                'X-WP-Nonce': AwcfApiSettings.nonce,
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
}

export default getFormData;