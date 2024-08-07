import Swal from 'sweetalert2';
import { baseUrl } from '../App';

const updateFormSettings = async (dataToSend) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/updateformsettings/`, {
            method: 'PUT',
            headers: {
                'X-WP-Nonce': AwcfApiSettings.nonce,
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
        if(responseData) {
            Toast.fire({
                icon: "success",
                title: "Settings updated"
            });
        } else {
            Toast.fire({
                icon: "error",
                title: "Failed to update the settings!"
            });
        }
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
};

export default updateFormSettings;
