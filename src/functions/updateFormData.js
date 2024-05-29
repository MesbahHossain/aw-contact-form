import Swal from 'sweetalert2';
import { baseUrl } from '../App';

const updateFormData = async (formId) => {
    try {
        const dataToSend = {
            formId: formId,
            tableData: [
                {'status' : 'deleted'}
            ]
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
            }).then(() => {
                console.log(responseData);
                dispatch(store).setStep(3);
            });
        } else {
            Toast.fire({
                icon: "error",
                title: "Failed to delete the form"
            });
        }
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
};

export default updateFormData;
