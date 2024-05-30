import Swal from 'sweetalert2';
import { baseUrl } from '../App';

const updateFormData = async (formId, action) => {
    try {
        let tableData = '';
        if(action == 'trash') {
            tableData = [
                {'status' : 'trashed'}
            ];            
        } else if (action == 'restore') {
            tableData = [
                {'status' : 'draft'}
            ];
        }
        const dataToSend = {
            formId: formId,
            tableData: tableData
        }
        console.log(dataToSend);
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/updateformdata/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const responseData = await response.json();
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: 'mt-7'
            }
        });
        if(responseData === true) {
            Toast.fire({
                icon: "success",
                title: "Form sent to trash"
            });
            return true;
        } else {
            Toast.fire({
                icon: "error",
                title: "Failed to trash the form"
            });
            return false;
        }
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
        return false;
    }
};

export default updateFormData;
