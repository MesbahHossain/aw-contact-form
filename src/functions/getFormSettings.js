import { baseUrl } from '../App';

const getFormSettings = async (formId) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/selectformsettings/${formId}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            //     table_name: 'form_settings',
            //     form_id: formId
            // }),
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
}

export default getFormSettings;