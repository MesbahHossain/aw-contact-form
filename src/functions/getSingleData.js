import { baseUrl } from '../App';

const getSingleData = async (table, id) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/selectsingledata/?table=${table}&id=${id}`, {
            method: 'GET',
            headers: { 'X-WP-Nonce': AwcfApiSettings.nonce }
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
}

export default getSingleData;