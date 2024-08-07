import Swal from 'sweetalert2';
import store from '../store/store';
import { dispatch } from '@wordpress/data';
import { baseUrl } from '../App';

const deleteForm = async (formId) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/deletefromdata/${formId}`, {
            method: 'DELETE',
            headers: { 
                'X-WP-Nonce': AwcfApiSettings.nonce
            }
        });

        const responseData = await response.json();
        if (responseData === true) {
            await Swal.fire({
                title: "Deleted!",
                text: "The form has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1000
            });
            dispatch(store).clearState();
            return true;
        } else {
            Swal.fire({
                title: "Something went wrong!",
                text: "The form is not deleted.",
                icon: "error",
                showConfirmButton: false,
                timer: 1000
            });
            return false;
        }
    } else {
        return false;
    }
};

export default deleteForm;
