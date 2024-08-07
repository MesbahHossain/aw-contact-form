import Swal from 'sweetalert2';
import toast from './toast';
import { baseUrl } from '../App';

const updateFormData = async (formId, action) => {
    try {
        let tableData = '', successTitle, failedTitle;
        if(action == 'trash') {
            tableData = {'is_trashed' : true};
            successTitle = "Form sent to trash";
            failedTitle = "Failed to trash the form";
        } else if (action == 'restore') {
            tableData = {'is_trashed' : false};
            successTitle = "Form restored";
            failedTitle = "Failed to restore the form"
        }
        const dataToSend = {
            formId: formId,
            tableData: tableData
        }
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/updateformdata/`, {
            method: 'PUT',
            headers: {
                'X-WP-Nonce': AwcfApiSettings.nonce,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const responseData = await response.json();
        toast(responseData, successTitle, failedTitle);
        return responseData;
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
        return false;
    }
};

export default updateFormData;
