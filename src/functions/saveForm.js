import { select, dispatch } from '@wordpress/data';
import store from '../store/store';
import Swal from 'sweetalert2';
import { baseUrl } from '../App';

const saveForm = async () => {
    const state = select(store).getResponse();
    const formElements = document.querySelector('.form-wrapper').innerHTML;
    const form = `<input type="hidden" name="form_id" value="${state.formId}">${formElements}<button type="submit">Submit</button>`;
    const dataToSend = { 
        prompt: state.prompt, 
        resposne: state.response, 
        formId: state.formId, 
        formName: state.formName, 
        form: form,
        createTime: new Date().toLocaleString()
    };
    
    if(formElements !== '') {
        try {
            const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/insertformdata/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': AwcfApiSettings.nonce
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
                    title: "Form saved successfully"
                }).then(() => {
                    console.log(responseData);
                    dispatch(store).setStep(3);
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Failed to save form data"
                }).then(() => {
                    console.error('Failed to save form data');
                });
            }
        } catch (error) {
            console.error('Error sending data to WordPress:', error);
        }
    } else {
        alert('Form is empty');
    }
}

export default saveForm;