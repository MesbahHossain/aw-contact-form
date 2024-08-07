import Swal from 'sweetalert2';

const toast = (responseData, successMsg = 'Data saved', failedMsg = 'Something went wrong') => {    
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
            title: successMsg
        });
    } else {
        Toast.fire({
            icon: "error",
            title: failedMsg
        });
    }
};

export default toast