
import store from '../store/store';
import { dispatch } from '@wordpress/data';
import Swal from 'sweetalert2';
import { baseUrl } from '../App';

const saveFormSettings = async (dataToSend) => {
    try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/insertformsettings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': AwcfApiSettings.nonce
            },
            body: JSON.stringify(dataToSend),
        });
    
        const responseData = await response.json();
        if(responseData === true) {
            Swal.fire({
                title: "Saved!",
                text: "Form settings saved successfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 1000
            });
            dispatch(store).clearState();
            return true;
        } else {
            Swal.fire({
                title: "Something went wrong!",
                text: responseData,
                icon: "error",
                showConfirmButton: false,
                timer: 1000
            });
            return false;
        }
    } catch (error) {
        console.error('Error sending data to WordPress:', error);
    }
};

export default saveFormSettings;